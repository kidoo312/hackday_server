/**
 * Created by kidoo.han on 28/04/2019
 */
import { AdProviderEnum } from '../enum/ad-provider.enum';
import { SizeModel } from './size.model';

export interface AdModel {
    adProviderName: AdProviderEnum;
    requestSizes: Array<SizeModel>;
    adUnitId: string;
}