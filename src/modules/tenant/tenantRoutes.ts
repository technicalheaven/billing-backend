import express from 'express';
import { PrismaClient } from '@prisma/client';
import tenantController from './tenantController'
import { addTenantValidator, deleteTenantValidator, getTenantByIdValidator, updateTenantValidator } from './tenantValidator';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

const prisma = new PrismaClient();
const tenantCtrl = tenantController(prisma);

router.get('/', tenantCtrl.getTenants); // GET all tenants
router.post('/',addTenantValidator, validateRequest, tenantCtrl.createTenant); // Create a new tenant
router.get('/:id',getTenantByIdValidator, validateRequest, tenantCtrl.getTenantById); // GET a tenant by ID
router.patch('/:id',updateTenantValidator, validateRequest, tenantCtrl.updateTenant); // Update a tenant by ID
router.delete('/:id', deleteTenantValidator, validateRequest, tenantCtrl.deleteTenant); // Delete a tenant by ID

export default router;
