import bcrypt from 'bcrypt';
import * as userModel from '../../models/userModel.js';

const SALT_ROUNDS = 10;

// Listado
export const listUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.render('backoffice/users/list', { users });
};

// Formulario de creación
export const renderCreateUserForm = (req, res) => {
  res.render('backoffice/users/form', {
    user: null,
    formAction: '/backoffice/users/create',
  });
};

// Crear
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await userModel.createUser({ name, email, password: hashedPassword, role });
  res.redirect('/backoffice/users');
};

// Formulario de edición
export const renderEditUserForm = async (req, res) => {
  const user = await userModel.getUserById(req.params.id);
  if (!user) return res.status(404).send('Usuario no encontrado');
  res.render('backoffice/users/form', {
    user,
    formAction: `/backoffice/users/${req.params.id}/edit`,
  });
};

// Editar
export const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await userModel.getUserById(req.params.id);
  if (!user) return res.status(404).send('Usuario no encontrado');

  const dataToUpdate = {
    name,
    email,
    role,
  };

  if (password && password.trim() !== '') {
    dataToUpdate.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  console.log('Datos a actualizar:', dataToUpdate);
  await userModel.updateUser(req.params.id, dataToUpdate);
  res.redirect('/backoffice/users');
};

// Eliminar
export const deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.redirect('/backoffice/users');
};
