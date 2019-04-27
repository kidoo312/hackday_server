/**
 * Created by kidoo.han on 28/04/2019
 */
import { EventTrackingModel } from './event-tracking.model';
import { AdModel } from './ad.model';

export interface AdRequestResultModel {
    requestId: string;
    eventTracking: EventTrackingModel;
    ads: Array<AdModel>;
}