import { Request, Response } from "express";
import { ListQueryParams } from "../services/baseCRUD.service";
import log from "../logger";
import { universalFetch } from "../services/universalFetch.service";

export async function fetchAll(req: Request, res: Response) {
    try{
        const entity = req.params.entity as string;
        const listQueryParams = req.body as ListQueryParams;
        const response = await universalFetch(entity, listQueryParams);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}