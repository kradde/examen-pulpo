import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { PaginationService } from '../../common/pagination.service';
import { Vehicle } from './entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('VehiclesService', () => {
    let service: VehiclesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehiclesService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockRepository,
                },
                PaginationService,
            ],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

const mockRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOneBy: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    save: jest.fn().mockImplementation((vehicle) => Promise.resolve(vehicle)),
};
