import { Schema, model, Document } from 'mongoose';

interface IUsuario extends Document {
  nombre: string;
  paterno: string;
  materno: string;
  correo: string;
  password: string;
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  paterno: { type: String, required: true },
  materno: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);