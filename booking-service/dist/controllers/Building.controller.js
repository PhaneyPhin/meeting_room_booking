"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Building extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.addBuilding = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { building_name, admin_id, num_floor, address } = req.body;
            try {
                var building_id = yield this.getMaxID("building_master", "building_id", "B", 7, "");
                yield this.execute(`insert into building_master values ($1,$2,$3,$4,$5,$6)`, [building_id, building_name, admin_id, num_floor, 1, address]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getBuilding = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var buildings = yield this.getOfDB(`select * from building_master b left join location l on b.admin_id=l.admin_id where flag='1'`, []);
                return res.json({ code: 1, message: 'ok', data: buildings });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateBuilding = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { building_id, building_name, admin_id, num_floor, address } = req.body;
            try {
                yield this.execute(`update building_master set building_name=$1,admin_id=$2,num_floor=$3,address=$4 where building_id=$5`, [building_name, admin_id, num_floor, address, building_id]);
                return res.json({ code: 1, message: "ok" });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteBuilding = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { building_id } = req.body;
            try {
                yield this.execute(`update building_master set flag='0' where building_id=$1`, [building_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getLocation = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { province, amphur, tambon, postcode } = req.body;
            var field = "";
            var count = 0;
            if (province != "") {
                field += ",province_en,province_th";
                count++;
            }
            if (amphur != "") {
                field += ",amphur_en,amphur_th";
                count++;
            }
            if (tambon != "") {
                field += ",tambon_en,tambon_th";
                count++;
            }
            if (postcode != "") {
                field += ",postcode";
                count++;
            }
            field = field.substr(1);
            if (count == 4) {
                field = "*";
            }
            if (field == "") {
                field = "*";
            }
            try {
                var sql = `select distinct ${field} from location where ((province_th = '${province}' or '${province}' = 'all' or '${province}' = '')
                and (amphur_th = '${amphur}' or '${amphur}' = 'all' or '${amphur}' = '') and(tambon_th = '${tambon}' or '${tambon}' = 'all' or '${tambon}' = '')
                and (postcode = '${postcode}' or '${postcode}' = 'all' or '${postcode}' = '')) or ((province_en = '${province}' or '${province}' = 'all' or '${province}' = '')
                and (amphur_en = '${amphur}' or '${amphur}' = 'all' or '${amphur}' = '') and(tambon_en = '${tambon}' or '${tambon}' = 'all' or '${tambon}' = '') and(postcode = '${postcode}' or '${postcode}' = 'all' or '${postcode}' = ''))`;
                console.log(sql);
                var locations = yield this.getOfDB(sql, []);
                return res.json({ code: 1, message: 'ok', data: locations });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Building;
