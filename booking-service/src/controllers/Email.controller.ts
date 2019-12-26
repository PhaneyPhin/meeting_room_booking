import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import Connection from '../connection/DBHelper';
import DataInterface from '../commons/DataInterface';
import moment = require('moment');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
console.log({ EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD });


export default class Email extends Connection {
    public sendEmail = async (email: string, subject: string, url: string, data: DataInterface) => {
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
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");

    }
    public sendBookingEmail = async (booking_id: string, type: any) => {
        var bookings: any = await this.getOne(`select * from booking_master b inner join user_master u 
                on b.username=u.username inner join room_master r on r.room_id=b.room_id
                inner join building_master bm on r.building_id=bm.building_id
                inner join location l on bm.admin_id=l.admin_id
                where b.booking_id=$1`, [booking_id]);
        // console.log(bookings)
        if (bookings != null) {
            var data: DataInterface = {
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
            }
            // console.log(data);
            this.sendEmail(bookings.email, type.subject, "email.html", data);
        }
    }
}