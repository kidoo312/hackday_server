/**
 * Created by kidoo.han on 27/04/2019
 */
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
    res.status(500);
    logger.error(err.stack);
}