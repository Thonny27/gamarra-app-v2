import { Request, Response } from 'express';
import * as categoriaService from '../services/categoriaService';

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.getCategoriaById(id);
    if (!categoria) {
      res.status(404).send('Categoria not found');
    } else {
      res.json(categoria);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await categoriaService.createCategoria(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.updateCategoria(id, req.body);
    if (!categoria) {
      res.status(404).send('Categoria not found');
    } else {
      res.json(categoria);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.deleteCategoria(id);
    if (!categoria) {
      res.status(404).send('Categoria not found');
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(400).send(err);
  }
};