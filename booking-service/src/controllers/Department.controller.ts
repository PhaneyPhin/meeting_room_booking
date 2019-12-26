import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import moment from 'moment';

export default class Department extends Connection {
    /**
     * Function Login @param {username,password}
     */
    public getDepartment = async (req: Request, res: Response, next: NextFunction) => {

        try {
            var departments = await this.getOfDB(`select * from department_master where flag='1' order by department_id`, []);
            return res.json({ code: 1, message: 'ok', data: departments });
        } catch (e) {
            return res.json(e);
        }
    }
    public addDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { department_name_en, department_name_th } = req.body;
        try {
            var department_id = await this.getMaxID("department_master", "department_id", "D", 7, "");

            await this.execute(`insert into department_master (department_id,department_name_en,department_name_th,flag) values ($1,$2,$3,'1')`, [department_id, department_name_en, department_name_th]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { department_id, department_name_en, department_name_th } = req.body;

        try {

            await this.execute(`update department_master set department_name_en=$1,department_name_th=$2 where department_id=$3`, [department_name_en, department_name_th, department_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const { department_id } = req.body;

        try {

            await this.execute(`update department_master set flag='0' where department_id=$1`, [department_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
}