import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();

router.get('/usuarios', usuarioController.getAllUsuarios);
router.post('/usuarios', usuarioController.createUsuario);
router.post('/login', usuarioController.loginUsuario);

export default router;