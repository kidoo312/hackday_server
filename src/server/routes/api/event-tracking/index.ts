/**
 * Created by kidoo.han on 29/04/2019
 */
import { GET, Path, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import {
    logger,
    base64Helper,
} from '../../../libs';

@Path('/et')
export class EventTrackingController {
    /**
     * Ack impression Event tracking.
     * @param encryptedInfo
     */
    @Path('/s1/:encryptedInfo')
    @GET
    @Tags('event-tracking')
    invokeAckImpression(@PathParam('encryptedInfo') encryptedInfo: string) {
        logger.info(`[ack impression] ${base64Helper.decode(encryptedInfo)}`);
    }

    /**
     * Active view impression Event tracking.
     * @param encryptedInfo
     */
    @Path('/s2/:encryptedInfo')
    @GET
    @Tags('event-tracking')
    invokeActiveViewImpression(@PathParam('encryptedInfo') encryptedInfo: string) {
        logger.info(`[active view impression] ${base64Helper.decode(encryptedInfo)}`);
    }

    /**
     * Click Event tracking.
     * @param encryptedInfo
     */
    @Path('/s3/:encryptedInfo')
    @GET
    @Tags('event-tracking')
    invokeClick(@PathParam('encryptedInfo') encryptedInfo: string) {
        logger.info(`[click] ${base64Helper.decode(encryptedInfo)}`);
    }

    /**
     * Error event tracking.
     * @param encryptedInfo
     */
    @Path('/s99/:encryptedInfo')
    @GET
    @Tags('event-tracking')
    invokeError(@PathParam('encryptedInfo') encryptedInfo: string) {
        logger.info(`[error] ${base64Helper.decode(encryptedInfo)}`);
    }
}