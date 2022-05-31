import { BiographyDocument } from "../models/biography.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import AddressService from "./address.service";
import CompanyService from "./company.service";

const Biography = db.Biography;

class BiographyService {
    baseApi = new baseCRUDApi<BiographyDocument>(Biography);

    public async updateBiography(data:BiographyDocument){
        let biography = await Biography.findOne({
            where:{
                userId:data.userId
            }
        })
        if(data.address){
            if(!data.address.id){
                const address = await AddressService.baseApi.create({...data.address, userId:biography.userId});
                data.addressId = address.id;
            }else{
                await AddressService.baseApi.update(data.address.id, data.address)
            }
        }
        if(data.company){
            if(data.company.address){
                if(!data.company.address.id){
                    const address = await AddressService.baseApi.create({...data.company.address, userId:biography.userId});
                    data.company.addressId = address.id;
                }else{
                    await AddressService.baseApi.update(data.company.address.id, data.company.address)
                }
            }

            if(!data.company.id){
                const company = await CompanyService.baseApi.create(data.company);
                data.companyId = company.id;
            }else{
                await CompanyService.baseApi.update(data.company.id, data.company);
            }
        }
        if(biography){
            biography = await this.baseApi.update(biography.id, data);
        }else{
            biography = await this.baseApi.create(data);
        }
        return (await this.baseApi.get(biography.id, undefined, [{association:'address'}, {association:'company', include:'address'}]))
    }
}

const instance = new BiographyService();

export default instance;