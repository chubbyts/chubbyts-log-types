import { describe, expect, test } from 'vitest';
import { useFunctionMock } from '@chubbyts/chubbyts-function-mock/dist/function-mock';
import type { LogFn } from '../src/log';
import { createLogger } from '../src/log';

describe('log', () => {
  describe('createLogger', () => {
    test('without log function', () => {
      const logger = createLogger();

      logger.emergency('message', { key: 'value' });
      logger.alert('message', { key: 'value' });
      logger.critical('message', { key: 'value' });
      logger.error('message', { key: 'value' });
      logger.warning('message', { key: 'value' });
      logger.notice('message', { key: 'value' });
      logger.info('message', { key: 'value' });
      logger.debug('message', { key: 'value' });
    });

    test('with log function', () => {
      const [log, logMocks] = useFunctionMock<LogFn>([
        { parameters: ['emergency', 'message', { key: 'value' }] },
        { parameters: ['alert', 'message', { key: 'value' }] },
        { parameters: ['critical', 'message', { key: 'value' }] },
        { parameters: ['error', 'message', { key: 'value' }] },
        { parameters: ['warning', 'message', { key: 'value' }] },
        { parameters: ['notice', 'message', { key: 'value' }] },
        { parameters: ['info', 'message', { key: 'value' }] },
        { parameters: ['debug', 'message', { key: 'value' }] },
      ]);

      const logger = createLogger(log);

      logger.emergency('message', { key: 'value' });
      logger.alert('message', { key: 'value' });
      logger.critical('message', { key: 'value' });
      logger.error('message', { key: 'value' });
      logger.warning('message', { key: 'value' });
      logger.notice('message', { key: 'value' });
      logger.info('message', { key: 'value' });
      logger.debug('message', { key: 'value' });

      expect(logMocks.length).toBe(0);
    });
  });
});
