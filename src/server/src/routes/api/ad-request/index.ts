/**
 * Created by kidoo.han on 27/04/2019
 */
import { GET, Path, Errors, QueryParam } from 'typescript-rest';
import { IsInt, Tags } from 'typescript-rest-swagger';
import { AdRequestService } from '../../../services';
import { AdRequestCommandModel } from '../../../../../shared/model';
import { AdRequestResultModel } from '../../../../../shared/model/ad-request-result.model';
import { GenderEnum } from '../../../../../shared/enum/gender.enum';

@Path('/ad-request')
export class AdRequestController {
    /**
     * SSP 광고 요청
     * @param adUnitId 광고 유닛 ID.
     * @param gender 성별.
     * @param uct 국가값.
     * @param yob 태어난 년도.
     */
    @GET
    @Tags('ad-request')
    async getAdRequest(@QueryParam("adUnitId") adUnitId: string,
                       @QueryParam("gender") gender?: GenderEnum,
                       @QueryParam("uct") uct?: string,
                       @QueryParam("yob") @IsInt yob?: number): Promise<AdRequestResultModel> {

        try {
            const command: AdRequestCommandModel = {
                adUnitId,
                gender,
                uct,
                yob
            };

            return await AdRequestService.getAdRequest(command);
        } catch (err) {
            throw new Errors.InternalServerError(err);
        }
    }
}