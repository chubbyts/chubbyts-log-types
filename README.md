# chubbyts-log-types

[![CI](https://github.com/chubbyts/chubbyts-log-types/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-log-types/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-log-types/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-log-types?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fchubbyts%2Fchubbyts-log-types%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-log-types/master)
[![npm-version](https://img.shields.io/npm/v/@chubbyts/chubbyts-log-types.svg)](https://www.npmjs.com/package/@chubbyts/chubbyts-log-types)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-log-types&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-log-types)

## Description

Log (logger) types, [PSR-3][2] inspired.

The package ships only types and a tiny `createLogger` helper, so libraries can depend on a logger contract
without depending on a concrete logging implementation.

## Requirements

 * node: >=22

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-log-types][1].

```sh
npm i @chubbyts/chubbyts-log-types@^3.4.1
```

## Usage

### Types

```ts
import type {
  Context,
  LogFn,
  Logger,
  LogLevel,
  NamedLogFn,
} from '@chubbyts/chubbyts-log-types/log';
```

```ts
type LogLevel =
  | 'emergency'
  | 'alert'
  | 'critical'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug';

type Context = Record<string, unknown>;

type LogFn = (level: LogLevel, message: string, context: Context) => void;
type NamedLogFn = (message: string, context: Context) => void;

// one NamedLogFn per LogLevel, plus the generic log function
type Logger = Record<LogLevel, NamedLogFn> & { log: LogFn };
```

### Create a logger

`createLogger` takes a single `LogFn` and derives all level-specific methods from it.

```ts
import { createLogger } from '@chubbyts/chubbyts-log-types/log';

const logger = createLogger((level, message, context) => {
  const datetime = new Date().toISOString();

  console.log(JSON.stringify({ datetime, level, message, context }));
});

logger.info('User logged in', { userId: 'a1b2c3' });
logger.error('Payment failed', { orderId: 42, reason: 'card declined' });
logger.log('warning', 'Disk space low', { freeBytes: 1_024 });
```

### Null logger

Without an argument `createLogger` returns a logger that discards every message,
which is handy as a default or within tests.

```ts
import { createLogger } from '@chubbyts/chubbyts-log-types/log';

const logger = createLogger();

logger.debug('This goes nowhere', {});
```

### Depend on the type

Accept a `Logger` instead of a concrete implementation.

```ts
import type { Logger } from '@chubbyts/chubbyts-log-types/log';
import { createLogger } from '@chubbyts/chubbyts-log-types/log';

export const createUserService = (logger: Logger = createLogger()) => ({
  delete: (id: string) => {
    logger.notice('User deleted', { id });
  },
});
```

### Filter by level

```ts
import type { LogFn, LogLevel } from '@chubbyts/chubbyts-log-types/log';
import { createLogger } from '@chubbyts/chubbyts-log-types/log';

// ordered from most to least severe
const levels: Array<LogLevel> = [
  'emergency',
  'alert',
  'critical',
  'error',
  'warning',
  'notice',
  'info',
  'debug',
];

const createMinLevelLogFn =
  (minLevel: LogLevel, log: LogFn): LogFn =>
  (level, message, context) => {
    if (levels.indexOf(level) <= levels.indexOf(minLevel)) {
      log(level, message, context);
    }
  };

const logger = createLogger(
  createMinLevelLogFn('warning', (level, message, context) => {
    console.log(level, message, context);
  }),
);

logger.error('Shown', {});
logger.info('Suppressed', {});
```

## Copyright

2026 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-log-types
[2]: https://www.php-fig.org/psr/PSR-3
