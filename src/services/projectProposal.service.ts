import { ProjectProposalDocument } from "../models/projectProposal.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const ProjectProposal = db.ProjectProposal;

class ProjectProposalService {
    baseApi = new baseCRUDApi<ProjectProposalDocument>(ProjectProposal);
}

const instance = new ProjectProposalService();

export default instance;