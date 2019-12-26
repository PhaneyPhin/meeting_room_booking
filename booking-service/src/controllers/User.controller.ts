import Connection from '../connection/DBHelper';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
// var formidable = require('formidable');
export default class User extends Connection {
    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: any = await this.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id where flag='1'`, []);
            res.json({ code: 1, message: 'ok', data: users });
        } catch (e) {
            res.send(e);
        }
    }
    public addUser = async (req: Request, res: Response, next: NextFunction) => {
        var { username, password, first_name, last_name, email, role, img_profile } = req.body;
        try {
            await this.execute(`insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,$9,$10)`,
                [username, password, first_name, last_name, email, moment().format("YYYY-MM-DD HH:mm:ss"), null, role, '1', img_profile]);
            return res.json({ code: 1, message: "ok" });
        } catch (e) {
            return res.json(e);
        }

    }
    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        var { username, first_name, last_name, email, role, img_profile } = req.body;
        try {
            await this.execute(`update user_master set first_name=$1,last_name=$2,email=$3,role=$4,img_profile=$6 where username=$5`, [first_name, last_name, email, role, username, img_profile]);
            return res.json({ code: 1, message: 'ok' });
        } catch (e) {
            return res.json(e);
        }
    }
    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        var { username, old_password, password } = req.body;
        var users: any = await this.getOfDB(`select * from user_master where username=$1 and password=SHA1($2) and flag='1'`, [username, old_password]);
        if (users.length > 0) {
            try {
                await this.execute(`update user_master set password = SHA1($1) where username = $2`, [password, username]);
                return res.json({ code: 1, message: "ok" });
            } catch (e) {
                return res.json(e);
            }
        } else {
            return res.json({ code: -1, message: "Invalid old password" });
        }
    }
    public triggerChangePassword = async (req: Request, res: Response, next: NextFunction) => {
        var { username, password } = req.body;
        try {
            await this.execute(`update user_master set password=SHA1($1) where username=$2`, [password, username]);
            return res.json({ code: 1, message: 'ok' });
        } catch (e) {
            return res.json(e);
        }
    }
    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        var { username } = req.body;
        try {
            await this.execute(`update user_master set flag='0' where username=$1`, [username]);
            return res.json({ code: 1, message: 'ok' });
        } catch (e) {
            return res.json(e);
        }
    }
    public getRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var roles = await this.getOfDB(`select * from role_master`, []);
            return res.json({ code: 1, message: 'ok', data: roles })
        } catch (e) {
            return res.json(e);
        }
    }

}