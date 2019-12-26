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
                const users = yield this.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id where flag='1'`, []);
                res.json({ code: 1, message: 'ok', data: users });
            }
            catch (e) {
                res.send(e);
            }
        });
        this.addUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, password, first_name, last_name, email, role, img_profile } = req.body;
            try {
                yield this.execute(`insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,$9,$10)`, [username, password, first_name, last_name, email, moment_1.default().format("YYYY-MM-DD HH:mm:ss"), null, role, '1', img_profile]);
                return res.json({ code: 1, message: "ok" });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, first_name, last_name, email, role, img_profile } = req.body;
            try {
                yield this.execute(`update user_master set first_name=$1,last_name=$2,email=$3,role=$4,img_profile=$6 where username=$5`, [first_name, last_name, email, role, username, img_profile]);
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
    }
}
exports.default = User;
