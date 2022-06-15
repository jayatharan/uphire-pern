import { ListQueryParams } from "./baseCRUD.service";
import db from '../models';

export async function universalFetch(entity:string, listQueryParams:ListQueryParams) {
    const {
        page,
        limit,
        where,
        order,
        attributes,
        include
    } = listQueryParams;

    let model:any = null;
    switch(entity){
        case 'address':
            model = db.Address;
            break;
        case 'company':
            model = db.Company;
            break;    
        case 'biography':
            model =  db.Biography;
            break; 
        case 'project-details':
            model = db.ProjectDetail;
            break; 
        case 'educational-details':
            model = db.EducationalDetail;
            break;
        case 'professional-details':
            model = db.ProfessionalDetail;
            break;
        case 'projects':
            model = db.Project;
            break;
        case 'project-proposals':
            model = db.ProjectProposal;
            break;
        case 'skills':
            model = db.Skill;
            break;
        case 'user-skills':
            model = db.UserSkill;
            break;
        default:
            model = null;    
    }

    let offset:number|undefined;
        if(page && limit){
            offset = (page-1)*limit;
        }
    if(model){
        return (await model.findAndCountAll({
            include,
            where,
            order,
            attributes,
            offset,
            limit
        }))
    }else{
        throw Error("Fetch Query Error");
    }
}