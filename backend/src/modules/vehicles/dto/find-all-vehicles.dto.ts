import { ApiProperty } from '@nestjs/swagger';

export class FindAllVehiclesDto {
    @ApiProperty({ required: false, description: 'Número de página' })
    page?: number;

    @ApiProperty({
        required: false,
        description: 'Límite de elementos por página',
    })
    limit?: number;

    @ApiProperty({ required: false, description: 'Nombre del vehículo' })
    name?: string;

    @ApiProperty({ required: false, description: 'Placa del vehículo' })
    plate?: string;

    @ApiProperty({
        required: false,
        description: 'Número de identificación del vehículo (VIN)',
    })
    vin?: string;

    @ApiProperty({
        required: false,
        description: 'Número de serie del vehículo',
    })
    serialNumber?: string;

    @ApiProperty({ required: false, description: 'Creado por' })
    createdBy?: string;

    @ApiProperty({ required: false, description: 'Fecha de creación' })
    createdAt?: string;
}
