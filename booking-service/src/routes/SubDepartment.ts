import { Router } from 'express';
import CheckLogin from '../middleware/CheckLogin';
import SubDepartment from '../controllers/SubDepartment.controller';

var { CheckAdmin } = new CheckLogin();

const router = Router();
const subDepartment = new SubDepartment();
router.post("/getSubDepartment", subDepartment.getSubDepartment);
router.post("/createSubDepartment", CheckAdmin, subDepartment.addSubDepartment);
router.post("/updateSubDepartment", CheckAdmin, subDepartment.updateSubDepartment);
router.post("/deleteSubDepartment", CheckAdmin, subDepartment.deleteSubDepartment);


export default router;
