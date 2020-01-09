"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Email_controller_1 = tslib_1.__importDefault(require("./Email.controller"));
class Booking extends Email_controller_1.default {
    constructor() {
        super(...arguments);
        this.bookingRoom = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, room_id, start_date, end_date, booking_description, material_lists, important, member, remark, tel } = req.body;
            try {
                var booking_id = yield this.getMaxID("booking_master", "booking_id", "B", 7, "");
                var status = '1';
                var approvements = yield this.getOfDB(`select approvement from room_master where room_id=$1`, [room_id]);
                if (approvements.length > 0) {
                    if (!approvements[0].approvement) {
                        status = '2';
                    }
                }
                yield this.execute(`insert into booking_master values ($1,$2,$3,$4,$5,$6,$7,$8,'1',$9,$10,$11,$12)`, [booking_id, booking_description, username, room_id, start_date, end_date, status, moment_1.default().format("YYYY-MM-DD HH:mm:ss"), important, member, remark, tel]);
                material_lists.forEach((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var { Id, material_number } = item;
                    yield this.execute(`insert into booking_material values ($1,$2,$3,'1')`, [booking_id, Id, material_number]);
                }));
                if (status == '1') {
                    var type = {
                        message_en: "You booking saved",
                        message_th: "การจองของคุณถูกบันทึกเรียบร้อยแล้ว",
                        subject: "Your booking was saved"
                    };
                    this.sendBookingEmail(booking_id, type);
                }
                else {
                    var type = {
                        message_en: "You booking was approved",
                        message_th: "การจองของคุณถูกอนุมัติเรียบร้อยแล้ว",
                        subject: "Your booking was approved"
                    };
                    this.sendBookingEmail(booking_id, type);
                }
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getCurrentReservationTask = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { room_id } = req.body;
            console.log(req.body);
            const active_empty = { start_time: "__:__", end_time: "__:__", name: "Meeting Room", subject: "there is no meeting now" };
            const empty = { start_time: "", end_time: "", name: "", subject: "" };
            var current = Object.assign({}, empty);
            var first = Object.assign({}, empty);
            var second = Object.assign({}, empty);
            try {
                var currents = yield this.getOfDB(`select   u.first_name,u.last_name,b.start_date,b.end_date,b.booking_description from  booking_master b
                            left join user_master u on b.username=u.username
                            left join sub_department_master sd 
                            on u.sub_department_id=sd.sub_department_id
                            left join department_master d on
                            sd.department_id=d.department_id   inner join room_master r on r.room_id=b.room_id where status_id='2' and r.room_id=$1 and b.end_date>=$2 and b.end_date<=$3 and b.flag='1' order by b.start_date`, [room_id, moment_1.default().format("YYYY-MM-DD HH:mm:ss"), moment_1.default().format("YYYY-MM-DD") + " 23:59:59"]);
                console.log(currents);
                if (currents.length == 0) {
                }
                else {
                    if (moment_1.default().isAfter(moment_1.default(currents[0].start_date))) {
                        if (currents.length > 0) {
                            var { first_name, last_name, start_date, end_date, booking_description } = currents[0];
                            current.start_time = moment_1.default(start_date).format("HH:mm");
                            current.end_time = moment_1.default(end_date).format("HH:mm");
                            current.name = first_name + ' ' + last_name;
                            current.subject = booking_description;
                        }
                        if (currents.length > 1) {
                            var { first_name, last_name, start_date, end_date, booking_description } = currents[1];
                            first.start_time = moment_1.default(start_date).format("HH:mm");
                            first.end_time = moment_1.default(end_date).format("HH:mm");
                            first.name = first_name + ' ' + last_name;
                            first.subject = booking_description;
                        }
                        if (currents.length > 2) {
                            var { first_name, last_name, start_date, end_date, booking_description } = currents[2];
                            second.start_time = moment_1.default(start_date).format("HH:mm");
                            second.end_time = moment_1.default(end_date).format("HH:mm");
                            second.name = first_name + ' ' + last_name;
                            second.subject = booking_description;
                        }
                    }
                    else {
                        if (currents.length > 0) {
                            var { first_name, last_name, start_date, end_date, booking_description } = currents[0];
                            first.start_time = moment_1.default(start_date).format("HH:mm");
                            first.end_time = moment_1.default(end_date).format("HH:mm");
                            first.name = first_name + ' ' + last_name;
                            first.subject = booking_description;
                        }
                        if (currents.length > 1) {
                            var { first_name, last_name, start_date, end_date, booking_description } = currents[1];
                            second.start_time = moment_1.default(start_date).format("HH:mm");
                            second.end_time = moment_1.default(end_date).format("HH:mm");
                            second.name = first_name + ' ' + last_name;
                            second.subject = booking_description;
                        }
                    }
                }
                console.log({ code: 1, message: "ok", current, first, second });
                return res.json({ code: 1, message: "ok", current, first, second });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getCurrentTask = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { room_id } = req.body;
            var empty = { name: "Room is Avaialble Now", time: "", booking_id: "" };
            var next_empty = { name: "No next reservation today", time: "", booking_id: "" };
            var current = Object.assign({}, empty);
            var next = Object.assign({}, next_empty);
            try {
                var currents = yield this.getOfDB(`select   u.first_name,u.last_name,b.start_date,b.end_date,b.booking_description,b.booking_id from booking_master b left join user_master u on b.username=u.username 
                    left join sub_department_master sd 
                    on u.sub_department_id=sd.sub_department_id
                    left join department_master d on
                    sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='2' and r.room_id=$1 and b.start_date<CURRENT_TIMESTAMP and b.end_date>CURRENT_TIMESTAMP and b.flag='1'`, [room_id]);
                var end_date;
                if (currents.length > 0) {
                    end_date = moment_1.default(currents[0].end_date).format("YYYY-MM-DD HH:mm:ss");
                }
                else {
                    end_date = moment_1.default().format("YYYY-MM-DD HH:mm:ss");
                }
                var nexts = yield this.getOfDB(`select   u.first_name,u.last_name,b.start_date,b.end_date,b.booking_description,b.booking_id from booking_master b left join user_master u on b.username=u.username  
                    left join sub_department_master sd 
                    on u.sub_department_id=sd.sub_department_id
                    left join department_master d on
                    sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='2' and r.room_id=$1 and b.start_date>=$2 and b.end_date<=$3 order by b.start_date`, [room_id, end_date, moment_1.default().format("YYYY-MM-DD") + " 23:59:59"]);
                if (currents.length > 0) {
                    current.name = currents[0].first_name + " " + currents[0].last_name + " - " + currents[0].booking_description;
                    current.time = moment_1.default(currents[0].start_date).format("HH:mm") + " - " + moment_1.default(currents[0].end_date).format("HH:mm");
                    current.booking_id = currents[0].booking_id;
                }
                if (nexts.length > 0) {
                    next.name = nexts[0].first_name + " " + nexts[0].last_name + " - " + nexts[0].booking_description;
                    next.time = moment_1.default(nexts[0].start_date).format("HH:mm") + " - " + moment_1.default(nexts[0].end_date).format("HH:mm");
                    next.booking_id = nexts[0].booking_id;
                }
                return res.json({ code: 1, message: "ok", current, next });
            }
            catch (e) {
                console.log(e);
                return res.json(e);
            }
        });
        this.getBooking = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='1' and b.flag='1'`, []);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getBooked = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='2' and b.flag='1'`, []);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getRejected = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='0' and b.flag='1'`, []);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getBookingHistory = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { start_date, end_date } = req.body;
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id inner join booking_status bs on bs.status_id=b.status_id where b.flag='1' and b.start_date>='${start_date}' and end_date<='${end_date}' order by b.start_date`, []);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserBooking = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username } = req.body;
            try {
                var books = yield this.getOfDB(`select * from booking_master b
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='1' and b.flag='1' and u.username=$1`, [username]);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserBooked = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username } = req.body;
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='2' and b.flag='1' and u.username=$1`, [username]);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserRejected = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username } = req.body;
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id where status_id='0' and b.flag='1' and u.username=$1`, [username]);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserBookingHistory = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { start_date, end_date, username } = req.body;
            try {
                var books = yield this.getOfDB(`select * from booking_master b 
                inner join user_master u on u.username=b.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  inner join room_master r on r.room_id=b.room_id inner join booking_status bs on bs.status_id=b.status_id where b.flag='1' and b.start_date>='${start_date}' and end_date<='${end_date}' and u.username=$1 order by b.start_date`, [username]);
                return res.json({ code: 1, message: 'ok', data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.approve = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { booking_id } = req.body;
            try {
                yield this.execute(`update booking_master set status_id='2' where booking_id=$1`, [booking_id]);
                var type = {
                    message_en: "You booking was approved",
                    message_th: "การจองของคุณถูกอนุมัติเรียบร้อยแล้ว",
                    subject: "Your booking was approved"
                };
                this.sendBookingEmail(booking_id, type);
                res.send({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.reject = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { booking_id } = req.body;
            try {
                yield this.execute(`update booking_master set status_id='0' where booking_id=$1`, [booking_id]);
                var type = {
                    message_en: "You booking was rejected",
                    message_th: "การจองของคุณถูกปฏิเสธแล้ว",
                    subject: "Your booking was rejected"
                };
                this.sendBookingEmail(booking_id, type);
                res.send({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteBooking = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { booking_id } = req.body;
            try {
                yield this.execute(`update booking_master set flag = '0' where booking_id = $1`, [booking_id]);
                var type = {
                    message_en: "You booking was deleted",
                    message_th: "การจองของคุณถูกลบออกจากฐานข้อมูลแล้ว",
                    subject: "Your booking was deleted"
                };
                this.sendBookingEmail(booking_id, type);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getBookedMaterial = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { booking_id } = req.body;
            try {
                var books = yield this.getOfDB(`select *,number*material_price as total_price from booking_material b inner join  material_master m on m.material_id=b.material_id where b.booking_id=$1`, [booking_id]);
                res.send({ code: 1, message: "ok", data: books });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getRoomBooking = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { room_id } = req.body;
            try {
                var books = yield this.getOfDB(`select b.booking_description as subject,b.start_date,b.end_date,u.first_name,u.last_name from booking_master b 
                left join user_master u on b.username=u.username
                left join sub_department_master sd 
                on u.sub_department_id=sd.sub_department_id
                left join department_master d on
                sd.department_id=d.department_id  where room_id=$1 and (not (status_id='0' or status_id='-1')) and b.flag='1'`, [room_id]);
                console.log(books);
                res.send({
                    code: 1, message: "ok", data: books.map((item) => {
                        item.start_date = moment_1.default(item.start_date).format('YYYY-MM-DD HH:mm:ss');
                        item.end_date = moment_1.default(item.end_date).format('YYYY-MM-DD HH:mm:ss');
                        return item;
                    })
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Booking;
