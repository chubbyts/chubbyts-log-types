export type LogLevel = 'emergency' | 'alert' | 'critical' | 'error' | 'warning' | 'notice' | 'info' | 'debug';

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

export const createLogger = (log: LogFn = () => {}): Logger => {
  const emergency = (message: string, context: Context) => {
    log('emergency', message, context);
  };

  const alert = (message: string, context: Context) => {
    log('alert', message, context);
  };

  const critical = (message: string, context: Context) => {
    log('critical', message, context);
  };

  const error = (message: string, context: Context) => {
    log('error', message, context);
  };

  const warning = (message: string, context: Context) => {
    log('warning', message, context);
  };

  const notice = (message: string, context: Context) => {
    log('notice', message, context);
  };

  const info = (message: string, context: Context) => {
    log('info', message, context);
  };

  const debug = (message: string, context: Context) => {
    log('debug', message, context);
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
