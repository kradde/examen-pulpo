import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
    @ApiProperty({ description: 'Página actual' })
    currentPage: number;

    @ApiProperty({ description: 'Elementos por página' })
    perPage: number;

    @ApiProperty({ description: 'Total de páginas' })
    totalPages: number;

    @ApiProperty({ description: 'Total de elementos' })
    totalItems: number;
}
