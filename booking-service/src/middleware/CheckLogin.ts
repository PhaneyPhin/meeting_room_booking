import Jwt from '../commons/Jwt';
import { Request, Response, NextFunction } from 'express';
export default class CheckLogin extends Jwt {
    /**
     * @Function Check
     * @Avoid to check accessable user login
     * @Visable for memeber,approver,admin
     */
    public Check = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.headers['x-access-token'] + "";
        try {
            const user: any = await this.getUser(token);
            const users: any = await this.getOfDB(`select * from user_master where username=$1 and flag='1' and (role='1' or role='2' or role='3')`, [user.user.username]);
            if (users.length > 0) {
                next();
            } else {
                res.send({ code: -1, message: "Invalid User Login" })
            }
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function CheckApprover
     * @Avoid to check acceable user login
     * @Visable for member and admin
     */
    public CheckApprover = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.headers['x-access-token'] + "";
        try {
            const user: any = await this.getUser(token);
            const users: any = await this.getOfDB(`select * from user_master where username=$1 and (role='1' or role='2')`, [user.user.username]);
            if (users.length > 0) {
                next();
            } else {
                res.send({ code: -1, message: "Invalid User Login" })
            }
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function CheckAdmin
     * @Avoid to check acceable user login
     * @Visable for admin
     */
    public CheckAdmin = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.headers['x-access-token'] + "";
        try {
            const user: any = await this.getUser(token);
            const users: any = await this.getOfDB(`select * from user_master where username=$1 and (role='1')`, [user.user.username]);
            if (users.length > 0) {
                next();
            } else {
                res.send({ code: -1, message: "Invalid User Login" })
            }
        } catch (e) {
            return res.json(e);
        }
    }
    public checkOnlyApprover = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.headers['x-access-token'] + "";
        try {
            const user: any = await this.getUser(token);
            const users: any = await this.getOfDB(`select * from user_master where username=$1 and (role='2')`, [user.user.username]);
            if (users.length > 0) {
                next();
            } else {
                res.send({ code: -1, message: "Invalid User Login" })
            }
        } catch (e) {
            return res.json(e);
        }
    }

}