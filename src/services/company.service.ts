import { CompanyDocument } from "../models/company.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Company = db.Company;

class CompanyService {
    baseApi = new baseCRUDApi<CompanyDocument>(Company);

}

const instance = new CompanyService();

export default instance;