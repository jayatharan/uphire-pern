import { SubscriptionPackageDocument } from "../models/subscriptionPackage.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const SubscriptionPackage = db.SubscriptionPackage;

class SubscriptionPackageService {
    baseApi = new baseCRUDApi<SubscriptionPackageDocument>(SubscriptionPackage);
}

const instance = new SubscriptionPackageService();

export default instance;