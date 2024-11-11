import { Categoria } from '../models/Categoria';

export const getCategorias = async () => {
  return await Categoria.find();
};

export const getCategoriaById = async (id: string) => {
  return await Categoria.findById(id);
};

export const createCategoria = async (categoriaData: any) => {
  const categoria = new Categoria(categoriaData);
  return await categoria.save();
};

export const updateCategoria = async (id: string, categoriaData: any) => {
  return await Categoria.findByIdAndUpdate(id, categoriaData, { new: true });
};

export const deleteCategoria = async (id: string) => {
  return await Categoria.findByIdAndDelete(id);
};