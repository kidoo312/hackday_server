/**
 * Created by kidoo.han on 28/04/2019
 */
import * as moment from 'moment';
import * as nconf from 'nconf';
import {
    logger,
    base64Helper,
} from '../../libs/index';
import { AdRequestCommandModel, AdRequestResultModel } from '../../../shared/model';
import { AdProviderEnum } from '../../../shared/enum';

export const getAdRequest = async (command: AdRequestCommandModel): Promise<AdRequestResultModel> => {
    const requestId = moment().millisecond().toString();
    const { adId, adUnitId } = command;

    // google ad manager encrypt
    const googlePlainText = `requestId=${requestId}&adUnitId=${adUnitId}&adId=${adId}&adProviderName=${AdProviderEnum.GOOGLE_AD_MANAGER}`;
    const googleEncrypted = base64Helper.encode(googlePlainText);

    // fan encrypt
    const fanPlainText = `requestId=${requestId}&adUnitId=${adUnitId}&adId=${adId}&adProviderName=${AdProviderEnum.FACEBOOK_AUDIENCE_NETWORK}`;
    const fanEncrypted = base64Helper.encode(fanPlainText);

    // logging
    logger.info(`requestId: ${requestId}, adId: ${adId}, googleEncrypted: ${googleEncrypted}, fanEncrypted: ${fanEncrypted}`);

    return {
        requestId: requestId,
        eventTracking: {
            ackImpressionUrl: `${nconf.get('eventTracker').url}/s1`,
            activeViewImpressionUrl: `${nconf.get('eventTracker').url}/s2`,
            clickUrl: `${nconf.get('eventTracker').url}/s3`,
            errorUrl: `${nconf.get('eventTracker').url}/s99`,
        },
        ads: [
            {
                adProviderName: AdProviderEnum.GOOGLE_AD_MANAGER,
                encryptedInfo: googleEncrypted,
                requestSizes: [
                    { width: 320, height: 100 },
                ],
                adUnitId: 'ca-app-pub-3940256099942544/6300978111'
            },
            {
                adProviderName: AdProviderEnum.FACEBOOK_AUDIENCE_NETWORK,
                encryptedInfo: fanEncrypted,
                requestSizes: [
                    { width: 320, height: 100 },
                ],
                adUnitId: 'IMG_16_9_LINK#YOUR_PLACEMENT_ID',
            },
        ],
    } as AdRequestResultModel;

    // FACEBOOK IMG_16_9_APP_INSTALL, IMG_16_9_LINK 둘 중에 하
};