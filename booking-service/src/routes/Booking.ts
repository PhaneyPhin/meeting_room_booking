import { Router } from 'express';
import Booking from '../controllers/Booking.controller';

import CheckLogin from '../middleware/CheckLogin';
var { CheckAdmin, CheckApprover, checkOnlyApprover } = new CheckLogin();
// Init shared

const router = Router();
const booking = new Booking();

router.post("/booking_room", booking.bookingRoom);
// router.post("/get_booked", booking.getBooked)
router.post("/get_current_reservation_task", booking.getCurrentReservationTask);
router.post("/get_booked_material", booking.getBookedMaterial);
router.post("/get_current_task", booking.getCurrentTask);
router.post("/get_booking", CheckApprover, booking.getBooking);
router.post("/get_booked", CheckApprover, booking.getBooked);
router.post("/get_rejected", CheckApprover, booking.getRejected);
router.post("/get_booking_history", booking.getBookingHistory);
router.post("/get_user_booking", booking.getUserBooking);
router.post("/get_user_booked", booking.getUserBooked);
router.post("/get_user_rejected", booking.getUserRejected);
router.post("/get_user_booking_history", booking.getUserBookingHistory);
router.post("/approve", checkOnlyApprover, booking.approve);
router.post("/reject", checkOnlyApprover, booking.reject);
router.post("/delete_booking", CheckApprover, booking.deleteBooking);
router.post("/get_room_booking", booking.getRoomBooking);

export default router;
