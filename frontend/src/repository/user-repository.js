import { postData } from '../fetch-data'

async function createUser({ nome, email, senha }) {
  return postData('signup', { nome, email, senha });
}

async function loginUser({ email, senha }) {
  return postData('login', { email, senha });
}

export default {
  createUser,
  loginUser,
}
