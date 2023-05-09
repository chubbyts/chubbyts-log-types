export enum LogLevel {
  EMERGENCY = 'emergency',
  ALERT = 'alert',
  CRITICAL = 'critical',
  ERROR = 'error',
  WARNING = 'warning',
  NOTICE = 'notice',
  INFO = 'info',
  DEBUG = 'debug',
}

export type Context = Record<string, unknown>;

export type NamedLogFn = (message: string, context: Context) => void;
export type LogFn = (level: LogLevel, message: string, context: Context) => void;

export type Logger = {
  emergency: NamedLogFn;
  alert: NamedLogFn;
  critical: NamedLogFn;
  error: NamedLogFn;
  warning: NamedLogFn;
  notice: NamedLogFn;
  info: NamedLogFn;
  debug: NamedLogFn;
  log: LogFn;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const createLogger = (log: LogFn = () => {}): Logger => {
  const emergency = (message: string, context: Context) => {
    log(LogLevel.EMERGENCY, message, context);
  };

  const alert = (message: string, context: Context) => {
    log(LogLevel.ALERT, message, context);
  };

  const critical = (message: string, context: Context) => {
    log(LogLevel.CRITICAL, message, context);
  };

  const error = (message: string, context: Context) => {
    log(LogLevel.ERROR, message, context);
  };

  const warning = (message: string, context: Context) => {
    log(LogLevel.WARNING, message, context);
  };

  const notice = (message: string, context: Context) => {
    log(LogLevel.NOTICE, message, context);
  };

  const info = (message: string, context: Context) => {
    log(LogLevel.INFO, message, context);
  };

  const debug = (message: string, context: Context) => {
    log(LogLevel.DEBUG, message, context);
  };

  return {
    emergency,
    alert,
    critical,
    error,
    warning,
    notice,
    info,
    debug,
    log,
  };
};
