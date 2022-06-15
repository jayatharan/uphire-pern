import { UserSkillDocument } from "../models/userSkill.model";
import db from "../models";
import baseCRUDApi from "./baseCRUD.service";
import SkillService from "./skill.service";

const UserSkill = db.UserSkill;

class UserSkillService {
    baseApi = new baseCRUDApi<UserSkillDocument>(UserSkill);

    public async addUserSkill(data: UserSkillDocument){
        if(!data.skillId){
            const skill = await SkillService.baseApi.createOrUpdate(data.skill);
            data.skillId = skill.id;
        }
        let userSkill = await this.baseApi.find({userId:data.userId, skillId:data.skillId});
        if(userSkill) return userSkill;
        else{
            userSkill = await this.baseApi.create(data);
            return userSkill;
        }
    }
}

const instance = new UserSkillService();

export default instance;
