import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CompleteVehicleDto } from './dto/complete-vehicle.dto';
import { PaginationService } from '../../common/pagination.service';
import { PaginationResultDto } from '../../common/dto/pagination-result.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private vehiclesRepository: Repository<Vehicle>,
        private paginationService: PaginationService,
    ) {}

    async findAllVehicles(
        page: number = 1,
        limit: number = 10,
        filters: {
            name?: string;
            plate?: string;
            vin?: string;
            serialNumber?: string;
            createdBy?: string;
            createdAt?: string;
        } = {},
    ): Promise<PaginationResultDto<Vehicle>> {
        const queryBuilder =
            this.vehiclesRepository.createQueryBuilder('vehicle');

        Object.entries(filters).forEach(([key, value], index) => {
            if (value) {
                let condition: string;
                if (key === 'createdAt') {
                    condition = `DATE(vehicle.${key}) = :${key}`;
                } else {
                    condition = `LOWER(vehicle.${key}) LIKE :${key}`;
                    value = `%${value.toLowerCase()}%`;
                }

                if (index === 0) {
                    queryBuilder.where(condition, { [key]: value });
                } else {
                    queryBuilder.orWhere(condition, { [key]: value });
                }
            }
        });

        const [vehicles, totalVehicles] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return this.paginationService.getPaginationResult(
            vehicles,
            totalVehicles,
            page,
            limit,
        );
    }

    async findVehicle(id: number): Promise<Vehicle> {
        return await this.getExistingVehicle(id);
    }

    async deleteVehicle(id: number): Promise<void> {
        const result = await this.vehiclesRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`No vehicle found with id ${id}.`);
        }
    }

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const vehicle = new Vehicle();
        vehicle.name = createVehicleDto.name;
        vehicle.plate = createVehicleDto.plate;
        vehicle.vin = createVehicleDto.vin;
        vehicle.serialNumber = createVehicleDto.serialNumber;
        vehicle.createdBy = createVehicleDto.createdBy;

        return this.vehiclesRepository.save(vehicle);
    }

    async updateVehicle(
        id: number,
        vehicleData: UpdateVehicleDto,
    ): Promise<Vehicle> {
        const existingVehicle = await this.getExistingVehicle(id);
        const completeVehicleData = new CompleteVehicleDto(vehicleData);
        return await this.mergeAndSave(existingVehicle, completeVehicleData);
    }

    async patchVehicle(
        id: number,
        vehicleData: UpdateVehicleDto,
    ): Promise<Vehicle> {
        const existingVehicle = await this.getExistingVehicle(id);
        return await this.mergeAndSave(existingVehicle, vehicleData);
    }

    private async getExistingVehicle(id: number): Promise<Vehicle> {
        const existingVehicle = await this.vehiclesRepository.findOneBy({ id });

        if (!existingVehicle) {
            throw new NotFoundException(`No vehicle found with id ${id}.`);
        }

        return existingVehicle;
    }

    private async mergeAndSave(
        existingVehicle: Vehicle,
        vehicleData: Partial<UpdateVehicleDto>,
    ): Promise<Vehicle> {
        const updatedVehicle = this.vehiclesRepository.merge(
            existingVehicle,
            vehicleData,
        );

        return await this.vehiclesRepository.save(updatedVehicle);
    }
}
