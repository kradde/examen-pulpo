import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import {
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { PaginationService } from '../../common/pagination.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehiclesController', () => {
    let vehiclesController: VehiclesController;
    let vehiclesService: VehiclesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                VehiclesService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockRepository,
                },
                PaginationService,
            ],
        }).compile();

        vehiclesService = module.get<VehiclesService>(VehiclesService);
        vehiclesController = module.get<VehiclesController>(VehiclesController);
    });

    describe('findAllVehicles', () => {
        it('should return a list of vehicles', async () => {
            const result = await vehiclesController.findAllVehicles({
                page: 1,
                limit: 10,
                name: 'Test Vehicle',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
                createdAt: '2022-01-01',
            });
            expect(result).toEqual({
                data: [
                    {
                        id: 1,
                        name: 'Test Vehicle',
                        plate: '123ABC',
                        vin: '1HGCM82633A123456',
                        serialNumber: '1234-5678-9012',
                        createdBy: 'Test User',
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    },
                ],
                meta: {
                    currentPage: 1,
                    perPage: 10,
                    totalPages: 1,
                    totalItems: 1,
                },
            });
        });
    });

    describe('findVehicle', () => {
        it('should return a vehicle', async () => {
            const result = await vehiclesController.findVehicle(1);
            expect(result).toEqual({
                id: 1,
                name: 'Test Vehicle',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    });

    describe('findAllVehicles', () => {
        it('should throw a BadRequestException for invalid date format', async () => {
            try {
                await vehiclesController.findAllVehicles({
                    createdAt: '2024-00-00',
                });
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toEqual('Invalid date format for createdAt');
            }
        });

        it('should throw an InternalServerErrorException for more invalid date format', async () => {
            try {
                await vehiclesController.findAllVehicles({
                    createdAt: '2024-04-',
                });
            } catch (e) {
                expect(e).toBeInstanceOf(InternalServerErrorException);
                expect(e.message).toEqual('Internal server error');
            }
        });
    });

    describe('findVehicle', () => {
        it('should throw a NotFoundException for non-existent id', async () => {
            jest.spyOn(vehiclesService, 'findVehicle').mockImplementation(
                () => {
                    throw new NotFoundException('Vehicle not found');
                },
            );

            try {
                await vehiclesController.findVehicle(0);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Vehicle not found');
            }
        });
    });

    describe('createVehicle', () => {
        it('should create a vehicle and return 201', async () => {
            const createVehicleDto: CreateVehicleDto = {
                name: 'Test Vehicle',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
            };

            const createdVehicle: Vehicle = {
                id: 1,
                ...createVehicleDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(vehiclesService, 'createVehicle').mockResolvedValue(
                createdVehicle,
            );

            const result =
                await vehiclesController.createVehicle(createVehicleDto);

            expect(result).toEqual(createdVehicle);
        });

        it('should throw a BadRequestException for invalid data', async () => {
            const createVehicleDto: CreateVehicleDto = {
                name: '',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
            };

            jest.spyOn(vehiclesService, 'createVehicle').mockImplementation(
                () => {
                    throw new BadRequestException();
                },
            );

            try {
                await vehiclesController.createVehicle(createVehicleDto);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toEqual('Bad Request');
            }
        });

        it('should throw an InternalServerErrorException for server error', async () => {
            const createVehicleDto: CreateVehicleDto = {
                name: 'Test Vehicle',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
            };

            jest.spyOn(vehiclesService, 'createVehicle').mockImplementation(
                () => {
                    throw new InternalServerErrorException();
                },
            );

            try {
                await vehiclesController.createVehicle(createVehicleDto);
            } catch (e) {
                expect(e).toBeInstanceOf(InternalServerErrorException);
                expect(e.message).toEqual('Internal Server Error');
            }
        });
    });

    describe('updateVehicle', () => {
        it('should update a vehicle and return 200', async () => {
            const updateVehicleDto: UpdateVehicleDto = {
                name: 'Updated Vehicle',
                plate: '456DEF',
                vin: '1HGCM82633A654321',
                serialNumber: '5678-9012-3456',
                createdBy: 'Updated User',
            };

            const updatedVehicle: Vehicle = {
                id: 1,
                ...updateVehicleDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(vehiclesService, 'updateVehicle').mockResolvedValue(
                updatedVehicle,
            );

            const result = await vehiclesController.updateVehicle(
                1,
                updateVehicleDto,
            );

            expect(result).toEqual(updatedVehicle);
        });

        it('should throw a BadRequestException for invalid data', async () => {
            const updateVehicleDto: UpdateVehicleDto = {
                name: '',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
            };

            jest.spyOn(vehiclesService, 'updateVehicle').mockImplementation(
                () => {
                    throw new BadRequestException();
                },
            );

            try {
                await vehiclesController.updateVehicle(1, updateVehicleDto);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toEqual('Bad Request');
            }
        });

        it('should throw an InternalServerErrorException for server error', async () => {
            const updateVehicleDto: UpdateVehicleDto = {
                name: 'Test Vehicle',
                plate: '123ABC',
                vin: '1HGCM82633A123456',
                serialNumber: '1234-5678-9012',
                createdBy: 'Test User',
            };

            jest.spyOn(vehiclesService, 'updateVehicle').mockImplementation(
                () => {
                    throw new InternalServerErrorException();
                },
            );

            try {
                await vehiclesController.updateVehicle(1, updateVehicleDto);
            } catch (e) {
                expect(e).toBeInstanceOf(InternalServerErrorException);
                expect(e.message).toEqual('Internal Server Error');
            }
        });
    });

    describe('patchVehicle', () => {
        it('should patch a vehicle and return 200', async () => {
            const updateVehicleDto: UpdateVehicleDto = {
                name: 'Patched Vehicle',
            };

            const patchedVehicle: Vehicle = {
                id: 1,
                ...updateVehicleDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(vehiclesService, 'patchVehicle').mockResolvedValue(
                patchedVehicle,
            );

            const result = await vehiclesController.patchVehicle(
                1,
                updateVehicleDto,
            );

            expect(result).toEqual(patchedVehicle);
        });
    });

    describe('deleteVehicle', () => {
        it('should delete a vehicle and return 200', async () => {
            const id = 1;

            jest.spyOn(vehiclesService, 'deleteVehicle').mockResolvedValue();

            const result = await vehiclesController.deleteVehicle(id);

            expect(result).toEqual({
                message: `Vehicle with id ${id} has been deleted successfully.`,
            });
        });

        it('should throw a NotFoundException for non-existing vehicle', async () => {
            const id = 1;

            jest.spyOn(vehiclesService, 'deleteVehicle').mockImplementation(
                () => {
                    throw new NotFoundException();
                },
            );

            try {
                await vehiclesController.deleteVehicle(id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Not Found');
            }
        });

        it('should throw an InternalServerErrorException for server error', async () => {
            const id = 1;

            jest.spyOn(vehiclesService, 'deleteVehicle').mockImplementation(
                () => {
                    throw new InternalServerErrorException();
                },
            );

            try {
                await vehiclesController.deleteVehicle(id);
            } catch (e) {
                expect(e).toBeInstanceOf(InternalServerErrorException);
                expect(e.message).toEqual('Internal Server Error');
            }
        });
    });
});

const mockRepository = {
    createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([
            [
                {
                    id: 1,
                    name: 'Test Vehicle',
                    plate: '123ABC',
                    vin: '1HGCM82633A123456',
                    serialNumber: '1234-5678-9012',
                    createdBy: 'Test User',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            1,
        ]),
    })),
    findOneBy: jest.fn().mockImplementation((query) =>
        query.id === 1
            ? Promise.resolve({
                  id: 1,
                  name: 'Test Vehicle',
                  plate: '123ABC',
                  vin: '1HGCM82633A123456',
                  serialNumber: '1234-5678-9012',
                  createdBy: 'Test User',
                  createdAt: new Date(),
                  updatedAt: new Date(),
              })
            : Promise.resolve(null),
    ),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    save: jest.fn().mockImplementation((vehicle) => Promise.resolve(vehicle)),
};
