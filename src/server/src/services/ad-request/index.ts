/**
 * Created by kidoo.han on 28/04/2019
 */
import { AdRequestCommandModel } from '../../../../shared/model';
import { AdRequestResultModel } from '../../../../shared/model/ad-request-result.model';

export const getAdRequest = async (command: AdRequestCommandModel): Promise<AdRequestResultModel> => {
    return {
        requestId: '111111',
        eventTracking: {
            ackImpressionUrl: 'https://www.naver.com',
            activeViewImpressionUrl: 'https://www.naver.com',
            clickUrl: 'https://www.naver.com',
            errorUrl: 'https://www.naver.com',
        },
        ads: [],
    } as AdRequestResultModel;
};