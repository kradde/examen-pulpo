import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { VehicleResponse } from './vehicle-response';
import { Vehicle } from './vehicle';

@Injectable({
    providedIn: 'root',
})
export class VehiclesService {
    private apiUrl = `${environment.apiUrl}/vehicles`;

    constructor(private http: HttpClient) {}

    getVehicles(
        page: number = 1,
        limit: number = 10,
        filters?: { [key: string]: string },
    ): Observable<VehicleResponse> {
        let params = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('limit', limit.toString());

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    params = params.append(key, value);
                }
            });
        }

        return this.http.get<VehicleResponse>(this.apiUrl, { params: params });
    }

    getVehicle(id: number): Observable<Vehicle> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Vehicle>(url).pipe(
            catchError(() => {
                return of({} as Vehicle);
            }),
        );
    }

    saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(this.apiUrl, vehicle);
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        const url = `${this.apiUrl}/${vehicle.id}`;
        return this.http.put<Vehicle>(url, vehicle);
    }

    patchVehicle(id: number, changes: Partial<Vehicle>): Observable<Vehicle> {
        const url = `${this.apiUrl}/${id}`;
        console.log('changes:', changes);
        return this.http.patch<Vehicle>(url, changes);
    }

    deleteVehicle(id: number): Observable<{ message: string }> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<{ message: string }>(url);
    }
}
