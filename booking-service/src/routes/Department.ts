import { Router } from 'express';
import CheckLogin from '../middleware/CheckLogin';
import Department from '../controllers/Department.controller';

var { CheckAdmin } = new CheckLogin();
// Init shared
const router = Router();
const department = new Department();
router.post("/getDepartment", department.getDepartment);
router.post("/createDepartment", CheckAdmin, department.addDepartment);
router.post("/updateDepartment", CheckAdmin, department.updateDepartment);
router.post("/deleteDepartment", CheckAdmin, department.deleteDepartment);


export default router;
