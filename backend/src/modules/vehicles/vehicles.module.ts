import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { PaginationService } from '../../common/pagination.service';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle])],
    providers: [VehiclesService, PaginationService],
    controllers: [VehiclesController],
})
export class VehiclesModule {}
