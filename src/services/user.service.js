import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import createRandomUsers from '../utils/seedUser.js';

const getAll = async () => {
  return await User.getAll();
};

const findById = async (id) => {
  return await User.findById(id);
};

const create = async (user) => {
  return await User.create(user);
};

const login = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');
  if (password !== user.password) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

const seedUsers = async (count) => {
  return await createRandomUsers(count);
};

export default { getAll, findById, create, login, seedUsers };