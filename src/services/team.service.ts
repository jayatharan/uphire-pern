import { TeamDocument } from "../models/team.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Team = db.Team;

class TeamService {
    baseApi = new baseCRUDApi<TeamDocument>(Team);

}

const instance = new TeamService();

export default instance;