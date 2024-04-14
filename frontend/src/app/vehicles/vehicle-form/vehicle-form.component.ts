import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from '../vehicles.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrl: './vehicle-form.component.css',
})
export class VehicleFormComponent implements OnInit {
    vehicle: Vehicle = {} as Vehicle;
    isUpdating: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private vehiclesService: VehiclesService,
        private router: Router,
        private toastr: ToastrService,
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && !isNaN(Number(id))) {
            this.isUpdating = true;
            this.vehiclesService.getVehicle(Number(id)).subscribe((vehicle) => {
                if (Object.keys(vehicle).length === 0) {
                    this.router.navigate(['/vehicles/new']);
                } else {
                    this.vehicle = vehicle;
                }
            });
        } else {
            this.router.navigate(['/vehicles/new']);
        }
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            if (this.vehicle.id) {
                this.vehiclesService
                    .updateVehicle(this.vehicle)
                    .subscribe(() => {
                        this.toastr.success(
                            'Vehículo actualizado con éxito',
                            '',
                            {
                                timeOut: 5000,
                                progressBar: true,
                                positionClass: 'toast-top-right',
                                easing: 'ease-in',
                                easeTime: 300,
                            },
                        );
                    });
            } else {
                this.vehiclesService
                    .saveVehicle(this.vehicle)
                    .subscribe((savedVehicle) => {
                        this.router.navigate([
                            `vehicles/edit/${savedVehicle.id}`,
                        ]);
                        this.toastr.success('Vehículo guardado con éxito', '', {
                            timeOut: 5000,
                            progressBar: true,
                            positionClass: 'toast-top-right',
                            easing: 'ease-in',
                            easeTime: 300,
                        });
                    });
            }
        }
    }
}
