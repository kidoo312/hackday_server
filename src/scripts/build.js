/**
 * Created by kidoo.han on 27/04/2019
 */
const path = require('path');
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const chalk = require('chalk');

const shell = (cmd) => {
    console.log(cmd);
    execSync(cmd);
};

const distRootPath = path.join(__dirname, '../../dist');
const serverPath = path.join(__dirname, '../server');
const serverDistPath = path.join(__dirname, '../../dist/server');

console.log(`> ${chalk.blue('production build start')}`);

shell(`rm -rf ${distRootPath}`);
console.log(`> ${chalk.green('generate swagger file')}`);
spawn('yarn', ['gen-swagger'])
    .on('close', () => {
        spawn('tsc', ['-p', serverPath])
            .on('close', () => {
                console.log(`> ${chalk.green('server build complete')}`);
                shell(`cp -R ${serverPath}/environments ${serverDistPath}/environments`);
            });
    });