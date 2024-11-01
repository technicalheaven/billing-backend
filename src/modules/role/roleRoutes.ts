import express from 'express';
import { PrismaClient } from '@prisma/client';
import roleController from './roleController'
const router = express.Router();

const prisma = new PrismaClient();
const roleCtrl = roleController(prisma);

router.get('/', roleCtrl.getRoles); // GET all roles
router.post('/', roleCtrl.createRole); // Create a new role
router.get('/:id', roleCtrl.getRoleById); // GET a role by ID
router.patch('/:id', roleCtrl.updateRole); // Update a role by ID
router.delete('/:id', roleCtrl.deleteRole); // Delete a role by ID

export default router;
