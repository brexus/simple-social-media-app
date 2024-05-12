const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const mongoose = require('mongoose');
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const routes = express.Router();
require('dotenv').config();

routes.use(express.json());
routes.use(cors({
    origin: [process.env.REACT_APP_ENDPOINT],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));
routes.use(cookieParser());


// ===========================================
// AUTH
// ===========================================

// get authenticated userID
routes.get("/api/users/:id", isAuthenticated, (req, res) => {
    const _id = req.params.id;

    UserModel.findOne({_id: _id})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(400).json(err);
    })

});

// register
routes.post('/api/register', (req, res) => {
    const {firstName, lastName, email, password } = req.body;

    UserModel.findOne({email: email})
    .then(existingUser => {
        if (existingUser) {
            // If the user already exists, return the appropriate error
            return res.status(400).json("The email is already taken");
        }

        // If the user does not exist, hash the password and create a new user
        bcrypt.hash(password, 10) // password hashing
        .then(hash => {
            UserModel.create({firstName: firstName, lastName: lastName, email: email, password: hash})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
        })
        .catch(err => console.log("Error in password hashing!"));

    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });

});

// login
routes.post('/api/login', (req, res) => {
    const {email, password} = req.body;

    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                
                if(response) {
                    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
                    
                    const userData = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        _id: user._id
                    };

                    res.status(200).json({token, userData});
                } else {
                    res.status(400).json("The password is incorrect")
                }
            })
        } else {
            res.status(400).json("No record existed");
        }

    })
    .catch(err => console.log("tutaj"));

});

//logout
routes.post('/api/logout', (req, res) => {
    const token = req.cookies.token;

    if(token) {
        res.clearCookie('token');
        res.status(200).json("Logged out successfully");
    } else {
        console.log("Failed to log out - server");
    }
    
});

// ===========================================
// POSTS
// ===========================================

// add post
routes.post("/api/posts", isAuthenticated, (req, res) => {

    PostModel.create(req.body)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            if(err._message === "posts validation failed") {
                return res.status(400).json("Content cannot exceed 2000 characters.");
            } else {
                return res.status(400).json("Nieznany błąd!");
            }   
        });

});

// get all posts
routes.get("/api/posts", isAuthenticated, async (req, res) => {
    PostModel.find({}).sort({ createdAt: -1 })
    .then(posts => {
        // Sucessfull fetch post data
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

// delete post
routes.delete("/api/posts/:postId", isAuthenticated, (req, res) => {
    const postId = req.params.postId.toString();

    PostModel.findByIdAndDelete(postId)
    .then(post => res.status(200).json({message: "Post deleted successfully"}))
    .catch(err => res.status(400).json({ error: err.message }));
});

// update post
routes.patch("/api/posts/:postId", isAuthenticated, (req, res) => {
    const postId = req.params.postId.toString();
    const newData = { content: req.body.content };

    PostModel.findByIdAndUpdate(postId, newData, {new: true})
    .then(updatedPost => {
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({message: "Post updated successfully", updatedPost})
    })
    .catch(err => {
        if(err._message === "posts validation failed") {
            return res.status(400).json("Content cannot exceed 2000 characters.");
        } else {
            return res.status(400).json("Nieznany błąd!");
        } 
    })
});

// add reaction to post
routes.post("/api/posts/:postId/reaction", isAuthenticated, async (req, res) => {
    const postId = req.params.postId.toString();

    UserModel.find({email: req.userEmail})
    .then(users => {

        const userId = users[0]._id;
        PostModel.find({_id: postId})
        .then(post => {
            // Sucessfull fetch post data
    
            if (post[0].likes.includes(userId)) {
                post[0].likes.pull(userId);
            } else {
                post[0].likes.push(userId);
            }
            
            post[0].save()
            .then(() => {
                res.status(200).json({ like: post[0].likes.length });
            })
            .catch(err => {
                res.status(400).json({ error: err.message });
            });

        })
        .catch(err => {
            res.status(400).json(err);
        })

    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// get, whether the user reacted or did not react to the post
routes.get("/api/posts/:postId/reaction", isAuthenticated, async (req, res) => {
    const postId = req.params.postId.toString();

    UserModel.find({email: req.userEmail})
    .then(users => {

        const userId = users[0]._id;
        PostModel.find({_id: postId})
        .then(post => {
            // Sucessfull react to post
    
            if (post[0].likes.includes(userId)) {
                res.status(200).json({"reaction": 1});
            } else {
                res.status(200).json({"reaction": 0});
            }
 
        })
        .catch(err => {
            // Failed react to post 
            res.status(400).json(err);
        })

    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = routes;
