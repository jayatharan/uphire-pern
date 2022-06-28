import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { SubscriptionPackageDocument } from './subscriptionPackage.model';

export interface SubscriptionDocument{
    id:string;
    userId: string;
    user?:UserDocument;
    packageId:string;
    package?:SubscriptionPackageDocument;
    startDate?:Date;
    endDate?:Date;
    amount:number;
    needToPay?:number;
    active?:boolean;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Subscription extends Model<SubscriptionDocument>
    implements SubscriptionDocument {
        id!:string;
        userId!: string;
        packageId!:string;
        startDate?: Date | undefined;
        endDate?: Date | undefined;
        amount!:number;
        needToPay?:number;
        active?:boolean;

        static associate(models:any){
            Subscription.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            Subscription.belongsTo(models.SubscriptionPackage, {
                foreignKey: 'packageId',
                as:'package'
            })
        }
    };
    Subscription.init({
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
        packageId: {
            type: DataTypes.UUID,
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
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        needToPay: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.00,
            allowNull: false
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Subscription'
    });
    return Subscription;
}