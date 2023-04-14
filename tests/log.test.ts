import { describe, expect, test } from '@jest/globals';
import { Context, createLogger, LogFn, LogLevel } from '../src/log';

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
      const logEntries: Array<{ level: LogLevel; message: string; context: Context }> = [];

      const log: LogFn = jest.fn((level: LogLevel, message: string, context: Context) => {
        logEntries.push({ level, message, context });
      });

      const logger = createLogger(log);
      logger.emergency('emergency', { key: 'value' });
      logger.alert('alert', { key: 'value' });
      logger.critical('critical', { key: 'value' });
      logger.error('error', { key: 'value' });
      logger.warning('warning', { key: 'value' });
      logger.notice('notice', { key: 'value' });
      logger.info('info', { key: 'value' });
      logger.debug('debug', { key: 'value' });

      expect(log).toHaveBeenCalledTimes(8);

      expect(logEntries).toMatchInlineSnapshot(`
      [
        {
          "context": {
            "key": "value",
          },
          "level": "emergency",
          "message": "emergency",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "alert",
          "message": "alert",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "critical",
          "message": "critical",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "error",
          "message": "error",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "warning",
          "message": "warning",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "notice",
          "message": "notice",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "info",
          "message": "info",
        },
        {
          "context": {
            "key": "value",
          },
          "level": "debug",
          "message": "debug",
        },
      ]
    `);
    });
  });
});
