import { Component, inject, OnInit } from '@angular/core';
import { Reservations } from '../services/reservations';
import { ReservationInterface } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  imports: [],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList implements OnInit {
  reservationService = inject(Reservations);
  reservations: ReservationInterface[] = [];

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }
}
