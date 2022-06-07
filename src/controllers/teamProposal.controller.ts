import { Request, Response } from "express";
import { TeamProposalDocument } from "../models/teamProposal.model";
import TeamProposalService from "../services/teamProposal.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllTeamProposal(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await TeamProposalService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createTeamProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as TeamProposalDocument;
        data.userId = user.id;
        const response = await TeamProposalService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateTeamProposal(req: Request, res: Response){
    try{
        const data = req.body as TeamProposalDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await TeamProposalService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteTeamProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await TeamProposalService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getTeamProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await TeamProposalService.baseApi.get(id, undefined, [{association:'user'}, {association:'Team', include:'user'}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyTeamProposals(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await TeamProposalService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id}, undefined, undefined, [{association:'Team'}]);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}