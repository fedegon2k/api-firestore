import userService from '../services/user.service.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    if (users.length === 0) {
      return res.status(200).json({ message: 'No hay usuarios disponibles' });
    }
    res.status(200).json({ message: 'Listado de usuarios', payload: users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const newUser = await userService.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado', payload: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
    const result = await userService.login(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', payload: result });
  } catch (error) {
    next(error);
  }
};

const seedUsers = async (req, res, next) => {
  try {
    const count = parseInt(req.params.count) || 10;
    const users = await userService.seedUsers(count);
    res.status(201).json({ message: `${count} usuarios creados`, payload: users });
  } catch (error) {
    next(error);
  }
};

export default { getUsers, createUser, login, seedUsers };