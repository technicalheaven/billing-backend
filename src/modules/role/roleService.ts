import { PrismaClient, Role } from '@prisma/client';
import { AppError } from '../../middlewares/responseHandler';

const roleService = (prisma: PrismaClient) => ({
    getRoles: async (): Promise<Role[]> => {
        return await prisma.role.findMany();
    },

    addRole: async (roleData: Partial<Role>): Promise<Role> => {
        const { name } = roleData;
        if (!name) throw new AppError("Role name is required", 400);

        return await prisma.role.create({
            data: { name },
        });
    },

    getRoleById: async (id: string): Promise<Role | null> => {
        const role = await prisma.role.findUnique({
            where: { id },
        });
        if (!role) throw new AppError("Role not found", 404);
        return role;
    },

    updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
        const { name } = roleData;
        if (!name) throw new AppError("Role name is required", 400);

        return await prisma.role.update({
            where: { id },
            data: { name },
        });
    },

    deleteRole: async (id: string): Promise<Role> => {
        return await prisma.role.delete({
            where: { id },
        });
    },
});

export default roleService;
