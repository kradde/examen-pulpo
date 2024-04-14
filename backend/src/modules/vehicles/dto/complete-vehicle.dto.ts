export class CompleteVehicleDto {
    id: number;
    name: string | null = null;
    plate: string | null = null;
    vin: string | null = null;
    serialNumber: string | null = null;
    createdBy: string | null = null;

    constructor(partial: Partial<CompleteVehicleDto>) {
        delete partial.id;
        Object.assign(this, partial);
    }
}
