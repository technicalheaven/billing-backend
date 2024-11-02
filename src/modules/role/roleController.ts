import { Request, Response } from 'express';
import roleService from './roleService'
import { PrismaClient } from '@prisma/client';

const roleController = (prisma: PrismaClient) => ({
    getRoles: async (req: Request, res: Response) => {
        try {
            const result = await roleService(prisma).getRoles(req.query);
            res.success(result)
        } catch (error) {
            res.error(error);
        }
    },

    createRole: async (req: Request, res: Response) => {
        try {
            const result = await roleService(prisma).addRole(req.body);
            res.success(result, 201)
        } catch (error) {
            res.error(error);
        }
    },

    getRoleById: async (req: Request, res: Response) => {
        try {
            const result = await roleService(prisma).getRoleById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    updateRole: async (req: Request, res: Response) => {
        try {
            const result = await roleService(prisma).updateRole(req.params.id, req.body);
            res.success(result);
        } catch (error) {
            res.error(error);

        }
    },

    deleteRole: async (req: Request, res: Response) => {
        try {
            const result = await roleService(prisma).deleteRole(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
});

export default roleController;
