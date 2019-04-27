/**
 * Created by kidoo.han on 28/04/2019
 */
import { AdProviderEnum } from '../enum/ad-provider.enum';
import { SizeModel } from './size.model';

export interface AdModel {
    /**
     * 광고 제공자 명.
     */
    adProviderName: AdProviderEnum;

    /**
     * 요청 사이즈 목록.
     */
    requestSizes: Array<SizeModel>;

    /**
     * demend 의 광고 유닛 아이디.
     */
    adUnitId: string;
}