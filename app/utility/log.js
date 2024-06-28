const  logger = require("./logger");

const infoLogger = (method, message = "", data = "") => {
    try {
        let logObj = {
            method,
            message,
            data
        };
        logger.info(logObj);
    } catch (err) {
        console.error("error in InfoLogger", err);
    }
};

const errorLogger = (method, message = "", data = "") => {
    try {
        let logObj = {
            method,
            message,
            data
        };
        logger.error(logObj);
    } catch (err) {
        console.error("error in errorLogger", err);
    }
};

module.exports =  { infoLogger, errorLogger };
