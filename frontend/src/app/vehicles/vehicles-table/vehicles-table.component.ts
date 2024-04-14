import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { Vehicle } from '../vehicle';
import { Meta } from '../../interfaces/meta';
import { ToastrService } from 'ngx-toastr';

interface EditableVehicle extends Vehicle {
    editingField: string | null;
}

@Component({
    selector: 'app-vehicles-table',
    templateUrl: './vehicles-table.component.html',
    styleUrl: './vehicles-table.component.css',
})
export class VehiclesTableComponent implements OnInit {
    vehicles: EditableVehicle[] = [];
    meta: Meta = {
        currentPage: 1,
        perPage: 10,
        totalPages: 1,
        totalItems: 0,
    };

    dropdownOpen = false;
    filters: { [key: string]: { value: boolean; translation: string } } = {
        name: { value: true, translation: 'Nombre' },
        plate: { value: false, translation: 'Placa' },
        vin: { value: false, translation: 'VIN' },
        serialNumber: { value: false, translation: 'Número de serie' },
        createdBy: { value: false, translation: 'Creado por' },
        createdAt: { value: false, translation: 'Creado en' },
    };
    searchText: string = '';

    constructor(
        private vehiclesService: VehiclesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getVehicles(1);
    }

    getVehicles(page: number, filters?: { [key: string]: string }): void {
        this.vehiclesService
            .getVehicles(page, 10, filters)
            .subscribe((data) => {
                this.vehicles = data.data.map((vehicle) => ({
                    ...vehicle,
                    createdAt: vehicle.createdAt.split('T')[0],
                    editingField: null,
                })) as EditableVehicle[];
                this.meta = data.meta;
            });
    }

    changePage(page: number): void {
        this.getVehicles(page);
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    search() {
        const activeFilters = Object.entries(this.filters)
            .filter(([, { value }]) => value)
            .reduce(
                (result, [key]) => ({
                    ...result,
                    [key]: this.searchText,
                }),
                {},
            );

        this.getVehicles(1, activeFilters);
    }

    updateVehicle(vehicle: EditableVehicle, field: string) {
        const key = field as keyof EditableVehicle;
        this.vehiclesService
            .patchVehicle(vehicle.id, {
                [key]: vehicle[key],
            })
            .subscribe(() => {
                vehicle.editingField = null;
            });
    }

    confirmAndDelete(vehicle: EditableVehicle) {
        if (
            window.confirm(
                '¿Estás seguro de que quieres eliminar este vehículo?',
            )
        ) {
            this.deleteVehicle(vehicle.id);
        }
    }

    deleteVehicle(id: number) {
        this.vehiclesService.deleteVehicle(id).subscribe(() => {
            this.toastr.success('Vehículo eliminado con éxito', '', {
                timeOut: 5000,
                progressBar: true,
                positionClass: 'toast-top-right',
                easing: 'ease-in',
                easeTime: 300,
            });
            this.search();
        });
    }
}
