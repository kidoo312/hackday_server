/**
 * Created by kidoo.han on 27/04/2019
 */
import { GenderEnum } from '../enum';

export interface AdRequestCommandModel {
    /**
     * 광고 유닛 아이디.
     */
    adUnitId: string;

    /**
     * ad id.
     */
    adId: string;

    /**
     * 성별.
     */
    gender?: GenderEnum;

    /**
     * 국가명.
     */
    uct?: string;

    /**
     * year of birth.
     */
    yob?: number;
}