import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from './meta.dto';

export class PaginationResultDto<T> {
    @ApiProperty({ description: 'Datos' })
    data: T[];

    @ApiProperty({ description: 'Metadatos', type: MetaDto })
    meta: MetaDto;
}
