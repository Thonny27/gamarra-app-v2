import { Request, Response } from 'express';
import * as vendedorService from '../services/vendedorService';

export const getAllVendedores = async (req: Request, res: Response) => {
  try {
    const vendedores = await vendedorService.getAllVendedores();
    res.json(vendedores);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createVendedor = async (req: Request, res: Response) => {
  try {
    const vendedor = await vendedorService.createVendedor(req.body);
    res.status(201).json(vendedor);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addTiendaToVendedor = async (req: Request, res: Response) => {
    try {
      const { vendedorId } = req.params;
      const tienda = await vendedorService.addTiendaToVendedor(vendedorId, req.body);
      res.status(201).json(tienda);
    } catch (err) {
      res.status(400).send(err);
    }
  };

export const addProductoToTienda = async (req: Request, res: Response) => {
    try {
      const { vendedorId, tiendaId } = req.params;
      const producto = await vendedorService.addProductoToTienda(vendedorId, tiendaId, req.body);
      res.status(201).json(producto);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  export const updateProducto = async (req: Request, res: Response) => {
    try {
      const { productoId } = req.params;
      const producto = await vendedorService.updateProducto(productoId, req.body);
      res.json(producto);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  export const deleteProducto = async (req: Request, res: Response) => {
    try {
      const { productoId } = req.params;
      await vendedorService.deleteProducto(productoId);
      res.status(204).send();
    } catch (err) {
      res.status(400).send(err);
    }
  };