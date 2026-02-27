import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  imports: [],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  reservationService = inject(ReservationsService);
  router = inject(Router);
 onEdit(id:string){
    this.router.navigate(['/reservationform'], { queryParams: {id : id } });
  } reservations = this.reservationService.reservationsData;
}
