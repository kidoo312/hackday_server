/**
 * Created by kidoo.han on 27/04/2019
 */
import * as httpErrors from 'http-errors';
import logger from './log4js';

/**
 * unhandled rejection 을 catch.
 */
process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

/**
 * uncaught exception 을 catch
 */
process.on('uncaughtException', (err) => {
    logger.error('[UncaughtException] ' + err.stack);
});

/**
 * error-handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default function errorHandler(err, req, res, next) {
    let statusCode = 500;
    if (err instanceof httpErrors.HttpError) {
        statusCode = err.statusCode;
    }

    if (statusCode === 401) {
        res.redirect('/401');
    } else {
        logger.error(err.stack);
    }
}