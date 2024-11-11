import { Router } from 'express';
import * as categoriaController from '../controllers/categoriaController';

const router = Router();

router.get('/categorias', categoriaController.getCategorias);
router.get('/categorias/:id', categoriaController.getCategoriaById);
router.post('/categorias', categoriaController.createCategoria);
router.put('/categorias/:id', categoriaController.updateCategoria);
router.delete('/categorias/:id', categoriaController.deleteCategoria);

export default router;