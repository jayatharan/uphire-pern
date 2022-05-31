import { BiographyDocument } from "../models/biography.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import AddressService from "./address.service";
import CompanyService from "./company.service";

const Biography = db.Biography;

class BiographyService {
    baseApi = new baseCRUDApi<BiographyDocument>(Biography);

    public async updateBiography(data:BiographyDocument){
        let biography = await this.baseApi.find({
            userId:data.userId
        })
        if(data.address){
            const address = await AddressService.baseApi.createOrUpdate(data.address);
            data.addressId = address.id;
        }
        if(data.company){
            if(data.company.address){
                const address = await AddressService.baseApi.createOrUpdate({...data.company.address, userId:biography.userId});
                data.company.addressId = address.id;
            }
            const company = await CompanyService.baseApi.createOrUpdate(data.company);
            data.companyId = company.id;
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