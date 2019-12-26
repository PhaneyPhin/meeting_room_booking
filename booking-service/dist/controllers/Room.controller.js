"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Room extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.addRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { room_name, num_chair, num_table, building_id, floor, status, approvement } = req.body;
            console.log(req.body);
            try {
                var max_id = yield this.getMaxID("room_master", "room_id", "R", 7, "");
                yield this.execute(`insert into room_master  values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [max_id, room_name, num_chair, num_table, 1, building_id, floor, status, approvement]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                console.log(e);
                return res.json(e);
            }
        });
        this.UpdateRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { room_id, room_name, num_chair, num_table, building_id, floor, status, approvement } = req.body;
            try {
                yield this.execute(`update room_master set room_name=$1,num_chair=$2,num_table=$3,building_id=$4,floor=$6,status=$7,approvement=$8 where room_id=$5`, [room_name, num_chair, num_table, building_id, room_id, floor, status, approvement]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var rooms = yield this.getOfDB(`select * from room_master r left join building_master b on r.building_id=b.building_id where r.flag = '1' order by r.room_id`, []);
                return res.json({ code: 1, message: 'ok', data: rooms });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { room_id } = req.body;
            try {
                yield this.execute(`update room_master set flag='0' where room_id=$1`, [room_id]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getFreeRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { start_date, end_date } = req.body;
            try {
                var sql = `select * from room_master r where r.room_id not in (
            select b.room_id from booking_master b where (start_date<='${start_date}' and end_date>='${start_date}') or (start_date<='${end_date}' and end_date>='${end_date}')
            or ('${start_date}'<=start_date and '${end_date}'>=start_date) or ('${start_date}'<=end_date and '${end_date}'>=end_date) and b.flag='1'
            )`;
                var rooms = yield this.getOfDB(sql, []);
                return res.json({ code: 1, message: 'ok', data: rooms });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getFreeRoomWithStatus = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { start_date, end_date, room_id, building_id } = req.body;
            console.log(building_id);
            try {
                var sql = `select s1.*,(case when s2.room_id is null then '0' else '1' end) as status from 
                (select * from room_master r1 where r1.flag='1') s1 left join 
                (select * from room_master r where r.room_id not in (
                    select b.room_id from booking_master b where (start_date<='${start_date}' and end_date>='${start_date}') or (start_date<='${end_date}' and end_date>='${end_date}')
                    or ('${start_date}'<=start_date and '${end_date}'>=start_date) or ('${start_date}'<=end_date and '${end_date}'>=end_date) and b.flag='1') 
                )   s2 on s1.room_id=s2.room_id where (s1.room_id=$1 or $1='') and (s1.building_id=$2 or $2 = '') and not s1.status='cancel using'`;
                var rooms = yield this.getOfDB(sql, [room_id, building_id]);
                return res.json({ code: 1, message: 'ok', data: rooms });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getRoomByBuilding = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { building_id } = req.body;
            try {
                var rooms = yield this.getOfDB(`select * from room_master where building_id=$1`, [building_id]);
                return res.json({ code: 1, message: 'ok', data: rooms });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Room;
