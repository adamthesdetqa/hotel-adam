import { Injectable, signal } from '@angular/core';
import { ReservationInterface } from '../models/reservation';
@Injectable({
    providedIn: 'root',
})
export class ReservationsService {
    reservationsData = signal<ReservationInterface[]>([]);

    constructor() {
        const storedReservations = localStorage.getItem('reservations');
        this.reservationsData.set(storedReservations ? JSON.parse(storedReservations) : []);
    }

    addReservation(reservation: ReservationInterface) {
        console.log('Adding reservation:', reservation);
        this.reservationsData.set([...this.reservationsData(), reservation]);
        localStorage.setItem('reservations', JSON.stringify(this.reservationsData()));
    }

    getReservations(): ReservationInterface[] {
        return this.reservationsData();
    }

    deleteReservation(id: string) {
        this.reservationsData.set(this.reservationsData().filter(reservation => reservation.id !== id))
        const data = this.reservationsData() || [];
        localStorage.setItem('reservations', JSON.stringify(data));
    }

    updateReservation(updatedReservation: ReservationInterface) {
        const index = this.reservationsData().findIndex(reservation => reservation.id === updatedReservation.id);
        if (index !== -1) {
            this.reservationsData()[index] = updatedReservation;
            localStorage.setItem('reservations', JSON.stringify(this.reservationsData()));
        }
    }
}
