/**
 * Created by kidoo.han on 28/04/2019
 */
import * as _ from 'lodash';
import * as nconf from 'nconf';
import { base64Helper, logger, } from '../../libs/index';
import { AdModel, AdRequestCommandModel, AdRequestResultModel, SizeModel } from '../../../shared/model';
import { AdProviderEnum } from '../../../shared/enum';

// google 관련 상수.
const GOOGLE_CANDIDATE_SIZES: Array<SizeModel> = [
    {width: 320, height: 50},
    {width: 320, height: 100},
    {width: 300, height: 250},
];

// fan 관련 상수.
const FAN_CANDIDATE_SIZES: Array<SizeModel> = [
    {width: 320, height: 50},
    {width: 320, height: 90},
    {width: 320, height: 250},
];
const FAN_CANDIDATE_AD_UNIT_IDS = [
    'IMG_16_9_APP_INSTALL',
    'IMG_16_9_LINK',
];

// naver 관련 상수
const NAVER_CANDIDATE_SIZES: Array<SizeModel> = [
    {width: 320, height: 50},
    {width: 320, height: 100},
    {width: 300, height: 250},
];

// 사용가능한 AdUnitId 목록
const AVAILABLE_AD_UNID_IDS = [
    'HACKDAY_IOS',
    'HACKDAY_AOS',
];

/**
 * google ad 정보 생성.
 * @param requestId 해당 요청에 대한 ID.
 * @param adUnitId 해당 요청의 AdUnitId.
 * @param adId 기기의 adId.
 */
const createGoogleAd = (requestId: number, adUnitId: string, adId: string): AdModel => {
    const googlePlainText = `requestId=${requestId}&adUnitId=${adUnitId}&adId=${adId}&adProviderName=${AdProviderEnum.GOOGLE_AD_MANAGER}`;
    const googleEncrypted = base64Helper.encode(googlePlainText);
    return {
        adProviderName: AdProviderEnum.GOOGLE_AD_MANAGER,
        encryptedInfo: googleEncrypted,
        requestSizes: createGoogleRequestSizes(requestId),
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    };
};

/**
 * google 광고의 렌더링 사이즈 목록을 return.
 * @param requestId
 */
const createGoogleRequestSizes = (requestId: number): Array<SizeModel> => {
    const sizeCount = requestId % (GOOGLE_CANDIDATE_SIZES.length) + 1;
    const tGoogleCandidateSizes: Array<SizeModel> = _.cloneDeep(GOOGLE_CANDIDATE_SIZES);
    const retSizes: Array<SizeModel> = [];

    for (let i = 0; i < sizeCount; i++) {
        const pulledSizes: Array<SizeModel> = _.pullAt(tGoogleCandidateSizes, requestId % tGoogleCandidateSizes.length);
        retSizes.push(...pulledSizes);
    }

    return retSizes;
};

/**
 * fan ad 정보 생성.
 * @param requestId 해당 요청에 대한 ID.
 * @param adUnitId 해당 요청의 AdUnitId.
 * @param adId 기기의 adId.
 */
const createFanAd = (requestId: number, adUnitId: string, adId: string): AdModel => {
    const fanPlainText = `requestId=${requestId}&adUnitId=${adUnitId}&adId=${adId}&adProviderName=${AdProviderEnum.FACEBOOK_AUDIENCE_NETWORK}`;
    const fanEncrypted = base64Helper.encode(fanPlainText);
    return {
        adProviderName: AdProviderEnum.FACEBOOK_AUDIENCE_NETWORK,
        encryptedInfo: fanEncrypted,
        requestSizes: [createFanRequestSize(requestId)],
        adUnitId: `${FAN_CANDIDATE_AD_UNIT_IDS[requestId % 2]}#YOUR_PLACEMENT_ID`,
    };
};

/**
 * fan 광고의 렌더링 사이즈를 return.
 * @param requestId
 */
