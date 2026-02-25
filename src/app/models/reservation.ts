export interface ReservationInterface {
  id: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestName: string;
  guestEmail: string;
  numberOfGuests: number;
}
