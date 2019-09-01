const routes = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/uploads/user_avatars');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const User = require('../models').User;
const { registerValidation, loginValidation } = require('../validation/user-validation');
const config = require('../config');
const checkAuth = require('../middleware/check-auth');

routes.get('/', checkAuth, (req, res) => {
    User.findOne({ where: { id: res.locals.user.id } })
        .then(user => res.json(user));
});

routes.post('/register', async (req, res) => { 
    // Validate the data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check email is already exist in the database
    const emailIsExist = await User.findOne({ where: { email: req.body.email } });
    if(emailIsExist) return res.status(400).send('Email already exist');

    // Check username is already exist in the database
    const usernameIsExist = await User.findOne({ where: { username: req.body.username } });
    if(usernameIsExist) return res.status(400).send('Username already exist');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
    };

    try{
        const newUser = await User.create(user);
        res.status(200).send({ user: newUser.id, message: "User successfully created." });
    } 
    catch(err) {
        res.status(400).send(err);
    }
});

routes.put('/update', checkAuth, upload.single('avatar'), async (req, res) => {
    
    const { name, username, email, password } = req.body;

    if(password){
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(req.file == undefined){
            var updateUser = {
                name: name,
                username: username,
                email: email,
                password: hashedPassword
            }
        }
        else{
            var updateUser = {
                name: name,
                username: username,
                email: email,
                password: hashedPassword,
                avatar: req.file.filename
            }
        }        
    }
    else{
        if(req.file == undefined){
            var updateUser = {
                name: name,
                username: username,
                email: email
            }
        }
        else{
            var updateUser = {
                name: name,
                username: username,
                email: email,
                avatar: req.file.filename
            }
        } 
    }

    User.update(updateUser, { where: { id: res.locals.user.id } })
        .then(result => {
            if(result > 0)
                res.status(200).json({ message: "User succesfully updated." })
            else
                res.status(400).json({ message: "Something went wrong" })
        })
        .catch(err => res.json(err));
});

routes.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check username is exist
    const user = await User.findOne({ where: { username: req.body.username } });
    if(!user) return res.status(400).send('Username is wrong');

    // Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Password is wrong');

    // Create and assign token
    const token = jwt.sign({ id: user.id, role: user.role }, config.TOKEN_SECRET_KEY);
    res.json({
        message: "Login is succesfull",
        token: token
    }).status(200);
});

routes.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if(!email) 
        return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ where: { email: email } });
    if(!user) 
        return res.status(400).json({ message: 'We can not find this email.' });

    const token = crypto.randomBytes(30).toString('HEX');    
    User.update({ resetPasswordToken: token }, { where: { email: email } });
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'puanlarisiralamalari@gmail.com',
               pass: 'As8*-/PuAN?'
           }
       });
    
    const mailOptions = {
        from: 'puanlarisiralamalari@gmail.com',
        to: email,
        subject: 'ExpressJS - NodeMailler Forgot Password',
        html: `
            <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın.</p>
            <a href="http://localhost:5000/api/user/verify-token/${token}">http://localhost:5000/api/user/verify-token/${token}<a>
        `
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if(error)
          return res.status(400).json({ message: error });
        else
            return res.status(200).json({ message: response });
     });
});

routes.get('/verify-token/:token', async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if(!user) 
        return res.status(400).json({ message : 'Password reset link is invalid' });

    return res.status(200).json({ username: user.username });
});

routes.post('/update-password', async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password)
        return res.status(400).json({ message: 'Username or password is empty' });

    const user = await User.findOne({ where: { username: username } });
    if(!user)
        return res.status(400).json({ message: 'We can not this user' });;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateUser = {
        password: hashedPassword,
        resetPasswordToken: null
    }

    try {
        User.update(updateUser, { where: { username: username } });
        return res.status(200).json({ message: 'User password update is successful.' });
    } catch (error) {
        return res.status(400).json(error);
    }
    
});

module.exports = routes;