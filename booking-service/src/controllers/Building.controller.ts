import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import Jwt from '../commons/Jwt';
import moment from 'moment';

export default class Building extends Connection {

    /**
     * @Function AddBuilding 
     * @body {building_name, admin_id, num_floor,address}
     * @Response {code,message}
     */

    public addBuilding = async (req: Request, res: Response, next: NextFunction) => {
        var { building_name, admin_id, num_floor, address } = req.body;
        try {
            var building_id = await this.getMaxID("building_master", "building_id", "B", 7, "");
            await this.execute(`insert into building_master values ($1,$2,$3,$4,$5,$6)`, [building_id, building_name, admin_id, num_floor, 1, address]);
            return res.json({ code: 1, message: 'ok' });
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function getBuilding
     * @Response {code,message,data:}
     */
    public getBuilding = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var buildings = await this.getOfDB(`select * from building_master b left join location l on b.admin_id=l.admin_id where flag='1'`, []);
            return res.json({ code: 1, message: 'ok', data: buildings });
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function updateBuilding
     * @Body  { building_id, building_name, admin_id, num_floor,address }
     * @Response {code,message}
     */
    public updateBuilding = async (req: Request, res: Response, next: NextFunction) => {
        var { building_id, building_name, admin_id, num_floor, address } = req.body;
        try {
            await this.execute(`update building_master set building_name=$1,admin_id=$2,num_floor=$3,address=$4 where building_id=$5`, [building_name, admin_id, num_floor, address, building_id]);
            return res.json({ code: 1, message: "ok" });
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function deleteBuilding
     * @Body {building_id}
     * @Response {code,message}
     */
    public deleteBuilding = async (req: Request, res: Response, next: NextFunction) => {
        var { building_id } = req.body;
        try {
            await this.execute(`update building_master set flag='0' where building_id=$1`, [building_id]);
            return res.json({ code: 1, message: 'ok' });
        } catch (e) {
            return res.json(e);
        }
    }
    /**
     * @Function getLocation
     * @Body {province, amphur, tambon, postcode}
     * @Resonse {code,message,data}
     */
    public getLocation = async (req: Request, res: Response, next: NextFunction) => {
        var {
            province, amphur, tambon, postcode
        } = req.body;
        var field = "";
        var count = 0;
        if (province != "") {
            field += ",province_en,province_th";
            count++;
        }
        if (amphur != "") {

            field += ",amphur_en,amphur_th";
            count++;
        }
        if (tambon != "") {
            field += ",tambon_en,tambon_th";
            count++;
        }
        if (postcode != "") {
            field += ",postcode";
            count++;
        }
        field = field.substr(1);
        if (count == 4) {
            field = "*";
        }
        if (field == "") {
            field = "*";
        }
        try {
            var sql = `select distinct ${field} from location where ((province_th = '${province}' or '${province}' = 'all' or '${province}' = '')
                and (amphur_th = '${amphur}' or '${amphur}' = 'all' or '${amphur}' = '') and(tambon_th = '${tambon}' or '${tambon}' = 'all' or '${tambon}' = '')
                and (postcode = '${postcode}' or '${postcode}' = 'all' or '${postcode}' = '')) or ((province_en = '${province}' or '${province}' = 'all' or '${province}' = '')
                and (amphur_en = '${amphur}' or '${amphur}' = 'all' or '${amphur}' = '') and(tambon_en = '${tambon}' or '${tambon}' = 'all' or '${tambon}' = '') and(postcode = '${postcode}' or '${postcode}' = 'all' or '${postcode}' = ''))`
            console.log(sql);
            var locations = await this.getOfDB(sql, []);

            return res.json({ code: 1, message: 'ok', data: locations });

        } catch (e) {
            return res.json(e);
        }
    }
}