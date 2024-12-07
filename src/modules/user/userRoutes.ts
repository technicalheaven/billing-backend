import express from 'express';
import { PrismaClient } from '@prisma/client';
import userController from './userController'
import { addUserValidator, deleteUserValidator, getUserByIdValidator, updateUserValidator } from './userValidator';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

const prisma = new PrismaClient();
const userCtrl = userController(prisma);

router.get('/', userCtrl.getUsers); // GET all users
router.post('/',addUserValidator, validateRequest, userCtrl.createUser); // Create a new user
router.get('/:id',getUserByIdValidator, validateRequest, userCtrl.getUserById); // GET a user by ID
router.patch('/:id',updateUserValidator, validateRequest, userCtrl.updateUser); // Update a user by ID
router.delete('/:id', deleteUserValidator, validateRequest, userCtrl.deleteUser); // Delete a user by ID

export default router;
