"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Department extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var departments = yield this.getOfDB(`select * from department_master where flag='1' order by department_id`, []);
                return res.json({ code: 1, message: 'ok', data: departments });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { department_name_en, department_name_th } = req.body;
            try {
                var department_id = yield this.getMaxID("department_master", "department_id", "D", 7, "");
                yield this.execute(`insert into department_master (department_id,department_name_en,department_name_th,flag) values ($1,$2,$3,'1')`, [department_id, department_name_en, department_name_th]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { department_id, department_name_en, department_name_th } = req.body;
            try {
                yield this.execute(`update department_master set department_name_en=$1,department_name_th=$2 where department_id=$3`, [department_name_en, department_name_th, department_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { department_id } = req.body;
            try {
                yield this.execute(`update department_master set flag='0' where department_id=$1`, [department_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Department;
