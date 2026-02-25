import { Injectable } from '@angular/core';
import { ReservationInterface } from '../models/reservation';
@Injectable({
  providedIn: 'root',
})
export class Reservations {
reservationsData! : ReservationInterface[];

constructor() {
    const storedReservations = localStorage.getItem('reservations');
    this.reservationsData = storedReservations ? JSON.parse(storedReservations) : [];
  }

addReservation(reservation: ReservationInterface) {
    this.reservationsData.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservationsData));
  }

getReservations(): ReservationInterface[] {
    return this.reservationsData;
  }

deleteReservation(id: string) {
    this.reservationsData = this.reservationsData.filter(reservation => reservation.id !== id);
    localStorage.setItem('reservations', JSON.stringify(this.reservationsData));
  }

updateReservation(updatedReservation: ReservationInterface) {
    const index = this.reservationsData.findIndex(reservation => reservation.id === updatedReservation.id);
    if (index !== -1) {
      this.reservationsData[index] = updatedReservation;
      localStorage.setItem('reservations', JSON.stringify(this.reservationsData));
    }
  }
}
