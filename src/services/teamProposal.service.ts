import { TeamProposalDocument } from "../models/teamProposal.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const TeamProposal = db.TeamProposal;

class TeamProposalService {
    baseApi = new baseCRUDApi<TeamProposalDocument>(TeamProposal);
}

const instance = new TeamProposalService();

export default instance;