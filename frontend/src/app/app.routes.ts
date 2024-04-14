import { Routes } from '@angular/router';
import { VehiclesTableComponent } from './vehicles/vehicles-table/vehicles-table.component';
import { VehicleFormComponent } from './vehicles/vehicle-form/vehicle-form.component';

export const routes: Routes = [
    { path: 'vehicles', component: VehiclesTableComponent },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/edit/:id', component: VehicleFormComponent },
    { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
];
