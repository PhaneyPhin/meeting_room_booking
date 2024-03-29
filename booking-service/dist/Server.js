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
app.use(body_parser_1.default.json({
    limit: '50mb'
}));
app.use(body_parser_1.default.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
const viewsDir = path_1.default.join(__dirname, 'public');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: viewsDir });
});
exports.default = app;
