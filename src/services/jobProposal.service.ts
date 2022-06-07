import { JobProposalDocument } from "../models/jobProposal.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const JobProposal = db.JobProposal;

class JobProposalService {
    baseApi = new baseCRUDApi<JobProposalDocument>(JobProposal);
}

const instance = new JobProposalService();

export default instance;