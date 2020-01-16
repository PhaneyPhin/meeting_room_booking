"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
const moment_1 = tslib_1.__importDefault(require("moment"));
class User extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getOfDB(`select u.*,r.*,d.department_id as officer,sd.sub_department_id as department from user_master u 
                inner join role_master r on u.role=r.role_id
                left join sub_department_master sd on sd.sub_department_id=u.sub_department_id
                left join department_master d on d.department_id=sd.department_id
                where u.flag='1'`, []);
                res.json({ code: 1, message: 'ok', data: users });
            }
            catch (e) {
                res.send(e);
            }
        });
        this.addUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, password, first_name, last_name, email, role, img_profile, department } = req.body;
            try {
                yield this.execute(`insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [username, password, first_name, last_name, email, moment_1.default().format("YYYY-MM-DD HH:mm:ss"), null, role, '1', img_profile, department]);
                return res.json({ code: 1, message: "ok" });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, first_name, last_name, email, role, img_profile, department } = req.body;
            try {
                yield this.execute(`update user_master set first_name=$1,last_name=$2,email=$3,role=$4,img_profile=$6,sub_department_id=$7 where username=$5`, [first_name, last_name, email, role, username, img_profile, department]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.changePassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, old_password, password } = req.body;
            var users = yield this.getOfDB(`select * from user_master where username=$1 and password=SHA1($2) and flag='1'`, [username, old_password]);
            if (users.length > 0) {
                try {
                    yield this.execute(`update user_master set password = SHA1($1) where username = $2`, [password, username]);
                    return res.json({ code: 1, message: "ok" });
                }
                catch (e) {
                    return res.json(e);
                }
            }
            else {
                return res.json({ code: -1, message: "Invalid old password" });
            }
        });
        this.triggerChangePassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, password } = req.body;
            try {
                yield this.execute(`update user_master set password=SHA1($1) where username=$2`, [password, username]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username } = req.body;
            try {
                yield this.execute(`update user_master set flag='0' where username=$1`, [username]);
                return res.json({ code: 1, message: 'ok' });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getRole = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var roles = yield this.getOfDB(`select * from role_master`, []);
                return res.json({ code: 1, message: 'ok', data: roles });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserInformation = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            try {
                var users = yield this.getOfDB(`SELECT first_name,last_name,email,img_profile FROM user_master where username=$1`, [username]);
                if (users.length > 0) {
                    return res.json({ code: 1, message: "ok", user: users[0] });
                }
                else {
                    return res.json({ code: -1, message: "invalid user" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.saveUserInformation = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, first_name, last_name, email, img_profile } = req.body;
            try {
                yield this.execute(`update user_master set first_name=$1,last_name=$2,email=$3 where username=$4`, [first_name, last_name, email, username]);
                return res.json({ code: 1, message: "ok" });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateOwnPassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { new_password, password, username } = req.body;
            console.log({ new_password, password, username });
            try {
                const uesrs = yield this.getOfDB(`select * from user_master where username=$1 and password=SHA1($2)`, [username, password]);
                if (uesrs.length > 0) {
                    yield this.execute(`update user_master set password=SHA1($1) where username=$2 and password=SHA1($3)`, [new_password, username, password]);
                    return res.json({ code: 1, message: "ok" });
                }
                else {
                    return res.json({ code: -1, message: "invalid old password" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = User;
