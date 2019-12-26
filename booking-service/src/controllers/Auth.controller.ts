import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import Jwt from '../commons/Jwt';
import moment from 'moment';

export default class Auth extends Jwt {
    /**
     * @Function Login 
     * @Body {username,password}
     * @Response {code,message,token}
     */
    public Login = async (req: Request, res: Response, next: NextFunction) => {
        var { username, password } = req.body;
        if (username == undefined || password == undefined) {
            return res.json({ code: -1, message: "Please check parameter" })
        } else {
            try {
                var users: any = await this.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id  where username=$1 and password=SHA1($2) and flag='1'`, [username, password]);
                if (users.length > 0) {
                    var { username, role_id, first_name, last_name, role_id, role_name, email, img_profile } = users[0];
                    var user = { username, role_id, first_name, last_name, role_name, email }
                    var token = this.getToken(user);

                    var update = await this.execute(`update user_master set last_login=$1 where username=$2`, [moment().format("YYYY-MM-DD HH:mm:ss"), user.username]);
                    return res.json({ code: 1, message: 'ok', token: token, img_profile });
                } else {
                    return res.send({ code: -1, message: "Invalid username or password" })
                }
            } catch (e) {
                return res.json(e)
            }

        }
    }
}