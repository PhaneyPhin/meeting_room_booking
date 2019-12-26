import Connection from '../connection/DBHelper';
import { Request, NextFunction, Response } from 'express';
import moment from 'moment';

export default class Dashboard extends Connection {
    /**
     * Function Login @param {username,password}
     */
    public getDashboard = async (req: Request, res: Response, next: NextFunction) => {
        var { username } = req.body;
        try {
            var dashboards = await this.getOfDB(`select s1.count as user_count,s2.count as room_count,
                s3.count as wait_for_approve,s4.count as approved,s5.count as all_booked,s6.count as your_wait_for_approve,s7.count as your_approved,s8.count as your_all_data from
                    (select count(*) from user_master u where u.flag='1') s1,
                    (select count(*) from room_master r where r.flag='1') s2,
                    (select count(*) from booking_master b1 where b1.flag='1' and b1.status_id='1') s3,
                    (select count(*) from booking_master b2 where b2.flag='1' and b2.status_id='2') s4,
                    (select count(*) from booking_master b3 where b3.flag='1') s5,
                    (select count(*) from booking_master b4 where b4.flag='1' and b4.status_id='1' and b4.username=$1) s6,
                    (select count(*) from booking_master b5 where b5.flag='1' and b5.status_id='2' and b5.username=$1) s7,
                    (select count(*) from booking_master b6 where b6.flag='1' and b6.username=$1) s8
                 `, [username]);
            res.send({ code: 1, message: 'ok', data: dashboards });

        } catch (e) {
            return res.json(e);
        }
    }
    public getSummaryDepartmentCost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var { start_date, end_date } = req.body;
            var arr: any = [];
            var where = "";
            if (start_date != "" && end_date != "") {
                arr = [start_date, end_date];
                where = " and (b.start_date>=$1 and b.start_date<=$2)";
            }
            var summaryCosts = await this.getOfDB(`
                    select dm.*,(case when total_price is null then 0 else total_price end) as total_price
                        from department_master dm Left JOIN
                        (select d.*,sum(m.material_price*bm.number) as total_price from department_master d inner JOIN
                            sub_department_master  sd on d.department_id=sd.department_id
                            inner JOIN booking_master b on b.sub_department_id=sd.sub_department_id
                            inner join booking_material bm on b.booking_id=bm.booking_id
                        inner join material_master m on m.material_id=bm.material_id
                        where (b.status_id='1' or b.status_id='2' or b.status_id='3') ${where}
                        group BY d.department_id) s
                        on s.department_id=dm.department_id

                `, arr);
            return res.json({ code: 1, message: 'ok', data: summaryCosts })
        } catch (e) {
            return res.json(e);
        }
    }
    public getSummarySubDepartmentCost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var { start_date, end_date, department_id } = req.body;
            var arr: any = [];
            var where = "";
            if (start_date != "" && end_date != "") {
                arr = [start_date + " 00:00:00", end_date + " 23:59:59"];
                where = " and (b.start_date>=$2 and b.start_date<=$3)";
            }
            var summaryCosts = await this.getOfDB(`
                    select sdm.*,(case when total_price is null then 0 else total_price end) as total_price
                        from sub_department_master sdm Left JOIN
                        (select sd.*,sum(m.material_price*bm.number) as total_price from sub_department_master sd 
                            inner JOIN booking_master b on b.sub_department_id=sd.sub_department_id
                            inner join booking_material bm on b.booking_id=bm.booking_id
                        inner join material_master m on m.material_id=bm.material_id
                        where (b.status_id='1' or b.status_id='2' or b.status_id='3') ${where}
                        group BY sd.sub_department_id) s
                        on s.sub_department_id=sdm.sub_department_id where sdm.department_id=$1

                `, [department_id, ...arr]);
            return res.json({ code: 1, message: 'ok', data: summaryCosts })
        } catch (e) {
            return res.json(e);
        }
    }
}