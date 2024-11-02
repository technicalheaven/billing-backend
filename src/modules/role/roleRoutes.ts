import express from 'express';
import { PrismaClient } from '@prisma/client';
import roleController from './roleController'
import { addRoleValidator, deleteRoleValidator, getRoleByIdValidator, updateRoleValidator } from './roleValidator';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

const prisma = new PrismaClient();
const roleCtrl = roleController(prisma);

router.get('/', roleCtrl.getRoles); // GET all roles
router.post('/',addRoleValidator, validateRequest, roleCtrl.createRole); // Create a new role
router.get('/:id',getRoleByIdValidator, validateRequest, roleCtrl.getRoleById); // GET a role by ID
router.patch('/:id',updateRoleValidator, validateRequest, roleCtrl.updateRole); // Update a role by ID
router.delete('/:id', deleteRoleValidator, validateRequest, roleCtrl.deleteRole); // Delete a role by ID

export default router;
