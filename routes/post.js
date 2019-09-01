const routes = require('express').Router();
const slugify = require('slugify');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/uploads/post_images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const checkAuth = require('../middleware/check-auth');
const Post = require('../models').Post;
const { postValidation } = require('../validation/post-validation');

/* GET all posts */
routes.get('/page/:page', (req, res) => {
    Post.findAndCountAll()
        .then(allPosts => {
            let limit  = 20;
            let page   = req.params.page;
            let pages  = Math.ceil(allPosts.count/limit);
            let offset = limit * (page-1);      

            if(page > pages){
                res.status(400).json({ message: 'Page number is too high' });
            }     
            
            Post.findAll({
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((posts) => {
                res.status(200).json({'posts': posts, 'count': allPosts.count, 'pages': pages});
            });
        })
        .catch(err => res.json(err));
});

/* Get posts for user */
routes.get('/user', checkAuth, (req, res) => {
    Post.findAll({ where: { userID: res.locals.user.id } })
        .then(post => res.json(post))
        .catch(err => res.json(err));
});

/* Get one post */
routes.get('/:slug', (req, res) => {
    Post.findOne({ where: { slug: req.params.slug } })
        .then(post => res.json(post))
        .catch(err => res.json(err));
});

/* Create post */
routes.post('/create', checkAuth, upload.single('image'), async (req, res) => {
    const { title, content, metaTitle, metaDescription } = req.body;

    // Title converted to slug
    const slug = slugify(title, { lower: true });

    const post = await Post.findOne({ where: { slug: slug } });
    if(post) return res.status(400).json({ message: 'This post already exist.' });
    
    if(req.file == undefined){
        var newPost = {
            userID: res.locals.user.id,
            title: title,
            content: content,
            slug: slug,
            metaTitle: metaTitle,
            metaDescription: metaDescription, 
        };
    }
    else{
        var newPost = {
            userID: res.locals.user.id,
            title: title,
            content: content,
            slug: slug,
            image: req.file.filename,
            metaTitle: metaTitle,
            metaDescription: metaDescription, 
        };
    }

    try {
        await Post.create(newPost);

        res.status(200).json({ message: 'Post successfully created.' });
    } catch (error) {
        res.status(400).json(error);
    }
});

/* Update post */
routes.put('/update/:postID', checkAuth, upload.single('image'), async (req, res) => {
    // Check the post in database
    const post = await Post.findOne({ where: { id: req.params.postID } });
    if(!post) return res.status(400).json({ message: "We can not find this post." });

    const { title, content, metaTitle, metaDescription } = req.body;

    if(post.title != title){
        // Title converted to slug
        var slug = slugify(title, { lower: true });

        // Is unique the slug
        const post = await Post.findOne({ where: { slug: slug } });
        if(post) return res.status(400).json({ message: 'This post already exist.' }); 
    }    
    
    if(req.file == undefined){
        var updatePost = {
            title: title,
            content: content,
            slug: slug,
            metaTitle: metaTitle,
            metaDescription: metaDescription, 
        };
    }
    else{
        var updatePost = {
            title: title,
            content: content,
            slug: slug,
            image: req.file.filename,
            metaTitle: metaTitle,
            metaDescription: metaDescription, 
        };
    }    
    
    try {
        const result = await Post.update(updatePost, {
            where: { 
                id: req.params.postID,
                userID: res.locals.user.id
            }
        });

        if(result > 0)
            return res.status(200).json({ message: 'Post successfully updated' });
        else
            return res.status(400).json({ message: 'You can not update this post' });

    } catch (error) {
        res.status(400).json(error);
    }
});

/* Delete post */
routes.delete('/delete/:postID', checkAuth, async (req, res) => {
    // Check the post in database
    const post = await Post.findOne({ where: { id: req.params.postID } });
    if(!post) return res.status(400).json({ message: "We can not find this post." });

    try {
        const result = await Post.destroy({
            where: { 
                id: req.params.postID,
                userID: res.locals.user.id
            }
        });

        if(result > 0)
            return res.status(200).json({ message: 'Post successfully deleted' });
        else
            return res.status(400).json({ message: 'You can not delete this post' });

    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = routes;