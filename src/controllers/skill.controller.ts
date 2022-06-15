import { Request, Response } from "express";
import { SkillDocument } from "../models/skill.model";
import SkillService from "../services/skill.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllSkill(req: Request, res: Response) {
    try{
        let quarryParams = req.query as ListQueryParams;
        const data = await SkillService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createSkill(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as SkillDocument;
        const response = await SkillService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateSkill(req: Request, res: Response){
    try{
        const data = req.body as SkillDocument;
        const id = req.params.id as string;
        const response = await SkillService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteSkill(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await SkillService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getSkill(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await SkillService.baseApi.get(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}