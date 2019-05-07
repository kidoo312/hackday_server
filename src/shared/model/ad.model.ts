/**
 * Created by kidoo.han on 28/04/2019
 */
import { AdProviderEnum } from '../enum';
import { SizeModel } from './size.model';

export interface AdModel {
    /**
     * 광고 제공자 명.
     */
    adProviderName: AdProviderEnum;

    /**
     * 해당 광고의 정보를 담은 encrypted 값.
     */
    encryptedInfo: string;

    /**
     * 요청 사이즈 목록.
     */
    requestSizes: Array<SizeModel>;

    /**
     * demend 의 광고 유닛 아이디.
     * c2s 전용.
     */
    adUnitId?: string;

    /**
     * naver 광고 markup.
     * s2s 전용.
     */
    adm?: string;
}