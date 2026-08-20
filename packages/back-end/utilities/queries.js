const { prisma } = require("./prismaClient");

async function temp (){

}

// GET =================================================================================
async function findUserByEmail (email) {
  const user = prisma.user.findFirst({
    where: {email}
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

async function findOwnPosts (authorId) {
  const ownPosts = await prisma.post.findMany({
    where: { authorId },
    include: {
      comments: true
    }
  })
  return ownPosts;
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
async function deletePost(postId){
  await prisma.post.delete({
    where: {id: postId}
  })
}

// PUT =================================================================================

module.exports = {
  createUser,
  findUserByEmail,
  findAllPosts,
  createNewPost,
  findSinglePost,
  findOwnPosts,
  deletePost,
  createNewComment
}