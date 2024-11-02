import { Request, Response } from 'express';
import tenantService from './tenantService'
import { PrismaClient } from '@prisma/client';

const tenantController = (prisma: PrismaClient) => ({
    getTenants: async (req: Request, res: Response) => {
        try {
            const result = await tenantService(prisma).getTenants();
            res.success(result)
        } catch (error) {
            res.error(error)
        }
    },

    createTenant: async (req: Request, res: Response) => {
        try {
            const result = await tenantService(prisma).addTenant(req.body);
            res.success(result, 201)
        } catch (error) {
            res.error(error);
        }
    },

    getTenantById: async (req: Request, res: Response) => {
        try {
            const result = await tenantService(prisma).getTenantById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    updateTenant: async (req: Request, res: Response) => {
        try {
            const result = await tenantService(prisma).updateTenant(req.params.id, req.body);
            res.success(result);
        } catch (error) {
            res.error(error);

        }
    },

    deleteTenant: async (req: Request, res: Response) => {
        try {
            const result = await tenantService(prisma).deleteTenant(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
});

export default tenantController;
