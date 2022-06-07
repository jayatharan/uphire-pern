import { Request, Response } from "express";
import { JobProposalDocument } from "../models/jobProposal.model";
import JobProposalService from "../services/jobProposal.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllJobProposal(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await JobProposalService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createJobProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as JobProposalDocument;
        data.userId = user.id;
        const response = await JobProposalService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateJobProposal(req: Request, res: Response){
    try{
        const data = req.body as JobProposalDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await JobProposalService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteJobProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await JobProposalService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getJobProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await JobProposalService.baseApi.get(id, undefined, [{association:'user'}, {association:'job', include:[{association:'user'}, {association:'company', include:'address'}]}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyJobProposals(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await JobProposalService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id}, undefined, undefined, [{association:'job', include:'company'}]);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}