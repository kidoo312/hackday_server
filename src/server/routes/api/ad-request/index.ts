/**
 * Created by kidoo.han on 27/04/2019
 */
import { GET, Path, Errors, QueryParam } from 'typescript-rest';
import { IsInt, Tags } from 'typescript-rest-swagger';
import { AdRequestService } from '../../../services';
import { AdRequestCommandModel, AdRequestResultModel } from '../../../../shared/model';
import { AdProviderEnum, GenderEnum } from '../../../../shared/enum';

const sleep = require('util').promisify(setTimeout)

@Path('/ad-request')
export class AdRequestController {
    /**
     * SSP 광고 요청
     * 사용가능 adUnitId(HACKDAY_IOS, HACKDAY_ANDROID)
     * @param adUnitId 광고 유닛 ID.
     * @param adId android 에서의 adId 혹은 iOS 에서의 IDFA 값.
     * @param gender 성별.
     * @param uct 국가값.
     * @param yob 태어난 년도.
     */
    @GET
    @Tags('ad-request')
    async getAdRequest(@QueryParam("adUnitId") adUnitId: string,
                       @QueryParam("adId") adId: string,
                       @QueryParam("gender") gender?: GenderEnum,
                       @QueryParam("uct") uct?: string,
                       @QueryParam("yob") @IsInt yob?: number): Promise<AdRequestResultModel> {
        try {
            const command: AdRequestCommandModel = {
                adUnitId,
                adId,
                gender,
                uct,
                yob
            };

            return AdRequestService.getAdRequestResult(command);
        } catch (err) {
            throw new Errors.InternalServerError(err);
        }
    }

    /**
     * SSP 광고 요청
     * 응답값에 문제가 있는 케이스
     *
     * @param adUnitId 광고 유닛 ID.
     * @param adId android 에서의 adId 혹은 iOS 에서의 IDFA 값.
     * @param gender 성별.
     * @param uct 국가값.
     * @param yob 태어난 년도.
     */
    @Path('/parse-error')
    @GET
    @Tags('ad-request')
    async getAdRequestParseError(
        @QueryParam("adUnitId") adUnitId: string,
        @QueryParam("adId") adId: string,
        @QueryParam("gender") gender?: GenderEnum,
        @QueryParam("uct") uct?: string,
        @QueryParam("yob") @IsInt yob?: number
    ): Promise<Object> {
        return {
            ads: [
                {
                    adproviderName: AdProviderEnum.NAVER,
                    requestSize: 'foo',
                },
            ],
        };
    }

    /**
     * SSP 광고 요청
     * 사용가능 adUnitId(HACKDAY_IOS, HACKDAY_ANDROID)
     * 10초 뒤에 응답
     *
     * @param adUnitId 광고 유닛 ID.
     * @param adId android 에서의 adId 혹은 iOS 에서의 IDFA 값.
     * @param gender 성별.
     * @param uct 국가값.
     * @param yob 태어난 년도.
     */
    @Path('/test-delay')
    @GET
    @Tags('ad-request')
    async getAdRequestTestDelay(
        @QueryParam("adUnitId") adUnitId: string,
        @QueryParam("adId") adId: string,
        @QueryParam("gender") gender?: GenderEnum,
        @QueryParam("uct") uct?: string,
        @QueryParam("yob") @IsInt yob?: number
    ): Promise<AdRequestResultModel> {
        try {
            const command: AdRequestCommandModel = {
                adUnitId,
                adId,
                gender,
                uct,
                yob
            };

            await sleep(10000);
            return AdRequestService.getAdRequestResult(command)
        } catch (err) {
            throw new Errors.InternalServerError(err);
        }
    }

    /**
     * SSP 광고 요청
     * encode 테스트
     * 사용가능 adUnitId(핵데이_아이폰, 핵데이_안드로이드)
     *
     * @param adUnitId 광고 유닛 ID.
     * @param adId android 에서의 adId 혹은 iOS 에서의 IDFA 값.
     * @param gender 성별.
     * @param uct 국가값.
     * @param yob 태어난 년도.
     */
    @Path('/test-encode')
    @GET
    @Tags('ad-request')
    async getAdRequestTestEncode(
        @QueryParam("adUnitId") adUnitId: string,
        @QueryParam("adId") adId: string,
        @QueryParam("gender") gender?: GenderEnum,
        @QueryParam("uct") uct?: string,
        @QueryParam("yob") @IsInt yob?: number
    ): Promise<AdRequestResultModel> {
        try {
            const command: AdRequestCommandModel = {
                adUnitId,
                adId,
                gender,
                uct,
                yob
            };

            return AdRequestService.getAdRequestResult(command, true)
        } catch (err) {
            throw new Errors.InternalServerError(err);
        }
    }
}