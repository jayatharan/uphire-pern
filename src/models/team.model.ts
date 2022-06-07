import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { ProjectDocument } from './project.model';
import { TeamProposalDocument } from './teamProposal.model';
import { UserDocument } from './user.model';

export interface TeamDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    description?: string;
    projectId:string;
    project?:ProjectDocument;
    teamProposals?:TeamProposalDocument[];
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Team extends Model<TeamDocument>
    implements TeamDocument {
        id!:string;
        userId!:string;
        projectId!:string;
        description?:string;

        static associate(models:any){
            Team.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            Team.belongsTo(models.Project, {
                foreignKey: 'projectId',
                as:'project'
            })
            Team.hasMany(models.TeamProposal, {
                foreignKey: 'teamId',
                as:'teamProposals'
            })
        }
    };
    Team.init({
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
        projectId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'Team'
    });
    return Team;
}