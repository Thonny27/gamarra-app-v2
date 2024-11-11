import { Schema, model, Document } from 'mongoose';

interface IProducto extends Document {
  nombre: string;
  categoria: Schema.Types.ObjectId;
  precio: number;
  descripcion: string;
  tiendas: Schema.Types.ObjectId[];
}

const ProductoSchema = new Schema<IProducto>({
  nombre: { type: String, required: true },
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  tiendas: [{ type: Schema.Types.ObjectId, ref: 'Tienda' }]
});

export const Producto = model<IProducto>('Producto', ProductoSchema);