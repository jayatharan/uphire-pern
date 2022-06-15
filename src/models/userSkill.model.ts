import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { SkillDocument } from './skill.model';

export interface UserSkillDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    skillId:string;
    skill?:SkillDocument;
    level:number;
    points:number;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class UserSkill extends Model<UserSkillDocument> 
    implements UserSkill {
        id!:string;
        userId!: string;
        skillId!: string;
        points!:number;
        level!:number;

        static associate(models:any){
            UserSkill.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            UserSkill.belongsTo(models.Skill, {
                foreignKey: 'skillId',
                as:'skill'
            });
        }
    }
    UserSkill.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        skillId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        points:{
            type:DataTypes.DECIMAL,
            allowNull: false,
            defaultValue:0,
            validate:{
                max:100,
                min:0
            }
        },
        level:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                max:4,
                min:0
            }
        }
    },{
        sequelize,
        modelName: 'UserSkill'
    });
    return UserSkill;
}