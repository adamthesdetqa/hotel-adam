import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';

@Component({
  selector: 'app-reservation-list',
  imports: [],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  reservationService = inject(ReservationsService);
  reservations = this.reservationService.reservationsData;
}
