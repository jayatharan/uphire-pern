import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, updateUser, getUserById } from "../services/user.service";
import BiographyService from "../services/biography.service";
import log from "../logger";
import { get } from "lodash";
import { BiographyDocument } from "../models/biography.model";

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
        const biography = await BiographyService.baseApi.find({userId:user.id},undefined, { association: 'address' })
        res.send({
            user:currentUser,
            biography
        })
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}