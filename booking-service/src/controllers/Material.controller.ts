import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import moment from 'moment';

export default class Material extends Connection {
    /**
     * Function Login @param {username,password}
     */
    public getMaterial = async (req: Request, res: Response, next: NextFunction) => {

        try {
            var materials = await this.getOfDB(`select * from material_master where flag='1'`, []);
            return res.json({ code: 1, message: 'ok', data: materials });
        } catch (e) {
            return res.json(e);
        }
    }
    public addMaterial = async (req: Request, res: Response, next: NextFunction) => {
        const { material_name, material_price } = req.body;
        try {
            var material_id = await this.getMaxID("material_master", "material_id", "M", 8, "");
            await this.execute(`insert into material_master values ($1,$2,$3,'1')`, [material_id, material_name, material_price]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public updateMaterial = async (req: Request, res: Response, next: NextFunction) => {
        const { material_id, material_name, material_price } = req.body;

        try {

            await this.execute(`update material_master set material_name=$2,material_price=$3 where material_id=$1`, [material_id, material_name, material_price]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
    public deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
        const { material_id } = req.body;

        try {

            await this.execute(`update material_master set flag='0' where material_id=$1`, [material_id]);
            return res.json({ code: 1, message: 'ok' })
        } catch (e) {
            return res.json(e);
        }
    }
}