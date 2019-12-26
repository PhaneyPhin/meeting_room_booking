"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Material extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getMaterial = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var materials = yield this.getOfDB(`select * from material_master where flag='1'`, []);
                return res.json({ code: 1, message: 'ok', data: materials });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addMaterial = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { material_name, material_price } = req.body;
            try {
                var material_id = yield this.getMaxID("material_master", "material_id", "M", 8, "");
                yield this.execute(`insert into material_master values ($1,$2,$3,'1')`, [material_id, material_name, material_price]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateMaterial = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { material_id, material_name, material_price } = req.body;
            try {
                yield this.execute(`update material_master set material_name=$2,material_price=$3 where material_id=$1`, [material_id, material_name, material_price]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteMaterial = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { material_id } = req.body;
            try {
                yield this.execute(`update material_master set flag='0' where material_id=$1`, [material_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Material;
