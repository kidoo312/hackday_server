/**
 * Created by kidoo.han on 27/04/2019
 */
/**
 * Created by kidoo.han on 2018. 9. 3.
 */
import * as morgan from 'morgan';
import * as moment from 'moment';
import { getLogger } from 'log4js';

const logger = getLogger();

morgan.token('date', () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
});

export default morgan((process.env.NODE_ENV || 'development') === 'development' ? 'dev' : 'combined');
