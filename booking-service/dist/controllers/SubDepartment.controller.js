"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class SubDepartment extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getSubDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { department_id } = req.body;
            try {
                var subDepartments = yield this.getOfDB(`select * from sub_department_master sd left join department_master d on sd.department_id=d.department_id
                 where sd.flag='1' and (sd.department_id=$1 or $1='')`, [department_id]);
                return res.json({ code: 1, message: 'ok', data: subDepartments });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addSubDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { sub_department_name_en, sub_department_name_th, department_id } = req.body;
            try {
                var sub_department_id = yield this.getMaxID("sub_department_master", "sub_department_id", "S", 7, "");
                yield this.execute(`insert into sub_department_master (sub_department_id,sub_department_name_en,sub_department_name_th,department_id,flag) values ($1,$2,$3,$4,'1')`, [sub_department_id, sub_department_name_en, sub_department_name_th, department_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateSubDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { sub_department_id, sub_department_name_en, sub_department_name_th, department_id } = req.body;
            try {
                yield this.execute(`update sub_department_master set sub_department_name_en=$1,sub_department_name_th=$2,department_id=$3 where sub_department_id=$4`, [sub_department_name_en, sub_department_name_th, department_id, sub_department_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteSubDepartment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { sub_department_id } = req.body;
            console.log(sub_department_id);
            try {
                yield this.execute(`update sub_department_master set flag='0' where sub_department_id=$1`, [sub_department_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getSubDepartmentByDepartmentId = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { department_id } = req.body;
            console.log(department_id);
            try {
                var subDepartments = yield this.getOfDB(`select * from sub_department_master where department_id=$1`, [department_id]);
                return res.json({ code: 1, message: 'ok', data: subDepartments });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = SubDepartment;
