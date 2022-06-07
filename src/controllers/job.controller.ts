import { Request, Response } from "express";
import { JobDocument } from "../models/job.model";
import JobService from "../services/job.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllJob(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await JobService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createJob(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as JobDocument;
        data.userId = user.id;
        const response = await JobService.createOrUpdateJob(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateJob(req: Request, res: Response){
    try{
        const data = req.body as JobDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await JobService.createOrUpdateJob(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteJob(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await JobService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getJob(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await JobService.baseApi.get(id, undefined, [{association:'user'}, {association:'jobProposals'}, {association:'company', include:'address'}]);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyJobs(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await JobService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id});
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}