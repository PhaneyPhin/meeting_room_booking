
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import Building from '../controllers/Building.controller';

const router = Router();
const building = new Building();
router.post('/getBuilding', building.getBuilding);
router.post('/addBuilding', building.addBuilding);
router.post("/updateBuilding", building.updateBuilding);
router.post("/deleteBuilding", building.deleteBuilding);
router.post("/getLocation", building.getLocation);

export default router;
