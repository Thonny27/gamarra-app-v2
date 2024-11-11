import { Router } from 'express';
import * as vendedorController from '../controllers/vendedorController';

const router = Router();

router.get('/vendedores', vendedorController.getAllVendedores);
router.post('/vendedores', vendedorController.createVendedor);
router.post('/vendedores/:vendedorId/tiendas/:tiendaId/productos', vendedorController.addProductoToTienda);
router.put('/productos/:productoId', vendedorController.updateProducto);
router.delete('/productos/:productoId', vendedorController.deleteProducto);
router.post('/vendedores/:vendedorId/tiendas', vendedorController.addTiendaToVendedor);

export default router;