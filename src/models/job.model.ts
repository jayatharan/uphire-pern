import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { CompanyDocument } from './company.model';

export interface JobDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    title: string;
    description?: string;
    salary?: string;
    type?:string;
    companyId?:string;
    company?:CompanyDocument;
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updateAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Job extends Model<JobDocument>
    implements Job {
        id!:string;
        userId!:string;
        title!:string;
        description?:string;
        salary?:string;
        type?:string;
        companyId?: string | undefined;
        startDate?:Date;
        endDate?:Date;

        static associate(models:any){
            Job.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
            Job.belongsTo(models.Company, {
                foreignKey: 'companyId',
                as:'company'
            })
            Job.hasMany(models.JobProposal, {
                foreignKey: 'jobId',
                as:'jobProposals'
            })
        }
    };
    Job.init({
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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyId:{
            type: DataTypes.UUID,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'Job'
    });
    return Job;
}