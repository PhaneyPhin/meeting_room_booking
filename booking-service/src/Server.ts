import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';
import Connection from './connection/DBHelper';
import cors from 'cors';
import bodyParser from 'body-parser';
// var connection = new Connection();
// connection.getOfDB('m0001_fee', `select * from customer1`, []);
// import { applyMiddleware } from "./utils";
// import middleware from "./middleware";
// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', BaseRouter);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get("/email", (req: Request, res: Response) => {
    var data = {
        username: "Phaney Phin",
        message_en: "Your booking was approved",
        booking_id: "B0001",
        room_name: "203",
        floor: "2",
        building: "อาคาร A",
        address_en: "อาคาร A รามคำแหง",
        address_th: "อาคาร A รามคำแหง",
        subject: "ประชุม",
        date: "26/06/2019",
        time: "17:00:00-17:30:00"
    }

    res.render('email', { data })
})
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: viewsDir });
});

// Export express instance
export default app;
