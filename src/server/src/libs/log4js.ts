/**
 * Created by kidoo.han on 27/04/2019
 */
import * as log4js from 'log4js';
import * as path from 'path';
import * as _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const logDir = _.includes(process.cwd(), '/home1/irteam') ? '/home1/irteam/logs' : path.join(process.cwd(), 'logs');

export const setConfigure = () => {
    let appenderList: string[] = [];
    switch ( env ) {
        case 'production': {
            appenderList = ['errorLogFilter', 'combinedLog'];
            break;
        }

        case 'development':
        default: {
            appenderList = ['console'];
        }
    }

    log4js.configure({
        appenders: {
            console: {
                type: 'stdout',
            },
            combinedLog: {
                type: 'dateFile',
                filename: `${logDir}/combined/combined.log`,
                daysToKeep: 30,
                pattern: '.yyyy-MM-dd',
            },
            errorLog: {
                type: 'file',
                filename: `${logDir}/error/error.log`,
                maxLogSize: 10485760,
                backups: 3,
                compress: true,
            },
            errorLogFilter: {
                type: 'logLevelFilter',
                appender: 'errorLog',
                level: 'error',
            },
        },
        categories: {
            default: { appenders: appenderList, level: 'debug' },
        },
    });
};

export default log4js.getLogger();
