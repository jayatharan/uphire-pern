import { BiographyDocument } from "../models/biography.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Biography = db.Biography;

class BiographyService {
    baseApi = new baseCRUDApi<BiographyDocument>(Biography);

    public async updateBiography(data:BiographyDocument){
        let biography = await Biography.findOne({
            where:{
                userId:data.userId
            }
        })
        if(biography){
            console.log(data);
            biography = await this.baseApi.update(biography.id, data);
        }else{
            biography = await this.baseApi.create(data);
        }
        return biography;
    }
}

const instance = new BiographyService();

export default instance;