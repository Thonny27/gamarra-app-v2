import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';

export const getAllUsuarios = async () => {
  return await Usuario.find();
};

export const getUsuarioById = async (id: string) => {
  return await Usuario.findById(id);
};

export const createUsuario = async (usuarioData: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(usuarioData.password, salt);
  usuarioData.password = hashedPassword;
  const usuario = new Usuario(usuarioData);
  return await usuario.save();
};

export const updateUsuario = async (id: string, usuarioData: any) => {
  if (usuarioData.password) {
    const salt = await bcrypt.genSalt(10);
    usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
  }
  return await Usuario.findByIdAndUpdate(id, usuarioData, { new: true });
};

export const deleteUsuario = async (id: string) => {
  return await Usuario.findByIdAndDelete(id);
};

export const loginUsuario = async (correo: string, password: string) => {
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, usuario.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  return usuario;
};