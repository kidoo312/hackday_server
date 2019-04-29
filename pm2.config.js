module.exports = {
    apps: [{
        name: 'ssp_server',
        script: './dist/server/src/index.js',
        watch: false,
        env: {
          "NODE_ENV": "production",
          "PORT": 4200
        },
        autorestart: true,
        instances: 0,
        exec_mode: "cluster",
        merge_logs: true,
        kill_timeout: 60 * 1000 * 60,
        log_date_format : "YYYY-MM-DD HH:mm:ss"
    }]
};