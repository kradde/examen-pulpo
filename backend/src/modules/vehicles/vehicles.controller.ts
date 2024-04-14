import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Delete,
    Query,
    UsePipes,
    ValidationPipe,
    BadRequestException,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FindAllVehiclesDto } from './dto/find-all-vehicles.dto';
import { PaginationResultDto } from '../../common/dto/pagination-result.dto';
import { VehiclePaginationResultDto } from './dto/pagination-result-vehicle.dto';
import {
    BadRequestResponseDto,
    BadRequestResponseExtendedDto,
} from '../../common/dto/bad-request.dto';
import { InternalServerErrorResponseDto } from '../../common/dto/server-error.dto';
import { NotFoundResponseDto } from '../../common/dto/not-found.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
    constructor(private vehiclesService: VehiclesService) {}

    @Get()
    @ApiOkResponse({
        description: 'La lista de vehículos ha sido obtenida exitosamente.',
        type: VehiclePaginationResultDto,
    })
    @ApiBadRequestResponse({
        description: 'Solicitud incorrecta. Por favor, revisa tu petición.',
        type: BadRequestResponseDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    findAllVehicles(
        @Query() filters: FindAllVehiclesDto,
    ): Promise<PaginationResultDto<Vehicle>> {
        if (filters.createdAt) {
            const dateParts = filters.createdAt.split('-');
            if (
                dateParts.length !== 3 ||
                isNaN(Date.parse(filters.createdAt))
            ) {
                if (
                    !filters.name &&
                    !filters.plate &&
                    !filters.vin &&
                    !filters.serialNumber &&
                    !filters.createdBy
                ) {
                    throw new BadRequestException(
                        'Invalid date format for createdAt',
                    );
                }
                filters.createdAt = undefined;
            }
        }
        return this.vehiclesService.findAllVehicles(
            filters.page,
            filters.limit,
            {
                name: filters.name,
                plate: filters.plate,
                vin: filters.vin,
                serialNumber: filters.serialNumber,
                createdBy: filters.createdBy,
                createdAt: filters.createdAt,
            },
        );
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'La información del vehículo encontrado.',
        type: Vehicle,
    })
    @ApiNotFoundResponse({
        description: 'El recurso solicitado no se pudo encontrar.',
        type: NotFoundResponseDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    findVehicle(@Param('id') id: number): Promise<Vehicle> {
        return this.vehiclesService.findVehicle(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Vehicle,
    })
    @ApiBadRequestResponse({
        description: 'Solicitud incorrecta. Por favor, revisa tu petición.',
        type: BadRequestResponseExtendedDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    createVehicle(
        @Body() createVehicleDto: CreateVehicleDto,
    ): Promise<Vehicle> {
        return this.vehiclesService.createVehicle(createVehicleDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse({
        description:
            'La información del vehiculo con sus elementos actualizados. Si uno no se encuentra en el body request este se volvera null',
        type: Vehicle,
    })
    @ApiNotFoundResponse({
        description: 'El recurso solicitado no se pudo encontrar.',
        type: NotFoundResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Solicitud incorrecta. Por favor, revisa tu petición.',
        type: BadRequestResponseExtendedDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    updateVehicle(
        @Param('id') id: number,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ): Promise<Vehicle> {
        return this.vehiclesService.updateVehicle(id, updateVehicleDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: UpdateVehicleDto })
    @ApiOkResponse({
        description:
            'La información del vehiculo con sus elementos actualizados. Solo actualiza las propiedades recibidas mediante el request body',
        type: Vehicle,
    })
    @ApiNotFoundResponse({
        description: 'El recurso solicitado no se pudo encontrar.',
        type: NotFoundResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Solicitud incorrecta. Por favor, revisa tu petición.',
        type: BadRequestResponseExtendedDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    patchVehicle(
        @Param('id') id: number,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ): Promise<Vehicle> {
        return this.vehiclesService.patchVehicle(id, updateVehicleDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Vehicle with id :id has been deleted successfully.',
        content: {
            'application/json': {
                example: {
                    message:
                        'Vehicle with id 13 has been deleted successfully.',
                },
            },
        },
    })
    @ApiNotFoundResponse({
        description: 'El recurso solicitado no se pudo encontrar.',
        type: NotFoundResponseDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Ha ocurrido un error interno en el servidor.',
        type: InternalServerErrorResponseDto,
    })
    async deleteVehicle(@Param('id') id: number): Promise<{ message: string }> {
        await this.vehiclesService.deleteVehicle(id);
        return {
            message: `Vehicle with id ${id} has been deleted successfully.`,
        };
    }
}
