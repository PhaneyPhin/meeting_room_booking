import { Router } from 'express';
import User from '../controllers/User.controller';
import CheckLogin from '../middleware/CheckLogin';

// Init shared
const router = Router();
const user = new User();
const checkLogin = new CheckLogin();
router.post("/getUserInformation", user.getUserInformation)
router.post("/saveUserInformation", user.saveUserInformation);
router.post("/updateOwnPassword", user.updateOwnPassword);
// router.use("/", checkLogin.CheckAdmin);
router.post("/get_user", user.getUser);
router.post("/add_user", user.addUser);
router.post("/update_user", user.updateUser);
router.post("/change_password", user.changePassword);
router.post("/admin_change_password", user.triggerChangePassword);
router.post("/delete_user", user.deleteUser);
router.post("/get_role", user.getRole);
export default router;

