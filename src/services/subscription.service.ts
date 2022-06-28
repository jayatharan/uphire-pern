import { SubscriptionDocument } from "../models/subscription.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import SubscriptionPackageService from './subscriptionPackage.service';

const Subscription  = db.Subscription;

class SubscriptionService {
    baseApi = new baseCRUDApi<SubscriptionDocument>(Subscription);

    public async subscribeService(data: SubscriptionDocument) {
        const existingSubscription = await this.baseApi.find({userId:data.userId});
        const subscriptionPackage = await SubscriptionPackageService.baseApi.get(data.packageId);
        data.amount = subscriptionPackage.amount;
        data.needToPay = subscriptionPackage.amount; 
        const startDate = new Date();
        const endDate = new Date();
        data.startDate = startDate;
        endDate.setFullYear(endDate.getFullYear()+1);
        data.endDate =endDate;
        let subscription;
        if(existingSubscription){
            data.needToPay = (data.needToPay  + existingSubscription.needToPay - existingSubscription.amount);
            subscription = await this.baseApi.update(existingSubscription.id,data);
        }else{
            subscription = await this.baseApi.create(data);
        }
        return subscription;
    }

    public async unSubscribe(userId:string){
        const existingSubscription = await this.baseApi.find({userId});
        return await this.baseApi.delete(existingSubscription.id);
    }

    public async getUserSubscription(userId:string){
        return (await this.baseApi.find({userId}, undefined, 'package'))
        //return (await this.baseApi.list(undefined, undefined, {userId})).rows;
    }

}

const instance = new SubscriptionService();

export default instance;