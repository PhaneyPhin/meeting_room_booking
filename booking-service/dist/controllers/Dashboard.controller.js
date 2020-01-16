"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Dashboard extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDashboard = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username } = req.body;
            try {
                var dashboards = yield this.getOfDB(`select s1.count as user_count,s2.count as room_count,
                s3.count as wait_for_approve,s4.count as approved,s5.count as all_booked,s6.count as your_wait_for_approve,s7.count as your_approved,s8.count as your_all_data from
                    (select count(*) from user_master u where u.flag='1') s1,
                    (select count(*) from room_master r where r.flag='1') s2,
                    (select count(*) from booking_master b1 where b1.flag='1' and b1.status_id='1') s3,
                    (select count(*) from booking_master b2 where b2.flag='1' and b2.status_id='2') s4,
                    (select count(*) from booking_master b3 where b3.flag='1') s5,
                    (select count(*) from booking_master b4 where b4.flag='1' and b4.status_id='1' and b4.username=$1) s6,
                    (select count(*) from booking_master b5 where b5.flag='1' and b5.status_id='2' and b5.username=$1) s7,
                    (select count(*) from booking_master b6 where b6.flag='1' and b6.username=$1) s8
                 `, [username]);
                res.send({ code: 1, message: 'ok', data: dashboards });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getSummaryDepartmentCost = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var { start_date, end_date } = req.body;
                var arr = [];
                var where = "";
                if (start_date != "" && end_date != "") {
                    arr = [start_date, end_date];
                    where = " and (b.start_date>=$1 and b.start_date<=$2)";
                }
                var summaryCosts = yield this.getOfDB(`
                    select dm.*,(case when total_price is null then 0 else total_price end) as total_price
                        from department_master dm Left JOIN
                        (select d.*,sum(m.material_price*bm.number) as total_price from department_master d INNER JOIN
                            sub_department_master  sd on d.department_id=sd.department_id
                            INNER JOIN user_master u on u.sub_department_id=sd.sub_department_id
                            INNER JOIN booking_master b on b.username=u.username
                            INNER JOIN booking_material bm on b.booking_id=bm.booking_id
                        INNER JOIN material_master m on m.material_id=bm.material_id
                        where (b.status_id='1' or b.status_id='2' or b.status_id='3') ${where}
                        group BY d.department_id) s
                        on s.department_id=dm.department_id

                `, arr);
                return res.json({ code: 1, message: 'ok', data: summaryCosts });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getSummarySubDepartmentCost = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var { start_date, end_date, department_id } = req.body;
                var arr = [];
                var where = "";
                if (start_date != "" && end_date != "") {
                    arr = [start_date + " 00:00:00", end_date + " 23:59:59"];
                    where = " and (b.start_date>=$2 and b.start_date<=$3)";
                }
                var summaryCosts = yield this.getOfDB(`
                    select sdm.*,(case when total_price is null then 0 else total_price end) as total_price
                        from sub_department_master sdm Left JOIN
                        (select sd.*,sum(m.material_price*bm.number) as total_price from sub_department_master sd 
                            INNER JOIN user_master u on u.sub_department_id=sd.sub_department_id
                            INNER JOIN booking_master b on b.username=u.username
                            INNER JOIN booking_material bm on b.booking_id=bm.booking_id
                        INNER JOIN material_master m on m.material_id=bm.material_id
                        where (b.status_id='1' or b.status_id='2' or b.status_id='3') ${where}
                        group BY sd.sub_department_id) s
                        on s.sub_department_id=sdm.sub_department_id where sdm.department_id=$1

                `, [department_id, ...arr]);
                return res.json({ code: 1, message: 'ok', data: summaryCosts });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getMaterialOfficerUsing = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { start_date, end_date, departmentView, department_id, sub_departmentView, sub_department_id, } = req.body;
            console.log(req.body);
            try {
                var arr = [];
                var where = "";
                var i = 0;
                if (start_date != "" && end_date != "") {
                    arr = [start_date + " 00:00:00", end_date + " 23:59:59"];
                    where = `and (b.start_date>=$${i + 1} and b.start_date<=$${i + 2}) `;
                    i = i + 2;
                }
                if (departmentView == 1) {
                    arr = [...arr, department_id];
                    where += `and (department_id=$${i + 1})`;
                    i++;
                }
                if (sub_departmentView == 1) {
                    arr = [...arr, sub_department_id];
                    where += `and (dm.sub_department_id=$${i + 1})`;
                    i++;
                }
                console.log(arr);
                const sql = `SELECT m.material_id,material_name,material_price,sum(bm.number) as material_number,sum(bm.number*m.material_price) as total_price from material_master m 
                INNER JOIN booking_material bm on bm.material_id=m.material_id
                INNER JOIN booking_master b on b.booking_id=bm.booking_id
                INNER JOIN user_master u on u.username=b.username
                INNER JOIN sub_department_master dm on dm.sub_department_id=u.sub_department_id
                where '1'='1' ${where}
                GROUP BY m.material_id ORDER BY m.material_id
            `;
                console.log(sql);
                var materials = yield this.getOfDB(sql, arr);
                return res.json({ code: 1, message: "ok", data: materials });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getBookingOfficerDetail = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { start_date, end_date, material_id, departmentView, department_id, sub_departmentView, sub_department_id } = req.body;
            try {
                var arr = [];
                var where = "";
                var i = 2;
                if (start_date != "" && end_date != "") {
                    arr = [start_date + " 00:00:00", end_date + " 23:59:59"];
                    where = ` and (b.start_date>=$${i} and b.start_date<=$${i + 1})`;
                    i = i + 2;
                }
                if (departmentView == 1) {
                    arr = [...arr, department_id];
                    where += `and d.department_id=$${i}`;
                    i++;
                }
                if (sub_departmentView == 1) {
                    arr = [...arr, sub_department_id];
                    where += `and sd.sub_department_id=$${i}`;
                    i++;
                }
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on sd.department_id=d.department_id
                inner join room_master r on r.room_id=b.room_id
                inner join booking_status bs on bs.status_id=b.status_id
                inner join booking_material bm on bm.booking_id=b.booking_id
            where b.flag='1' and bm.material_id=$1 ${where} order by b.start_date`, [material_id, ...arr]);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Dashboard;
