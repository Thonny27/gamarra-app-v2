import { Vendedor } from '../models/Vendedor';
import { Tienda } from '../models/Tienda';
import { Producto } from '../models/Producto';

export const getAllVendedores = async () => {
  return await Vendedor.find().populate({
    path: 'tiendas',
    populate: { path: 'productos' }
  });
};

export const createVendedor = async (vendedorData: any) => {
  const tiendasData = vendedorData.tiendas || [];
  const tiendaIds = [];

  for (const tiendaData of tiendasData) {
    const productosData = tiendaData.productos || [];
    const productoIds = [];

    for (const productoData of productosData) {
      const producto = new Producto(productoData);
      await producto.save();
      productoIds.push(producto._id);
    }

    tiendaData.productos = productoIds;
    const tienda = new Tienda(tiendaData);
    await tienda.save();
    tiendaIds.push(tienda._id);
  }

  vendedorData.tiendas = tiendaIds;
  const vendedor = new Vendedor(vendedorData);
  return await vendedor.save();
};

export const addProductoToTienda = async (vendedorId: string, tiendaId: string, productoData: any) => {
  const producto = new Producto(productoData);
  await producto.save();

  const tienda = await Tienda.findById(tiendaId);
  if (!tienda) throw new Error('Tienda not found');

  tienda.productos.push(producto.id);
  await tienda.save();

  return producto;
};

export const addTiendaToVendedor = async (vendedorId: string, tiendaData: any) => {
    const productosData = tiendaData.productos || [];
    const productoIds = [];
  
    for (const productoData of productosData) {
      const producto = new Producto(productoData);
      await producto.save();
      productoIds.push(producto._id);
    }
  
    tiendaData.productos = productoIds;
    const tienda = new Tienda(tiendaData);
    await tienda.save();
  
    const vendedor = await Vendedor.findById(vendedorId);
    if (!vendedor) throw new Error('Vendedor not found');
  
    vendedor.tiendas.push(tienda.id);
    await vendedor.save();
  
    return tienda;
  };

export const updateProducto = async (productoId: string, productoData: any) => {
  return await Producto.findByIdAndUpdate(productoId, productoData, { new: true });
};

export const deleteProducto = async (productoId: string) => {
  return await Producto.findByIdAndDelete(productoId);
};