import c from 'config';
import {
    Model, Sequelize, UUIDV4
} from 'sequelize';

export interface SubscriptionPackageDocument {
    id:string;
    title:string;
    description:string;
    amount:number;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class SubscriptionPackage extends Model<SubscriptionPackageDocument>
    implements SubscriptionPackageDocument {
        id!:string;
        title!:string;
        description!:string;
        amount!:number;
    };
    SubscriptionPackage.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'SubscriptionPackage'
    });
    return SubscriptionPackage;
}