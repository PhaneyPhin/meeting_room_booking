import Connection from '../connection/DBHelper';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
// var formidable = require('formidable');
export default class User extends Connection {
    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: any = await this.getOfDB(`select u.*,r.*,d.department_id as officer,sd.sub_department_id as department from user_master u 
                inner join role_master r on u.role=r.role_id
                left join sub_department_master sd on sd.sub_department_id=u.sub_department_id
                left join department_master d on d.department_id=sd.department_id
                where u.flag='1'`, []);
            res.json({ code: 1, message: 'ok', data: users });
        } catch (e) {
            res.send(e);
        }
    }
    public addUser = async (req: Request, res: Response, next: NextFunction) => {
        var { username, password, first_name, last_name, email, role, img_profile, department } = req.body;
        try {
            await this.execute(`insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
                [username, password, first_name, last_name, email, moment().format("YYYY-MM-DD HH:mm:ss"), null, role, '1', img_profile, department]);
            return res.json({ code: 1, message: "ok" });
        } catch (e) {
            return res.json(e);
        }

    }
    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        var { username, first_name, last_name, email, role, img_profile, department } = req.body;
        try {
            await this.execute(`update user_master set first_name=$1,last_name=$2,email=$3,role=$4,img_profile=$6,sub_department_id=$7 where username=$5`, [first_name, last_name, email, role, username, img_profile, department]);
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

    public getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body;
        try {
            var users: any = await this.getOfDB(`SELECT first_name,last_name,email,img_profile FROM user_master where username=$1`, [username]);
            if (users.length > 0) {
                return res.json({ code: 1, message: "ok", user: users[0] })
            } else {
                return res.json({ code: -1, message: "invalid user" });
            }
        } catch (e) {
            return res.json(e);
        }
    }
    public saveUserInformation = async (req: Request, res: Response, next: NextFunction) => {
        const { username, first_name, last_name, email, img_profile } = req.body;

        try {
            await this.execute(`update user_master set first_name=$1,last_name=$2,email=$3 where username=$4`, [first_name, last_name, email, username]);
            return res.json({ code: 1, message: "ok" });
        } catch (e) {
            return res.json(e)
        }
    }
    public updateOwnPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { new_password, password, username } = req.body;
        console.log({ new_password, password, username });

        try {
            const uesrs: any = await this.getOfDB(`select * from user_master where username=$1 and password=SHA1($2)`, [username, password]);
            if (uesrs.length > 0) {
                await this.execute(`update user_master set password=SHA1($1) where username=$2 and password=SHA1($3)`, [new_password, username, password]);
                return res.json({ code: 1, message: "ok" });
            } else {
                return res.json({ code: -1, message: "invalid old password" })
            }

        } catch (e) {
            return res.json(e);
        }
    }
}