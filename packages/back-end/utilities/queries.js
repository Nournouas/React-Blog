const { prisma } = require("./prismaClient");

async function createUser (email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  })
  return user
}

async function findUserByEmail (email) {
  const user = prisma.user.findFirst({
    where: {email}
  })
  return user;
}

module.exports = {
  createUser,
  findUserByEmail
}