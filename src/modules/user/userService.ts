import { PrismaClient, User } from '@prisma/client';
import { paginateAndFilter } from '../../libs/pagination/paginationFilter';
import { queryParams } from '../../types/interfaces';


const userService = (prisma: PrismaClient) => ({
    getUsers: async (query:queryParams) => {
        const {page, pageSize, search } = query;
        return paginateAndFilter<User>(prisma.user, {
            page,
            pageSize,
            search,
            filterFields: ['name'],
        });
    },

    addUser: async (userData: Partial<User>): Promise<User> => {
        const { name = "", tenantId = "" } = userData;
        return await prisma.user.create({
            data: {
                name,
                tenantId
            },
        });
    },

    getUserById: async (id: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { id },
        });
    },

    updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
        const { name = "" } = userData;
        const data = await prisma.user.update({
            where: { id },
            data: { name },
        });
        return data;
    },

    deleteUser: async (id: string): Promise<User> => {
        const data = await prisma.user.delete({
            where: { id },
        });
        return data;
    },
});

export default userService;
