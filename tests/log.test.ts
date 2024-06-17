import { describe, expect, test } from 'vitest';
import { useFunctionMock } from '@chubbyts/chubbyts-function-mock/dist/function-mock';
import type { LogFn } from '../src/log';
import { LogLevel, createLogger } from '../src/log';

describe('log', () => {
  describe('createLogger', () => {
    test('without log function', () => {
      const logger = createLogger();
      logger.emergency('emergency', { key: 'value' });
      logger.alert('alert', { key: 'value' });
      logger.critical('critical', { key: 'value' });
      logger.error('error', { key: 'value' });
      logger.warning('warning', { key: 'value' });
      logger.notice('notice', { key: 'value' });
      logger.info('info', { key: 'value' });
      logger.debug('debug', { key: 'value' });
    });

    test('with log function', () => {
      const [log, logMocks] = useFunctionMock<LogFn>([
        { parameters: [LogLevel.EMERGENCY, 'emergency', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.ALERT, 'alert', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.CRITICAL, 'critical', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.ERROR, 'error', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.WARNING, 'warning', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.NOTICE, 'notice', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.INFO, 'info', { key: 'value' }], return: undefined },
        { parameters: [LogLevel.DEBUG, 'debug', { key: 'value' }], return: undefined },
      ]);

      const logger = createLogger(log);
      logger.emergency('emergency', { key: 'value' });
      logger.alert('alert', { key: 'value' });
      logger.critical('critical', { key: 'value' });
      logger.error('error', { key: 'value' });
      logger.warning('warning', { key: 'value' });
      logger.notice('notice', { key: 'value' });
      logger.info('info', { key: 'value' });
      logger.debug('debug', { key: 'value' });

      expect(logMocks.length).toBe(0);
    });
  });
});