const createFanRequestSize = (requestId: number): SizeModel => {
    return FAN_CANDIDATE_SIZES[requestId % FAN_CANDIDATE_SIZES.length];
};

const createNaverAd = (requestId: number, adUnitId: string, adId: string): AdModel => {
    const naverPlainText = `requestId=${requestId}&adUnitId=${adUnitId}&adId=${adId}&adProviderName=${AdProviderEnum.NAVER}`;
    const naverEncrypted = base64Helper.encode(naverPlainText);
    const naverRequestSize = createNaverRequestSize(requestId);
    return {
        adProviderName: AdProviderEnum.NAVER,
        encryptedInfo: naverEncrypted,
        requestSizes: [naverRequestSize],
        adm: `
<html>

<body style="margin: 0; padding: 0">
    <a data-ssp="clk" href="https://www.naver.com" style="display:block;max-width:414px;margin:0 auto;" target="_top"> 
    <img src="http://${nconf.get('server').url}:${nconf.get('port')}/static/images/${naverRequestSize.width}x${naverRequestSize.height}.png" alt="" data-content-type="image" style="width:100%;height:auto;vertical-align: top;border:none" /> 
    </a>
</body>

</html>
        `,
    }
};

const createNaverRequestSize = (requestId: number): SizeModel => {
    return NAVER_CANDIDATE_SIZES[requestId % NAVER_CANDIDATE_SIZES.length];
};

// demand 별 광고 정보 생성 함수 목록.
const CREATE_AD_FUNCTIONS = [
    createGoogleAd,
    createFanAd,
    createNaverAd,
];

/**
 * 응답 값으로 내려갈 demand 의 광고 정보 목록을 return.
 * @param requestId 해당 요청에 대한 ID.
 * @param adUnitId 해당 요청의 AdUnitId.
 * @param adId 기기의 adId.
 */
const createAds = (requestId: number, adUnitId: string, adId: string): Array<AdModel> => {
    const demandCount = requestId % (CREATE_AD_FUNCTIONS.length) + 1;
    const tCreateAdFunctions = _.cloneDeep(CREATE_AD_FUNCTIONS);
    const retAds: Array<AdModel> = [];

    logger.info('------------------------------');
    for (let i = 0; i < demandCount; i++) {
        const pulledFunctions = _.pullAt(tCreateAdFunctions, requestId % tCreateAdFunctions.length);
        const createdAd: AdModel = pulledFunctions[0](requestId, adUnitId, adId);

        logger.info(`requestId: ${requestId}, adId: ${adId}, adProvider: ${createdAd.adProviderName}, encrypted: ${createdAd.encryptedInfo}`);
        retAds.push(pulledFunctions[0](requestId, adUnitId, adId));
    }
    logger.info('------------------------------');

    return retAds;
};

/**
 * 광고 정보 요청에 대한 응답값 생성.
 * @param command 광고 정보 요청에 대한 command 객체.
 */
export const getAdRequestResult = async (command: AdRequestCommandModel): Promise<AdRequestResultModel> => {
    const {adId, adUnitId} = command;

    if ( !adId ) {
        throw new Error("invalid ad id.");
    }

    if ( !_.includes(AVAILABLE_AD_UNID_IDS, adUnitId) ) {
        throw new Error("invalid ad unit id.");
    }

    const requestId = Date.now();
    const eventTrackingUrl = `http://${nconf.get('server').url}:${nconf.get('port')}/et`;

    return {
        requestId: requestId.toString(),
        eventTracking: {
            ackImpressionUrl: `${eventTrackingUrl}/s1`,
            activeViewImpressionUrl: `${eventTrackingUrl}/s2`,
            clickUrl: `${eventTrackingUrl}/s3`,
            errorUrl: `${eventTrackingUrl}/s99`,
        },
        ads: createAds(requestId, adUnitId, adId),
    } as AdRequestResultModel;
};