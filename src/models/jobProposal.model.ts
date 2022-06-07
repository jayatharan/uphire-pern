import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { JobDocument } from './job.model';

export interface JobProposalDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    jobId:string;
    job?:JobDocument;
    status?:string;
    createdAt?: Date;
    updateAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class JobProposal extends Model<JobProposalDocument>
    implements JobProposal {
        id!:string;
        userId!:string;
        jobId!:string;
        status?:string;

        static associate(models:any){
            JobProposal.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
            JobProposal.belongsTo(models.Job, {
                foreignKey: 'jobId',
                as:'job'
            })
        }
    };
    JobProposal.init({
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
        jobId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'JobProposal'
    });
    return JobProposal;
}

