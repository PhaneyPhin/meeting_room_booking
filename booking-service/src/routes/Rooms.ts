import { Router } from 'express';
import Room from '../controllers/Room.controller';

const router = Router();
const room = new Room();
router.post("/get_room", room.getRoom);
router.post("/add_room", room.addRoom);
router.post("/update_room", room.UpdateRoom);
router.post("/delete_room", room.deleteRoom);
router.post("/get_fee_room", room.getFreeRoom);
router.post("/get_room_with_status", room.getFreeRoomWithStatus);
router.post("/getRoomByBuilding", room.getRoomByBuilding);
export default router;
