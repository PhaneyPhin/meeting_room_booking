"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const CheckRoom_controller_1 = tslib_1.__importDefault(require("../controllers/CheckRoom.controller"));
const Building_controller_1 = tslib_1.__importDefault(require("../controllers/Building.controller"));
const Room_controller_1 = tslib_1.__importDefault(require("../controllers/Room.controller"));
const building = new Building_controller_1.default();
const room = new Room_controller_1.default();
const router = express_1.Router();
const checkRoom = new CheckRoom_controller_1.default();
router.post("/checkroom", checkRoom.getRoomDetail);
router.post("/getBuilding", building.getBuilding);
router.post("/getRoomByBuilding", room.getRoomByBuilding);
router.post("/getQRCode", checkRoom.getQRCode);
router.post("/checkActivityRoom", checkRoom.checkActivityRoom);
router.post("/viewDetail", checkRoom.viewDetail);
exports.default = router;
