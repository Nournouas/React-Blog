require("dotenv").config();
const express = require("express");
const postsRouter = express.Router();
const authenticateToken = require("../utilities/authenticateJWT");
const { getAllPosts, createPost, getSinglePost, getOwnPosts, deleteOwnPost, createComment } = require("../controllers/postsController");

postsRouter.get("/posts", getAllPosts);
postsRouter.use(authenticateToken);
postsRouter.post("/posts/create", createPost);
postsRouter.delete("/posts/:postId", deleteOwnPost);
postsRouter.get("/posts/profile", getOwnPosts);
postsRouter.get("/posts/:postId", getSinglePost);
postsRouter.post("/posts/:postId/add_comment", createComment)
// delete comment

//delete post published or unpublished (user)
//get own posts pub + unpub (user)
//set post as published (admin)

module.exports = {
  postsRouter
}
