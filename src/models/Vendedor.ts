import { Schema, model, Document } from 'mongoose';
import { Tienda } from './Tienda';

interface IVendedor extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  tiendas: typeof Tienda[];
}

const VendedorSchema = new Schema<IVendedor>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  tiendas: [{ type: Schema.Types.ObjectId, ref: 'Tienda' }],
});

export const Vendedor = model<IVendedor>('Vendedor', VendedorSchema);