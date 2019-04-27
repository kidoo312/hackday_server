/**
 * Created by kidoo.han on 27/04/2019
 */
import { GenderEnum } from '../enum/gender.enum';

export interface AdRequestCommandModel {
    adUnitId: string;
    gender?: GenderEnum;
    uct?: string;
    yob?: number;
}