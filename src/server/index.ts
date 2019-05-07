/**
 * Created by kidoo.han on 27/04/2019
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as compression from 'compression';
import * as nconf from 'nconf';
import * as path from 'path';
import { Server } from 'typescript-rest';
import apiController from './routes/api';
import {
    logger,
    morgan,
    setConfigure,
    errorHandler,
} from './libs';

nconf.defaults({
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4201,
});

/*
 * port, env
 */
const port = nconf.get('port');
const env = nconf.get('env');

nconf.file({
    file: path.join(__dirname, 'environments', `${env}.yml`),
    format: require('nconf-yaml'),
});

/*
 * log4js set configure
 */
setConfigure();

/*
 * express 객체 생성
 */
const app = express();

/*
 * compress all responses
 */
app.use(compression());

/*
 * Cookie, body parsing 을 위한 middleware 설정.
 * 주의해야 할 부분은 bodyParser 가 반드시 methodOverride 위에 위치해야 한다.
 */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * REST 를 사용하기 위한 middleware 설정
 * browser 가 기본적으로 get/post 만 지원하기 때문에 _method 라는 이름의 hidden input 을 두어 http method 를 처리하는데
 * 이것을 처리할 수 있도록 해서 put/delete 와 같은 method 를 지원할 수 있도록 한다.
 * 주의해야 할 부분은 bodyParser 가 반드시 methodOverride 위에 위치해야 한다.
 */
app.use(methodOverride());

/*
 * http request logger middleware 설정
 */
app.use(morgan);

/*
 * api controllers 연결
 */
const apis = express.Router();
Server.buildServices(apis, ...apiController);
app.use('/api', apis);
app.use('/static', express.static(__dirname + '/public'));

/*
 * swagger 설정.
 */
const swaggerUiOptions = {
    customSiteTitle: 'SSP Server Docs',
};
Server.swagger(app, {
    endpoint: 'api-docs',
    filePath: path.join(__dirname, '../../dist/swagger.yaml'),
    host: `${nconf.get('server').url}:${port}`,
    schemes: ['http'],
    swaggerUiOptions: swaggerUiOptions
});

/*
 * error handler
 */
app.use(errorHandler);

/*
 * listen
 */
app.listen(nconf.get('port'), () => {
    logger.info(`app-server listening on ${port}`);
});