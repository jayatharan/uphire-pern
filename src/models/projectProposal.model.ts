import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { ProjectDocument } from './project.model';

export interface ProjectProposalDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    projectId:string;
    project?:ProjectDocument;
    description?: string;
    amount:number;
    startDate?:Date;
    endDate?:Date;
    status?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class ProjectProposal extends Model<ProjectProposalDocument> 
    implements ProjectProposal {
        id!:string;
        userId!:string;
        projectId!:string;
        description?:string;
        amount!:number;
        startDate?:Date;
        endDate?:Date;
        status?:string;
        
        static associate(models:any){
            ProjectProposal.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
            ProjectProposal.belongsTo(models.Project, {
                foreignKey: 'projectId',
                as:'project'
            })
        }
    };
    ProjectProposal.init({
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
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'ProjectProposal'
    });
    return ProjectProposal;
}