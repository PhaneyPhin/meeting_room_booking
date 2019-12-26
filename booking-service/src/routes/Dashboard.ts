import { Router } from 'express';
import Dashboard from '../controllers/Dashboard.controller';


// Init shared
const router = Router();
const dashboard = new Dashboard();
router.post("/get_dashboard", dashboard.getDashboard);
router.post("/getSummaryDepartmentCost", dashboard.getSummaryDepartmentCost);
router.post("/getSummarySubDepartmentCost", dashboard.getSummarySubDepartmentCost);
export default router;
