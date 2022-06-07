import { Request, Response } from "express";
import { TeamDocument } from "../models/team.model";
import TeamService from "../services/team.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllTeam(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await TeamService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createTeam(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as TeamDocument;
        data.userId = user.id;
        const response = await TeamService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateTeam(req: Request, res: Response){
    try{
        const data = req.body as TeamDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await TeamService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteTeam(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await TeamService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getTeam(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await TeamService.baseApi.get(id, undefined, [{association:'user'}, {association:'TeamProposals'}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyTeams(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await TeamService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id});
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}