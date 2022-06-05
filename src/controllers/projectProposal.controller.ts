import { Request, Response } from "express";
import { ProjectProposalDocument } from "../models/projectProposal.model";
import ProjectProposalService from "../services/projectProposal.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllProjectProposal(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await ProjectProposalService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProjectProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as ProjectProposalDocument;
        data.userId = user.id;
        const response = await ProjectProposalService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateProjectProposal(req: Request, res: Response){
    try{
        const data = req.body as ProjectProposalDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await ProjectProposalService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProjectProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectProposalService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProjectProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectProposalService.baseApi.get(id, undefined, [{association:'user'}, {association:'project', include:'user'}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyProjectProposals(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await ProjectProposalService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id}, undefined, undefined, [{association:'project'}]);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}