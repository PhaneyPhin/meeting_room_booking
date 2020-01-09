import { Router } from 'express';
import CheckRoom from '../controllers/CheckRoom.controller';
import Building from '../controllers/Building.controller';
import Room from '../controllers/Room.controller';

const building = new Building();
const room = new Room();
// Init shared
const router = Router();
const checkRoom = new CheckRoom();
router.post("/checkroom", checkRoom.getRoomDetail);
router.post("/getBuilding", building.getBuilding);
router.post("/getRoomByBuilding", room.getRoomByBuilding);
router.post("/getQRCode", checkRoom.getQRCode);
router.post("/checkActivityRoom", checkRoom.checkActivityRoom);
router.post("/viewDetail", checkRoom.viewDetail);
export default router;
