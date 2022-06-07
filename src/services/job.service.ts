import { JobDocument } from "../models/job.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import CompanyService from "./company.service";

const Job = db.Job;

class JobService {
    baseApi = new baseCRUDApi<JobDocument>(Job);

    public async createOrUpdateJob(data: JobDocument){
        if(data.company){
            const company = await CompanyService.createOrUpdateCompany({...data.company, userId:data.userId});
            data.companyId = company.id;
        }
        const job = await this.baseApi.createOrUpdate(data);
        return (await this.baseApi.get(job.id, undefined, [{association:'company', include:'address'}]))
    }
}

const instance = new JobService();

export default instance;