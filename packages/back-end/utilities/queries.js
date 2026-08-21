const { prisma } = require("./prismaClient");

async function temp (){

}

// GET =================================================================================
async function findAllPostsUnpublished () {
  return await prisma.post.findMany({
    where: { pubStatus: false },
    include: {
      comments: true
    }
  });
}

async function findUserByEmail (email) {
  const user = prisma.user.findFirst({
    where: {email}
  })
  return user;
}

async function findUserById (id) {
  const user = prisma.user.findFirst({
    where: {id}
  })
  return user;
}


async function findAllPosts () {
  return await prisma.post.findMany({
    where: { pubStatus: true },
    include: {
      comments: true
    }
  });
}

async function findSinglePost (postId) {
  const post = await prisma.post.findFirst({
    where: {
      AND: [
        { id: postId },
        { pubStatus: true }
      ],
    },
    include: {
      comments: true
    }
  })
  return post;
}

async function findSinglePostUnpublished (postId) {
  const post = await prisma.post.findFirst({
    where:{ id: postId },
    include: {
      comments: true
    }
  })
  return post;
}

async function findSingleComment (commentId) {
  const comment = await prisma.comment.findFirst({
    where: { id: commentId },
  })
  return comment;
}

async function findOwnPosts (authorId) {
  const ownPosts = await prisma.post.findMany({
    where: { authorId },
    include: {
      comments: true
    }
  })
  return ownPosts;
}

async function findAuthorPosts (authorId) {
  const authorPosts = await prisma.post.findMany({
    where: { 
      AND: [
        {authorId},
        {pubStatus: true}
    ]},
    include: {
      comments: true
    }
  })
  return authorPosts;
}

// POST =================================================================================
async function createUser (email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  })
  return user
}

async function createNewPost (body, title, authorId) {
  const newPost = await prisma.post.create({
    data: {
      body,
      title,
      authorId
    }
  })
  return newPost;
}

async function createNewComment (authorId, postId, body){
  const newComment = await prisma.comment.create({
    data: {
      body,
      authorId,
      postId
    }
  });
  return newComment;
}

// DELETE =================================================================================
async function deletePostById(postId){
  await prisma.post.delete({
    where: {id: postId}
  })
}

async function deleteCommentById(commentId){
  await prisma.comment.delete({
    where: {id: commentId}
  })
}

// PUT =================================================================================
async function updatePostStatus(postId, status){
  await prisma.post.update({
    where: { id: postId },
    data: { pubStatus: status }
  })
}


module.exports = {
  createUser,
  findUserByEmail,
  findAllPosts,
  createNewPost,
  findSinglePost,
  findOwnPosts,
  deletePostById,
  createNewComment,
  findUserById,
  findSingleComment,
  deleteCommentById,
  updatePostStatus,
  findSinglePostUnpublished,
  findAllPostsUnpublished,
  findAuthorPosts
}