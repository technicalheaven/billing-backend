interface PaginationFilterParams<T> {
    page?: number;
    pageSize?: number;
    search?: string;
    filterFields: Array<keyof T>; // Fields to apply search filtering
}

export async function paginateAndFilter<T>(
    modelDelegate: { findMany: (args: any) => Promise<T[]>; count: (args: any) => Promise<number> },
    { page = 1, pageSize = 10, search = '', filterFields }: PaginationFilterParams<T>
): Promise<{ records: T[]; total: number; page: number; pageSize: number; totalPages: number }> {

    // Ensure `page` and `pageSize` are integers
    const take = parseInt(String(pageSize), 10); // Convert pageSize to integer
    const skip = (parseInt(String(page), 10) - 1) * take; // Calculate skip as integer

    // Dynamically build the `where` filter based on search and filterFields
    const where = search
        ? {
            OR: filterFields.map((field) => ({
                [field]: { contains: search },
            })),
        }
        : {};

    // Fetch paginated and filtered data and total count in parallel
    const [records, total] = await Promise.all([
        modelDelegate.findMany({ where, skip, take }),
        modelDelegate.count({ where }),
    ]);

    return {
        records,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}
