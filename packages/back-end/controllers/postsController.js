require("dotenv").config();
const jwt = require('jsonwebtoken');
const { deleteCommentById, findSingleComment, findUserById, findAllPosts, createNewPost, findSinglePost, findOwnPosts, deletePostById, createNewComment } = require("../utilities/queries");

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

//test it works with both admin & author as user
const deletePost = async (req, res) => {
  try{
    const userId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    const postId = parseInt(req.params.postId);
    const post = await findSinglePost(postId);
    if (post.authorId === userId || user.admin === true){
      await deletePostById(postId);
      return res.send("Post deleted successfully")
    }else{
      return res.send("Not authorised to delete this post")
    }
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const deleteComment = async (req, res) => {
  try{
    const userId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    const commentId = parseInt(req.params.commentId);
    const comment = await findSingleComment(commentId);
    if (comment.authorId === userId || user.admin === true){
      await deleteCommentById(commentId);
      return res.send("COmment deleted successfully")
    }else{
      return res.send("Not authorised to delete this comment")
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
  deletePost,
  createComment,
  deleteComment
}