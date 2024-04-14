import { Vehicle } from './vehicle';
import { Meta } from '../interfaces/meta';

export interface VehicleResponse {
    data: Vehicle[];
    meta: Meta;
}
