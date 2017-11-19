import fs from 'fs';
import path from 'path';
import { createLogger, transports, format } from 'winston';

export default class PearLogger {
    constructor(id) {
        this.file = path.join(__dirname, 'logs', `game-${ id }.log`);
        const fd = fs.openSync(this.file, 'w');
        this.logger = createLogger({
            level: 'info',
            transports: [
                new transports.File({
                    filename: this.file,
                    level: 'info'
                })
            ]
        });
    }

    log(message, level='info') {
        this.logger.log({
            level,
            timestamp: Date.now(),
            ...message
        });
    }
}