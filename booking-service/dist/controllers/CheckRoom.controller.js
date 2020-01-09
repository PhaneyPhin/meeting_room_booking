"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
class CheckRoom extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getRoomDetail = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { time, date, building_id } = req.body;
            var start_date, end_date;
            if (parseInt(time) < 10) {
                start_date = `${date} 0${time}:00:00`;
                end_date = `${date} 0${time}:59:59`;
            }
            else {
                start_date = `${date} ${time}:00:00`;
                end_date = `${date} ${time}:59:59`;
            }
            console.log({ start_date, end_date });
            try {
                var sql = `select s1.room_id,s1.room_name,l.*,b.building_name,b.address,(case when s2.room_id is null then '0' else '1' end) as status from 
                (select * from room_master r1 where r1.flag='1') s1 left join 
                (select * from room_master r where r.room_id not in (
                    select b.room_id from booking_master b where (start_date<='${start_date}' and end_date>='${start_date}') or (start_date<='${end_date}' and end_date>='${end_date}')
                    or ('${start_date}'<=start_date and '${end_date}'>=start_date) or ('${start_date}'<=end_date and '${end_date}'>=end_date) and (not (b.status_id='-1' or b.status_id='0')) and b.flag='1') 
                )   s2 on s1.room_id=s2.room_id
                inner join building_master b on b.building_id=s1.building_id
                inner join location l on l.admin_id=b.admin_id
                where not s1.status='cancel using' and (s1.building_id=$1 or $1='')`;
                console.log(sql);
                ;
                var rooms = yield this.getOfDB(sql, [building_id]);
                rooms = rooms.map((item) => {
                    return {
                        room_id: item.room_id,
                        room_number: item.room_name,
                        building_name: item.building_name,
                        address: item.address + ' ' + item.tambon_th + ' ' + item.amphur_th + ' ' + item.province_th,
                        status: item.status
                    };
                });
                console.table(rooms);
                return res.json({ code: 1, message: 'ok', data: rooms });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getQRCode = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { text_url } = process.env;
            try {
                var qrcode = yield qrcode_1.default.toDataURL(text_url + "");
                var qrArray = qrcode.split("base64,");
                qrcode = qrArray[1];
                return res.json({ code: 1, message: "ok", url: text_url, qrcode: qrcode });
            }
            catch (e) {
                return res.json({ code: -1, message: e.stack });
            }
        });
        this.checkActivityRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { time, date, room_id } = req.body;
            console.log(req.body);
            var start_date = "";
            var end_date = "";
            if (parseInt(time) < 10) {
                start_date = `${date} 0${time}:00:00`;
                end_date = `${date} 0${time}:59:59`;
            }
            else {
                start_date = `${date} ${time}:00:00`;
                end_date = `${date} ${time}:59:59`;
            }
            try {
                var activities = yield this.getOfDB(`select b.*,r.*,bm.address,bm.building_name,l.* from room_master r 
                    
                    
                    inner join building_master bm on bm.building_id=r.building_id
                    inner join location l on l.admin_id=bm.admin_id
                    left join (
                        select  u.first_name,u.last_name,bm.*,d.*,sd.* from booking_master bm
                        inner join user_master u on u.username=bm.username
                        inner join sub_department_master sd on sd.sub_department_id=u.sub_department_id
                        inner join department_master d on d.department_id=sd.department_id
                            where bm.room_id=$1 and (start_date<='${start_date}' and end_date>='${start_date}') or (start_date<='${end_date}' and end_date>='${end_date}')
                            or ('${start_date}'<=start_date and '${end_date}'>=start_date) or ('${start_date}'<=end_date and '${end_date}'>=end_date)
                        ) b on r.room_id=b.room_id
                    

                    where r.room_id=$1 order by b.start_date
                `, [room_id]);
                var response = {
                    code: 1, message: "ok",
                    data: activities.map((item) => {
                        var return_item = {};
                        return_item.booking_id = item.booking_id;
                        return_item.date = moment_1.default(item.start_date).format("DD/MM/YYYY");
                        return_item.time = moment_1.default(item.start_date).format("HH:mm") + " - " + moment_1.default(item.end_date).format("HH:mm");
                        return_item.name = item.first_name + " " + item.last_name;
                        return_item.room_id = item.room_id;
                        return_item.room_number = item.room_name;
                        return_item.num_chair = item.num_chair;
                        return_item.num_table = item.num_table;
                        return_item.building_name = item.building_name;
                        return_item.subject = item.booking_description;
                        return_item.department = item.sub_department_name_th;
                        return_item.officer = item.department_name_th;
                        return_item.address = item.address + " " + item.tambon_th + " " + item.amphur_th + " " + item.province_th;
                        return_item.remark = item.remark;
                        return_item.member = item.member;
                        return_item.tel = item.tel;
                        return_item.floor = item.floor;
                        return return_item;
                    })
                };
                console.log(response);
                return res.json(response);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.viewDetail = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { booking_id } = req.body;
            try {
                var sql = `select  u.first_name,u.last_name,b.*,d.*,sd.*,r.*,bm.address,bm.building_name,l.* from room_master r 
                    inner join building_master bm on bm.building_id=r.building_id
                    inner join location l on l.admin_id=bm.admin_id
                    inner join booking_master b on b.room_id=r.room_id
                    inner join user_master u on u.username=b.username
                    inner join sub_department_master sd on sd.sub_department_id=u.sub_department_id
                    inner join department_master d on d.department_id=sd.department_id
                    where b.booking_id=$1 order by b.start_date
                `;
                console.log(sql);
                var activities = yield this.getOfDB(sql, [booking_id]);
                var response = {
                    code: 1, message: "ok",
                    data: activities.map((item) => {
                        var return_item = {};
                        return_item.booking_id = item.booking_id;
                        return_item.date = moment_1.default(item.start_date).format("DD/MM/YYYY");
                        return_item.time = moment_1.default(item.start_date).format("HH:mm") + " - " + moment_1.default(item.end_date).format("HH:mm");
                        return_item.name = item.first_name + " " + item.last_name;
                        return_item.room_id = item.room_id;
                        return_item.room_number = item.room_name;
                        return_item.num_chair = item.num_chair;
                        return_item.num_table = item.num_table;
                        return_item.building_name = item.building_name;
                        return_item.subject = item.booking_description;
                        return_item.department = item.sub_department_name_th;
                        return_item.officer = item.department_name_th;
                        return_item.address = item.address + " " + item.tambon_th + " " + item.amphur_th + " " + item.province_th;
                        return_item.remark = item.remark;
                        return_item.member = item.member;
                        return_item.tel = item.tel;
                        return_item.floor = item.floor;
                        return return_item;
                    })
                };
                console.log(response);
                return res.json(response);
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = CheckRoom;
