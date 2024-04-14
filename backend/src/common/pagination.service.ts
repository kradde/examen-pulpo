import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
    getPaginationResult<T>(
        items: T[],
        totalItems: number,
        page: number,
        limit: number,
    ) {
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: items,
            meta: {
                currentPage: page,
                perPage: limit,
                totalPages: totalPages,
                totalItems: totalItems,
            },
        };
    }
}
