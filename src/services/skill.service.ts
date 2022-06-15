import { SkillDocument } from "../models/skill.model";
import db from "../models";
import baseCRUDApi from "./baseCRUD.service";

const Skill = db.Skill;

class SkillService {
    baseApi = new baseCRUDApi<SkillDocument>(Skill);

}

const instance = new SkillService();

export default instance;
