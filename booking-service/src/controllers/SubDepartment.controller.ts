import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import moment from 'moment';

export default class SubDepartment extends Connection {

    /**
     * @Function getSubDepartment
     * @Body {department_id}
     * @Response {code:int,message:string,data:SubDepartment[]}
     */
    public getSubDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { department_id } = req.body;

        try {
            var subDepartments = await this.getOfDB(`select * from sub_department_master sd left join department_master d on sd.department_id=d.department_id
                 where sd.flag='1' and (sd.department_id=$1 or $1='')`, [department_id]);
            return res.json({ code: 1, message: 'ok', data: subDepartments });
        } catch (e) {
            return res.json(e);
        }
    }
    public addSubDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { sub_department_name_en, sub_department_name_th, department_id } = req.body;
        try {
            var sub_department_id = await this.getMaxID("sub_department_master", "sub_department_id", "S", 7, "");
            await this.execute(`insert into sub_department_master (sub_department_id,sub_department_name_en,sub_department_name_th,department_id,flag) values ($1,$2,$3,$4,'1')`, [sub_department_id, sub_department_name_en, sub_department_name_th, department_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public updateSubDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { sub_department_id, sub_department_name_en, sub_department_name_th, department_id } = req.body;
        try {

            await this.execute(`update sub_department_master set sub_department_name_en=$1,sub_department_name_th=$2,department_id=$3 where sub_department_id=$4`, [sub_department_name_en, sub_department_name_th, department_id, sub_department_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public deleteSubDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { sub_department_id } = req.body;
        console.log(sub_department_id);

        try {

            await this.execute(`update sub_department_master set flag='0' where sub_department_id=$1`, [sub_department_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
}