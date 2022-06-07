import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from './user.model';
import { TeamDocument } from './team.model';

export interface TeamProposalDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    teamId:string;
    team?:TeamDocument;
    status?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class TeamProposal extends Model<TeamProposalDocument>
    implements TeamProposal {
        id!:string;
        userId!:string;
        teamId!:string;
        status?:string;

        static associate(models:any){
            TeamProposal.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
            TeamProposal.belongsTo(models.Team, {
                foreignKey: 'teamId',
                as:'team'
            })
        }
    };
    TeamProposal.init({
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
        teamId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'TeamProposal'
    });
    return TeamProposal;
}