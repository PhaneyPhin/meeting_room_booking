import { Router } from 'express';
import AuthRouter from './auth.route'
import UserRouter from './Users';
import RoomRouter from './Rooms';
import MaterialRouter from './Material';
import BookingRouter from './Booking';
import DashbboardRouter from './Dashboard';
import BuildingRouter from './Building';
import CheckLogin from '../middleware/CheckLogin';
import DepartmentRouter from './Department';
import SubDepartmentRouter from './SubDepartment';
import CheckRoomRouter from './CheckRoom.route';
const router = Router();
const checkLogin = new CheckLogin();
router.use('/checkroom', CheckRoomRouter);
router.use("/", BookingRouter);
router.use('/', AuthRouter);
router.use('**', checkLogin.Check);
router.use('/', UserRouter);
router.use('/', RoomRouter);
router.use("/material", MaterialRouter);
router.use("/building", BuildingRouter);
router.use("/", DashbboardRouter);
router.use('/department', DepartmentRouter);
router.use('/subDepartment', SubDepartmentRouter);

// Export the base-router
export default router;
