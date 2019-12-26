import { Router } from 'express';
import Material from '../controllers/Material.controller';
import CheckLogin from '../middleware/CheckLogin';

var { CheckAdmin } = new CheckLogin();
// Init shared
const router = Router();
const material = new Material();
router.post("/get", material.getMaterial);
router.post("/create", CheckAdmin, material.addMaterial);
router.post("/update", CheckAdmin, material.updateMaterial);
router.post("/delete", CheckAdmin, material.deleteMaterial);


export default router;
