import { Schema, model, Document } from 'mongoose';

interface ICategoria extends Document {
  nombre: string;
  descripcion: string;
}

const CategoriaSchema = new Schema<ICategoria>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true }
});

export const Categoria = model<ICategoria>('Categoria', CategoriaSchema);