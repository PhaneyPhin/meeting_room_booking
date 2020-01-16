import { Router } from 'express';
import Dashboard from '../controllers/Dashboard.controller';
import CheckLogin from '../middleware/CheckLogin';


// Init shared
const router = Router();
const dashboard = new Dashboard();
const checkLogin = new CheckLogin();
router.post("/get_dashboard", checkLogin.CheckAdmin, dashboard.getDashboard);
router.post("/getSummaryDepartmentCost", checkLogin.CheckAdmin, dashboard.getSummaryDepartmentCost);
router.post("/getSummarySubDepartmentCost", checkLogin.CheckAdmin, dashboard.getSummarySubDepartmentCost);
router.post("/getMaterialOfficerUsing", checkLogin.CheckAdmin, dashboard.getMaterialOfficerUsing);
router.post("/getBookingOfficerDetail", checkLogin.CheckAdmin, dashboard.getBookingOfficerDetail);
export default router;
