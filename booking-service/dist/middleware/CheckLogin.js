"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Jwt_1 = tslib_1.__importDefault(require("../commons/Jwt"));
class CheckLogin extends Jwt_1.default {
    constructor() {
        super(...arguments);
        this.Check = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'] + "";
            try {
                const user = yield this.getUser(token);
                const users = yield this.getOfDB(`select * from user_master where username=$1 and flag='1' and (role='1' or role='2' or role='3')`, [user.user.username]);
                if (users.length > 0) {
                    next();
                }
                else {
                    res.send({ code: -1, message: "Invalid User Login" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.CheckApprover = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'] + "";
            try {
                const user = yield this.getUser(token);
                const users = yield this.getOfDB(`select * from user_master where username=$1 and (role='1' or role='2')`, [user.user.username]);
                if (users.length > 0) {
                    next();
                }
                else {
                    res.send({ code: -1, message: "Invalid User Login" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.CheckAdmin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'] + "";
            try {
                const user = yield this.getUser(token);
                const users = yield this.getOfDB(`select * from user_master where username=$1 and (role='1')`, [user.user.username]);
                if (users.length > 0) {
                    next();
                }
                else {
                    res.send({ code: -1, message: "Invalid User Login" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.checkOnlyApprover = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'] + "";
            try {
                const user = yield this.getUser(token);
                const users = yield this.getOfDB(`select * from user_master where username=$1 and (role='2')`, [user.user.username]);
                if (users.length > 0) {
                    next();
                }
                else {
                    res.send({ code: -1, message: "Invalid User Login" });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = CheckLogin;
