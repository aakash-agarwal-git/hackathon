const  winston = require ("winston");


const myFormat =  winston.format.printf((message, level, timestamp) => {
    if (message && message.isAxiosError) {
        message = {
            request: {
                url: message.config.url,
                method: message.config.method,
                data: message.config.data,
                headers: message.config.headers
            },
            response: message.response.data
        };
    }

    const msg = {
        level,
        timestamp,
        ...message
    };

    return JSON.stringify(msg);
});

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
    level: "info",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS"
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        myFormat
    ),
    transports
});

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

module.exports = logger;
