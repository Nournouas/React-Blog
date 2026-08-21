require("dotenv").config();
const express = require("express");
const postsRouter = express.Router();
const authenticateToken = require("../utilities/authenticateJWT");
const { getUserPosts, getAllUnpublishedPosts, switchPostPublished, deleteComment, getAllPosts, createPost, getSinglePost, getOwnPosts, deletePost, createComment } = require("../controllers/postsController");

postsRouter.get("/posts", getAllPosts);
postsRouter.use(authenticateToken);
postsRouter.post("/posts/create", createPost);
postsRouter.get("/posts/unpublished", getAllUnpublishedPosts);
postsRouter.get("/posts/profile", getOwnPosts);
postsRouter.get("/posts/profile/:profileId", getUserPosts);
postsRouter.delete("/posts/:postId", deletePost);
postsRouter.get("/posts/:postId", getSinglePost);
postsRouter.post("/posts/:postId/add_comment", createComment);
postsRouter.delete("/posts/:postId/:commentId", deleteComment);
postsRouter.put("/posts/:postId/set_published", switchPostPublished);


module.exports = {
  postsRouter
}
