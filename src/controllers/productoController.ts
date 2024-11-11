import { Request, Response } from 'express';
import * as productoService from '../services/productoService';

export const getProductos = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, precioMin, precioMax } = req.query;
    const productos = await productoService.getProductos({
      nombre: nombre as string,
      precio: precio as string,
      precioMin: precioMin as string,
      precioMax: precioMax as string
    });
    res.json(productos);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
  }
};

export const getProductosByCategoria = async (req: Request, res: Response) => {
  try {
    const { categoriaId } = req.params;
    const productos = await productoService.getProductosByCategoria(categoriaId);
    res.json(productos);
  } catch (err) {
    const error = err as Error;
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los productos por categoría', details: error.message });
  }
};