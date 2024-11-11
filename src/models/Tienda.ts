import { Schema, model, Document } from 'mongoose';
import { Producto } from './Producto';

interface ITienda extends Document {
  nombre: string;
  marca?: string;
  ubicacion: string;
  productos: typeof Producto[];
  valoraciones: any[]; // Define una interfaz adecuada para Valoracion si es necesario
}

const TiendaSchema = new Schema<ITienda>({
  nombre: { type: String, required: true },
  marca: { type: String },
  ubicacion: { type: String, required: true },
  productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

export const Tienda = model<ITienda>('Tienda', TiendaSchema);