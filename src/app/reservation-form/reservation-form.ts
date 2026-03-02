import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { checkOutAfterCheckIn } from '../validators/date.validators';
import { ReservationsService } from '../services/reservations';
import { ReservationInterface } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm implements OnInit {
  today = new Date();
  tomorrow = new Date(this.today);
  reservationForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  reservastionService = inject(ReservationsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  reservationToEdit: ReservationInterface | undefined = undefined;
  idQueryParam = this.activatedRoute.snapshot.queryParamMap.get('id');
  /**
   * Initializes the reservation form with controls and validators.
   */
  ngOnInit(): void {
    this.tomorrow.setDate(this.today.getDate() + 1);
    //should this be in an if?
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['adam@adam.com', [Validators.required, Validators.email]],
      checkInDate: [this.today.toISOString().slice(0, 10), Validators.required],
      checkOutDate: [this.tomorrow.toISOString().slice(0, 10), Validators.required],
      numberOfGuests: ['1', [Validators.required, Validators.min(1)]]
    }, { validators: checkOutAfterCheckIn });
    
    if (this.idQueryParam) {
      let reservationToEdit = this.reservastionService.getReservation(this.idQueryParam);
      console.log("Reservation to edit form",reservationToEdit);
      if (reservationToEdit) {
        this.reservationForm.patchValue({
          guestName: reservationToEdit.guestName + "Editing this",
          guestEmail: reservationToEdit.guestEmail,
          checkInDate: reservationToEdit.checkInDate,
          checkOutDate: reservationToEdit.checkOutDate,
          numberOfGuests: reservationToEdit.numberOfGuests
        });
        this.reservationToEdit = {...this.reservationForm.value, id: reservationToEdit.id};
        console.log("Reservation to edit form after patch",this.reservationToEdit);
      } else {
        console.log('No reservation found with id:', this.idQueryParam);
      }
    }
  }
  onModify() {
    if (this.reservationForm.valid && this.reservationToEdit) {
      const updatedReservation: ReservationInterface = {
        ...this.reservationForm.value,
        id: this.reservationToEdit.id
      };
      console.log("Updated reservation object",updatedReservation);
      console.log(updatedReservation);
      this.reservastionService.updateReservation(updatedReservation);
      this.router.navigate(['/reservations']);
      this.idQueryParam= null;
    } else {
      console.log('Form is invalid or no reservation to edit');
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      const newReservation: ReservationInterface = {
        ...this.reservationForm.value,
        id: crypto.randomUUID()
      };
      console.log(this.reservationForm.value);
      console.log(newReservation);
      this.reservastionService.addReservation(newReservation);
      this.router.navigate(['/reservations']);
    } else {
      console.log('Form is invalid');
    }
  }
}

//#TODO: move @if logic to the ts file and not in the html
