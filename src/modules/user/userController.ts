import { Request, Response } from 'express';
import userService from './userService'
import { PrismaClient } from '@prisma/client';

const userController = (prisma: PrismaClient) => ({
    getUsers: async (req: Request, res: Response) => {
        try {
            const result = await userService(prisma).getUsers(req.query);
            res.success(result)
        } catch (error) {
            res.error(error);
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const result = await userService(prisma).addUser(req.body);
            res.success(result, 201)
        } catch (error) {
            res.error(error);
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const result = await userService(prisma).getUserById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const result = await userService(prisma).updateUser(req.params.id, req.body);
            res.success(result);
        } catch (error) {
            res.error(error);

        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const result = await userService(prisma).deleteUser(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
});

export default userController;
