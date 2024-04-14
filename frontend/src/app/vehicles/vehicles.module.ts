import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [VehiclesTableComponent, VehicleFormComponent],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
    ],
    exports: [VehiclesTableComponent],
})
export class VehiclesModule {}
