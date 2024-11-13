import { Router } from 'express';
import * as vendedorController from '../controllers/vendedorController';
import { authenticateToken } from '../middleware/authMiddleware';

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
router.get('/vendedores', authenticateToken, vendedorController.getAllVendedores);

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
router.post('/vendedores', authenticateToken, vendedorController.createVendedor);
router.post('/vendedores/:vendedorId/tiendas/:tiendaId/productos', authenticateToken, vendedorController.addProductoToTienda);
router.put('/productos/:productoId', authenticateToken, vendedorController.updateProducto);
router.delete('/productos/:productoId', authenticateToken, vendedorController.deleteProducto);
router.post('/vendedores/:vendedorId/tiendas', authenticateToken, vendedorController.addTiendaToVendedor);

export default router;