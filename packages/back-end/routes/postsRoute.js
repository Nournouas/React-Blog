require("dotenv").config();
const express = require("express");
const postsRouter = express.Router();
const authenticateToken = require("../utilities/authenticateJWT");
const { deleteComment, getAllPosts, createPost, getSinglePost, getOwnPosts, deletePost, createComment } = require("../controllers/postsController");

postsRouter.get("/posts", getAllPosts);
postsRouter.use(authenticateToken);
postsRouter.post("/posts/create", createPost);
postsRouter.delete("/posts/:postId", deletePost);
postsRouter.get("/posts/profile", getOwnPosts);
postsRouter.get("/posts/:postId", getSinglePost);
postsRouter.post("/posts/:postId/add_comment", createComment)
postsRouter.delete("/posts/:postId/:commentId", deleteComment)

//delete post published or unpublished (user)
//get own posts pub + unpub (user)
//set post as published (admin)

module.exports = {
  postsRouter
}
