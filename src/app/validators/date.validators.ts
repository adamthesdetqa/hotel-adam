import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkOutAfterCheckIn(group: AbstractControl): ValidationErrors | null {
  const checkInDate = group.get('checkInDate')?.value;
  const checkOutDate = group.get('checkOutDate')?.value;

  if (checkInDate && checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      console.warn('Check-out date must be after check-in date.');
      return { checkOutAfterCheckIn: true };
    }
  }

  return null;
}
