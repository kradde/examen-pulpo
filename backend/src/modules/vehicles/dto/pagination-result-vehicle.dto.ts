import { ApiProperty } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { PaginationResultDto } from '../../../common/dto/pagination-result.dto';

export class VehiclePaginationResultDto extends PaginationResultDto<CreateVehicleDto> {
    @ApiProperty({ description: 'Datos', type: [CreateVehicleDto] })
    data: CreateVehicleDto[];
}
