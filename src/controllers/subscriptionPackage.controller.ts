import { Request, Response } from "express";
import { SubscriptionPackageDocument } from "../models/subscriptionPackage.model";
import SubscriptionPackageService from "../services/subscriptionPackage.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllSubscriptionPackage(req: Request, res: Response) {
    try{
        let quarryParams = req.query as ListQueryParams;
        const data = await SubscriptionPackageService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createSubscriptionPackage(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as SubscriptionPackageDocument;
        const response = await SubscriptionPackageService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateSubscriptionPackage(req: Request, res: Response){
    try{
        const data = req.body as SubscriptionPackageDocument;
        const id = req.params.id as string;
        const response = await SubscriptionPackageService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteSubscriptionPackage(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await SubscriptionPackageService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getSubscriptionPackage(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await SubscriptionPackageService.baseApi.get(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}