import { Schema, model, Document } from 'mongoose';

interface IUsuario extends Document {
  nombre: string;
  correo: string;
  contraseña: string;
  rol: 'comprador' | 'vendedor';
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['comprador', 'vendedor'], required: true }
});

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);