import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
    @ApiProperty({ required: false, description: 'Nombre del vehículo' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string | null = null;

    @ApiProperty({ required: false, description: 'Placa del vehículo' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    plate?: string | null = null;

    @ApiProperty({
        required: false,
        description: 'Número de identificación del vehículo (VIN)',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    vin?: string | null = null;

    @ApiProperty({
        required: false,
        description: 'Número de serie del vehículo',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    serialNumber?: string | null = null;

    @ApiProperty({ required: false, description: 'Creado por' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    createdBy?: string | null = null;
}
