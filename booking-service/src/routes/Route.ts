import { RequestParamHandler } from "express";

export default interface Route {
    url: string,
    middleware?: RequestParamHandler,
    action: RequestParamHandler
}
