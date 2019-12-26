"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Jwt_1 = tslib_1.__importDefault(require("../commons/Jwt"));
const moment_1 = tslib_1.__importDefault(require("moment"));
class Auth extends Jwt_1.default {
    constructor() {
        super(...arguments);
        this.Login = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { username, password } = req.body;
            if (username == undefined || password == undefined) {
                return res.json({ code: -1, message: "Please check parameter" });
            }
            else {
                try {
                    var users = yield this.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id  where username=$1 and password=SHA1($2) and flag='1'`, [username, password]);
                    if (users.length > 0) {
                        var { username, role_id, first_name, last_name, role_id, role_name, email, img_profile } = users[0];
                        var user = { username, role_id, first_name, last_name, role_name, email };
                        var token = this.getToken(user);
                        var update = yield this.execute(`update user_master set last_login=$1 where username=$2`, [moment_1.default().format("YYYY-MM-DD HH:mm:ss"), user.username]);
                        return res.json({ code: 1, message: 'ok', token: token, img_profile });
                    }
                    else {
                        return res.send({ code: -1, message: "Invalid username or password" });
                    }
                }
                catch (e) {
                    return res.json(e);
                }
            }
        });
    }
}
exports.default = Auth;
