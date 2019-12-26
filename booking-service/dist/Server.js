"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
app.get("/email", (req, res) => {
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
    };
    res.render('email', { data });
});
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: viewsDir });
});
exports.default = app;
