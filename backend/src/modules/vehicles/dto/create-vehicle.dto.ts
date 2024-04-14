import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
    @ApiProperty({ description: 'Nombre del vehículo' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Placa del vehículo' })
    @IsString()
    @IsNotEmpty()
    plate: string;

    @ApiProperty({
        description: 'Número de identificación del vehículo (VIN)',
    })
    @IsString()
    @IsNotEmpty()
    vin: string;

    @ApiProperty({
        description: 'Número de serie del vehículo',
    })
    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @ApiProperty({ description: 'Creado por' })
    @IsString()
    @IsNotEmpty()
    createdBy: string;
}
