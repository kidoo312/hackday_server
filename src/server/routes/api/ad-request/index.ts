/**
 * Created by kidoo.han on 27/04/2019
 */
import { GET, Path, Errors, QueryParam } from 'typescript-rest';
import { IsInt, Tags } from 'typescript-rest-swagger';
import { AdRequestService } from '../../../services';
import { AdRequestCommandModel, AdRequestResultModel } from '../../../../shared/model';
import { GenderEnum } from '../../../../shared/enum';

@Path('/ad-request')
export class AdRequestController {
    /**
     * SSP 광고 요청
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

            return await AdRequestService.getAdRequestResult(command);
        } catch (err) {

            throw new Errors.InternalServerError(err);
        }
    }
}