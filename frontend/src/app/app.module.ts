import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VehiclesModule } from './vehicles/vehicles.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule,
        VehiclesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
