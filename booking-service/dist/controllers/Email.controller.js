"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer = tslib_1.__importStar(require("nodemailer"));
const handlebars = tslib_1.__importStar(require("handlebars"));
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
const moment = require("moment");
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
console.log({ EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD });
class Email extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.sendEmail = (email, subject, url, data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(__dirname, '../public/' + url);
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);
            const htmlToSend = template({ data });
            const transporter = nodemailer.createTransport({
                host: EMAIL_HOST,
                port: Number(EMAIL_PORT),
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASSWORD
                }
            });
            const mailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: subject,
                html: htmlToSend
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
        });
        this.sendBookingEmail = (booking_id, type) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var bookings = yield this.getOne(`select * from booking_master b inner join user_master u 
                on b.username=u.username inner join room_master r on r.room_id=b.room_id
                inner join building_master bm on r.building_id=bm.building_id
                inner join location l on bm.admin_id=l.admin_id
                where b.booking_id=$1`, [booking_id]);
            if (bookings != null) {
                var data = {
                    username: bookings.first_name + ' ' + bookings.last_name,
                    booking_id: bookings.booking_id,
                    address_en: bookings.address + ' ' + bookings.tambon_en + ' ' + bookings.amphur_en + ' ' + bookings.province_en,
                    address_th: bookings.address + ' ' + bookings.tambon_th + ' ' + bookings.amphur_th + ' ' + bookings.province_th,
                    building: bookings.building_name,
                    date: moment(bookings.start_date).format('DD/MM/YYYY'),
                    floor: bookings.floor,
                    message_en: type.message_en,
                    message_th: type.message_th,
                    room_name: bookings.room_name,
                    subject: bookings.booking_description,
                    time: moment(bookings.start_date).format("HH:mm:ss") + "-" + moment(bookings.end_date).format("HH:mm:ss")
                };
                this.sendEmail(bookings.email, type.subject, "email.html", data);
            }
        });
    }
}
exports.default = Email;
