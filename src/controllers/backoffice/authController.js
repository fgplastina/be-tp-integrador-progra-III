import * as userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';

export const renderLogin = (req, res) => {
  res.render('login', { email: '', error: null, showNav: false });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.getUserByEmail(email);

  if (!user || user.role !== 'admin') {
    return res.render('login', { error: 'Credenciales inválidas', email });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.render('login', { error: 'Credenciales inválidas', email });
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  res.redirect('/backoffice');
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
