import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, updateUser, getUserById } from "../services/user.service";
import BiographyService from "../services/biography.service";
import log from "../logger";
import { get } from "lodash";
import { BiographyDocument } from "../models/biography.model";
import SubscriptionService  from "../services/subscription.service";
import { SubscriptionDocument } from "../models/subscription.model";

export async function createUserHandler(req: Request, res: Response) {
    try{
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    }catch (e) {
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function updateUserHandler(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const updatedUser = await updateUser(user.id, req.body);
        return res.send(omit(updatedUser.toJSON(), "password"))
    } catch (e){
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function updateUserBiography(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const data = req.body as BiographyDocument;
        data.userId = user.id;
        let biography = await BiographyService.updateBiography(data);
        res.send(biography);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function getUserDetails(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const currentUser = await getUserById(user.id);
        const biography = await BiographyService.baseApi.find({userId:user.id},undefined, [{association:'address'}, {association:'company', include:'address'}])
        res.send({
            user:currentUser,
            biography
        })
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function subscribeService(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as SubscriptionDocument;
        data.userId = user.id;
        const subscription = await SubscriptionService.subscribeService(data);
        return res.send(subscription);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function unSubscribe(req: Request, res: Response) {
    try{
        const service = req.params.service as unknown as string;
        const user = get(req, "user");
        const result = await SubscriptionService.unSubscribe(user.id, service);
        return res.send(result);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMySubscriptions(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const subscriptions = await SubscriptionService.getUserSubscriptions(user.id);
        return res.send(subscriptions);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}