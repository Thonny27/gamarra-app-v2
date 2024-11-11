import { Producto } from '../models/Producto';
import { Tienda } from '../models/Tienda';
import { Categoria } from '../models/Categoria';
import mongoose from 'mongoose';

interface ProductoQueryParams {
  nombre?: string;
  precio?: string;
  precioMin?: string;
  precioMax?: string;
}

export const getProductos = async (params: ProductoQueryParams) => {
  const query: any = {};

  if (params.nombre) {
    query.nombre = new RegExp(params.nombre, 'i');
  }

  if (params.precio) {
    query.precio = Number(params.precio);
  }

  if (params.precioMin || params.precioMax) {
    query.precio = {};
    if (params.precioMin) {
      query.precio.$gte = Number(params.precioMin);
    }
    if (params.precioMax) {
      query.precio.$lte = Number(params.precioMax);
    }
  }

  const productos = await Producto.find(query);

  const response = [];

  for (const producto of productos) {
    const tiendas = await Tienda.find({ productos: producto._id }).populate('productos');

    const tiendasConProductosFiltrados = tiendas.map(tienda => {
      const productosFiltrados = tienda.productos.filter((prod: any) => {
        let matches = true;
        if (params.nombre) {
          matches = matches && prod.nombre.match(new RegExp(params.nombre, 'i'));
        }
        if (params.precio) {
          matches = matches && prod.precio === Number(params.precio);
        }
        if (params.precioMin) {
          matches = matches && prod.precio >= Number(params.precioMin);
        }
        if (params.precioMax) {
          matches = matches && prod.precio <= Number(params.precioMax);
        }
        return matches;
      });
      return {
        ...tienda.toObject(),
        productos: productosFiltrados
      };
    });

    response.push({
      producto: producto.toObject(),
      tiendas: tiendasConProductosFiltrados
    });
  }

  return response;
};

export const getProductosByCategoria = async (categoriaId: string) => {
  // Convertir categoriaId a ObjectId
  const categoriaObjectId = new mongoose.Types.ObjectId(categoriaId);

  // Verificar si la categoría existe
  const categoria = await Categoria.findById(categoriaObjectId);
  if (!categoria) {
    return [];
  }

  const productos = await Producto.find({ categoria: categoriaObjectId });

  const response = [];

  for (const producto of productos) {
    const tiendas = await Tienda.find({ productos: producto._id }).populate('productos');
    const tiendasConProductosFiltrados = tiendas.map(tienda => {
      const productosFiltrados = tienda.productos.filter((prod: any) => prod.categoria.toString() === categoriaId);
      return {
        ...tienda.toObject(),
        productos: productosFiltrados
      };
    });

    response.push({
      producto: producto.toObject(),
      tiendas: tiendasConProductosFiltrados
    });
  }

  return response;
};