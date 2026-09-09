require("dotenv").config();
const jwt = require('jsonwebtoken');
const { findAuthorPosts, findAllPostsUnpublished, findSinglePostUnpublished, updatePostStatus, deleteCommentById, findSingleComment, findUserById, findAllPosts, createNewPost, findSinglePost, findOwnPosts, deletePostById, createNewComment } = require("../utilities/queries");
const { authenticateTokenExt }  = require("../utilities/authenticateJWT");
const sanitizeHtml = require('sanitize-html');

const sanitizeOptions = {
  allowedTags: [
    'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike',
    'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre',
    'h1', 'h2', 'h3', 'h4'
  ],
  allowedAttributes: {
    'a': ['href', 'target', 'rel']
  },
  allowedSchemes: ['http', 'https', 'mailto'], // blocks javascript: urls
};

const getAllPosts = async (req, res) => {
  try{
    const token = req.headers["authorization"]
    const auth = authenticateTokenExt(token);
    if ( auth === true) {
      const allPosts = await findAllPosts();
      return res.send(JSON.stringify(allPosts));
    }else{
      return res.send(JSON.stringify("LOGIN"))
    }
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const getAllUnpublishedPosts = async (req, res) => {
  try{
    const userId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    if (user.admin === true){
       const allPosts = await findAllPostsUnpublished();
      return res.send(allPosts);
    }else{
      return res.send("not authorised to access this route")
    }
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const createPost = async (req, res) => {
  try{
    const token = req.headers["authorization"];
    const auth = authenticateTokenExt(token);
    if (auth != true) return res.send(JSON.stringify("LOGIN"));
    
    const { id, name } = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN));
    const { body, title } = req.body;
    const cleanBody = sanitizeHtml(body, sanitizeOptions)
    const createdPost = await createNewPost(cleanBody, title, id, name);
    return res.send(createdPost);
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const createComment = async (req, res) => {
  try{
    const token = req.headers["authorization"];
    const auth = authenticateTokenExt(token);
    if (auth != true) return res.send(JSON.stringify("LOGIN"));

    const { id, name } = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN));
    const postId = parseInt(req.params.postId);
    const { comment } = req.body;
    console.log(comment)
    const newComment = await createNewComment(id, postId, comment, name);
    return res.send( newComment);
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const getSinglePost = async (req, res) => {
  try{
    const token = req.headers["authorization"]
    const auth = authenticateTokenExt(token);

    if (auth != true) return res.send(JSON.stringify("LOGIN"));

    const postId = parseInt(req.params.postId);
    const post = await findSinglePost(postId);
    return res.send(JSON.stringify(post));

  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const getOwnPosts = async (req, res) => {
  const token = req.headers["authorization"];
  const auth = authenticateTokenExt(token);
  if (auth != true) return res.send(JSON.stringify("LOGIN"));
  try{
    const authorId = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN)).id;
    const ownPosts = await findOwnPosts(authorId);
    return res.send(JSON.stringify(ownPosts));
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
}

//test it works with both admin & author as user
const deletePost = async (req, res) => {
  const token = req.headers["authorization"];
  const auth = authenticateTokenExt(token);
  if (auth != true) return res.send(JSON.stringify("LOGIN"));
  try{
    const userId = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    const postId = parseInt(req.params.postId);
    const post = await findSinglePost(postId);
    if (post.authorId === userId || user.admin === true){
      await deletePostById(postId);
      return res.send(JSON.stringify(true))
    }else{
      return res.send(JSON.stringify(false))
    }
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const deleteComment = async (req, res) => {
  const token = req.headers["authorization"];
  const auth = authenticateTokenExt(token);
  if (auth != true) return res.send(JSON.stringify("LOGIN"));
  try{
    const userId = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    const commentId = parseInt(req.params.commentId);
    const comment = await findSingleComment(commentId);
    if (comment.authorId === userId || user.admin === true){
      await deleteCommentById(commentId);
      return res.send(JSON.stringify(true))
    }else{
      return res.send(JSON.stringify(false))
    }
  }catch (err){
    console.error(err);
    return res.status(500).send(err);
  }
}


const switchPostPublished = async (req, res) => {
  try{
    const userId = (jwt.verify(req.cookies.jwt, process.env.JWT_ACCESS_TOKEN)).id;
    const user = await findUserById(userId);
    const postId = parseInt(req.params.postId);
    const post = await findSinglePostUnpublished(postId);
    if (user.admin === true ){
      await updatePostStatus(postId, !post.pubStatus);
      return res.send("post published succesfully")
    }else{
      return res.send("You are not authorised to publish posts")
    }
  }catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

const getUserPosts = async (req, res) => {
  try{
    const authorId = parseInt(req.params.profileId);
    const authorPosts = await findAuthorPosts(authorId);
    return res.send(authorPosts);
  }catch (err){
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
  deleteComment,
  switchPostPublished,
  getAllUnpublishedPosts,
  getUserPosts
}