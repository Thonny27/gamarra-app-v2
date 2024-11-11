import { Router } from 'express';
import * as vendedorController from '../controllers/vendedorController';

const router = Router();

/**
 * @swagger
 * /vendedores:
 *   get:
 *     summary: Retrieve a list of vendedores
 *     responses:
 *       200:
 *         description: A list of vendedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/vendedores', vendedorController.getAllVendedores);

/**
 * @swagger
 * /vendedores:
 *   post:
 *     summary: Create a new vendedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               tiendas:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: The created vendedor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/vendedores', vendedorController.createVendedor);
router.post('/vendedores/:vendedorId/tiendas/:tiendaId/productos', vendedorController.addProductoToTienda);
router.put('/productos/:productoId', vendedorController.updateProducto);
router.delete('/productos/:productoId', vendedorController.deleteProducto);
router.post('/vendedores/:vendedorId/tiendas', vendedorController.addTiendaToVendedor);

export default router;