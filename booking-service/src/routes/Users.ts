import { Router } from 'express';
import User from '../controllers/User.controller';

// Init shared
const router = Router();
const user = new User();
router.post("/get_user", user.getUser);
router.post("/add_user", user.addUser);
router.post("/update_user", user.updateUser);
router.post("/change_password", user.changePassword);
router.post("/admin_change_password", user.triggerChangePassword);
router.post("/delete_user", user.deleteUser);
router.post("/get_role", user.getRole);
export default router;

