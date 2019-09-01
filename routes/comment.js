const routes = require('express').Router();

const checkAuth = require('../middleware/check-auth');
const Post = require('../models').Post;
const Comment = require('../models').Comment;

/** Get all comments for specific post */
routes.get('/post/:postID', (req, res) => {
    Comment.findAll({ where: { postID: req.params.postID } })
        .then(comments => {
            if(comments.length > 0) 
                return res.status(200).json(comments);                
            else 
                return res.json({ message: "We can not find comment for this post" });
        })
        .catch(error => res.json(error));
});

/** Get a comment */
routes.get('/:commentID', checkAuth, (req, res) => {
    Comment.findOne({ where: { 
                id: req.params.commentID,
                userID: res.locals.user.id
            } 
        })
        .then(comment => {
            if(comment) 
                return res.status(200).json(comment);                
            else 
                return res.status(404).json({ message: "We can not find this comment" });
        })
        .catch(error => res.json(error));
});

/** Create a comment */
routes.post('/create/post/:postID', checkAuth, (req, res) => {
    Post.findOne({ where: { id: req.params.postID } })
        .then(post => {
            if(!post)
                return res.status(404).json({ message: "We can not find this post so you can not create a comment." });
            else{
                Comment.create({
                    postID: req.params.postID,
                    userID: res.locals.user.id,
                    title: req.body.title,
                    content: req.body.content
                })
                .then(comment => res.status(200).json({ message: "Comment succesfully created.", data: comment }))
                .catch(error => res.status(400).json({ message: "Something went wrong", error}));
            }
        })
        .catch(error => res.json(error));   
});

/** Update comment */
routes.put('/update/:commentID', checkAuth, (req, res) => {
    const { commentID } = req.params;

    Comment.findOne({ where: { id: commentID } })
        .then(comment => {
            if(!comment)
                return res.status(404).json({ message: "We can not find this comment so you can not update." });
            else{
                Comment.update({
                    title: req.body.title,
                    content: req.body.content
                },{
                    where: { 
                        id: commentID,
                        userID: res.locals.user.id
                    }  
                })
                .then(result => {
                    if(result > 0)
                        res.status(200).json({ message: "Comment succesfully updated."});
                    else
                        res.status(400).json({ message: "You can not edit this comment." });
                })
                .catch(error => res.status(400).json({ message: "Something went wrong", error}));
            }
        })
        .catch(error => res.json(error));  
});

/** Set comment status */
routes.put('/status/:commentID', checkAuth, (req, res) => {
    if(res.locals.user.role !== "admin")
        return res.status(400).json({ message: "You are not authorized to do this" });
    
    const { commentID } = req.params;

    Comment.findOne({ where: { id: commentID } })
        .then(comment => {
            if(!comment)
                return res.status(404).json({ message: "We can not find this comment so you can not change status." });
            else{
                Comment.update(
                    { status: req.body.status },
                    { where: { id: commentID } }
                )
                .then(result => {
                    if(result > 0)
                        res.status(200).json({ message: "Comment status succesfully updated."});
                    else
                        res.status(400).json({ message: "You can not change status this comment." });
                })
                .catch(error => res.status(400).json({ message: "Something went wrong", error}));
            }
        })
        .catch(error => res.json(error));  
});

/** Delete comment */
routes.delete('/delete/:commentID', checkAuth, (req, res) => {
    const { commentID } = req.params;

    Comment.findOne({ where: { id: commentID } })
        .then(comment => {
            if(!comment)
                return res.status(404).json({ message: "We can not find this comment so you can not delete." });
            else{
                Comment.destroy({
                    where: { 
                        id: commentID,
                        userID: res.locals.user.id
                    }  
                })
                .then(result => {
                    if(result > 0)
                        res.status(200).json({ message: "Comment succesfully deleted."});
                    else
                        res.status(400).json({ message: "You can not delete this comment." });
                })
                .catch(error => res.status(400).json({ message: "Something went wrong", error}));
            }
        })
        .catch(error => res.json(error));  
});



module.exports = routes;