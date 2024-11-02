import { PrismaClient, Role } from '@prisma/client';

const roleService = (prisma: PrismaClient) => ({
    getRoles: async (): Promise<Role[]> => {
        return await prisma.role.findMany();
    },

    addRole: async (roleData: Partial<Role>): Promise<Role> => {
        const { name = "", tenantId = "" } = roleData;
        return await prisma.role.create({
            data: {
                name,
                tenantId
            },
        });
    },

    getRoleById: async (id: string): Promise<Role | null> => {
        return await prisma.role.findUnique({
            where: { id },
        });
    },

    updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
        const { name = "" } = roleData;
        const data = await prisma.role.update({
            where: { id },
            data: { name },
        });
        return data;
    },

    deleteRole: async (id: string): Promise<Role> => {
        const data = await prisma.role.delete({
            where: { id },
        });
        return data;
    },
});

export default roleService;
