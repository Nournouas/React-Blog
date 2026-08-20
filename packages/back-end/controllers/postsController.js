require("dotenv").config();
const jwt = require('jsonwebtoken');
const { findAllPosts, createNewPost, findSinglePost, findOwnPosts, deletePost, createNewComment } = require("../utilities/queries");

const getAllPosts = async (req, res) => {
  const allPosts = await findAllPosts();
  return res.send(allPosts);
}

const createPost = async (req, res) => {
  try{
    const authorId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const { body, title } = req.body;
    const createdPost = await createNewPost(body, title, authorId);
    return res.send(createdPost);
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const getSinglePost = async (req, res) => {
  try{
    const postId = parseInt(req.params.postId);
    const post = await findSinglePost(postId);
    return res.send(post);
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const getOwnPosts = async (req, res) => {
  try{
    const authorId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const ownPosts = await findOwnPosts(authorId);
    return res.send(ownPosts);
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const deleteOwnPost = async (req, res) => {
  try{
    const authorId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const postId = parseInt(req.params.postId);
    const post = await findSinglePost(postId);
    if (post.authorId === authorId){
      await deletePost(postId);
      return res.send("Post deleted successfully")
    }else{
      return res.send("Not authorised to delete this post")
    }
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
  
}

const createComment = async (req, res) => {
  try{
    const authorId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const postId = parseInt(req.params.postId);
    const { body } = req.body;
    const newComment = await createNewComment(authorId, postId, body);
    return res.send("comment created " + newComment);
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getSinglePost,
  getOwnPosts,
  deleteOwnPost,
  createComment
}