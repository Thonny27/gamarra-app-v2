import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as usuarioService from '../services/usuarioService';

const JWT_SECRET = 'gamarra'; // Cambia esto por una clave secreta segura

export const getAllUsuarios = async (req: Request, res: Response) => {
  const usuarios = await usuarioService.getAllUsuarios();
  res.json(usuarios);
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const usuario = await usuarioService.getUsuarioById(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(usuario);
};

export const createUsuario = async (req: Request, res: Response) => {
  const usuario = await usuarioService.createUsuario(req.body);
  res.status(201).json(usuario);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(usuario);
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const usuario = await usuarioService.deleteUsuario(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Usuario eliminado' });
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;
    const usuario = await usuarioService.loginUsuario(correo, password);
    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};