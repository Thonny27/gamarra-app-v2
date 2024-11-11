import { Router } from 'express';
import * as productoController from '../controllers/productoController';

const router = Router();

router.get('/productos', productoController.getProductos);
router.get('/productos/categoria/:categoriaId', productoController.getProductosByCategoria);

export default router;