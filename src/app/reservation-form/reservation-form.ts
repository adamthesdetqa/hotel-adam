import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { checkOutAfterCheckIn } from '../validators/date.validators';
import { ReservationsService } from '../services/reservations';
import { ReservationInterface } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm implements OnInit {
today = new Date();
tomorrow = new Date(this.today);
reservationForm!: FormGroup;
formBuilder: FormBuilder = inject(FormBuilder);
reservastionService = inject(ReservationsService);
  /**
   * Initializes the reservation form with controls and validators.
   */
  ngOnInit(): void {
      this.tomorrow.setDate(this.today.getDate() + 1);
      this.reservationForm = this.formBuilder.group({
        guestName: ['Adam', Validators.required],
        guestEmail: ['adam@adam.com', [Validators.required, Validators.email]],
        checkInDate: [this.today.toISOString().slice(0,10), Validators.required],
        checkOutDate: [this.tomorrow.toISOString().slice(0,10), Validators.required],
        numberOfGuests: ['1', [Validators.required, Validators.min(1)]]
      }, { validators: checkOutAfterCheckIn });
  }
  onSubmit(){
    if(this.reservationForm.valid){
      const newReservation: ReservationInterface = {
        ...this.reservationForm.value,
        id: crypto.randomUUID()
      };
      console.log(this.reservationForm.value);
      console.log(newReservation);
      this.reservastionService.addReservation(newReservation);
    } else{
      console.log('Form is invalid');
      // console.log(this.reservationForm.get("guestEmail")?.errors);
    }


  }
}
