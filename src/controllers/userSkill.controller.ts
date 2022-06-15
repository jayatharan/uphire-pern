import { Request, Response } from "express";
import { UserSkillDocument } from "../models/userSkill.model";
import UserSkillService from "../services/userSkill.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllUserSkill(req: Request, res: Response) {
    try{
        let quarryParams = req.query as ListQueryParams;
        const data = await UserSkillService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createUserSkill(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as UserSkillDocument;
        const response = await UserSkillService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateUserSkill(req: Request, res: Response){
    try{
        const data = req.body as UserSkillDocument;
        const id = req.params.id as string;
        const response = await UserSkillService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteUserSkill(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await UserSkillService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getUserSkill(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await UserSkillService.baseApi.get(id,undefined, [{association:'user'}, {association:'skill'}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}