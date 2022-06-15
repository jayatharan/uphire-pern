import {
    Model, Sequelize, UUIDV4
} from 'sequelize';

export interface SkillDocument {
    id:string;
    title:string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Skill extends Model<SkillDocument>
    implements SkillDocument {
        id!:string;
        title!:string;
    };

    Skill.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },{
        sequelize,
        modelName: 'Skill'
    })
    return Skill;
}