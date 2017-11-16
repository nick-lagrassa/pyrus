import PearLogger from '../logger';
import fs from 'fs';

test('PearLogger works', () => {
    const testLogger = new PearLogger('test');
    testLogger.log({
        action: 'test'
    });
});
