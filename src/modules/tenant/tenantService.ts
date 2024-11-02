import { PrismaClient, Tenant } from '@prisma/client';

const tenantService = (prisma: PrismaClient) => ({
    getTenants: async (): Promise<Tenant[]> => {
        return await prisma.tenant.findMany();
    },

    addTenant: async (tenantData: Partial<Tenant>): Promise<Tenant> => {
        const { name } = tenantData;
        return await prisma.tenant.create({
            data: { name: name as string },
        });
    },

    getTenantById: async (id: string): Promise<Tenant | null> => {
        return await prisma.tenant.findUnique({
            where: { id },
        });
    },

    updateTenant: async (id: string, tenantData: Partial<Tenant>): Promise<Tenant> => {
        const { name } = tenantData;
        const data = await prisma.tenant.update({
            where: { id },
            data: { name: name as string },
        });
        return data;
    },

    deleteTenant: async (id: string): Promise<Tenant> => {
        const data = await prisma.tenant.delete({
            where: { id },
        });
        return data;
    },
});

export default tenantService;
