import { config as AppConfig } from "./config/index";
import { BaseError } from "./error/BaseError";
import os from "os";
import winston from "winston";

export enum LoggerLevel {
  fatal = "fatal",
  error = "error",
  warn = "warn",
  info = "info",
  debug = "debug",
  trace = "trace",
  silent = "silent",
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${String(date.getMonth() + 1)}`.slice(-2);
  const day = `0${String(date.getDate())}`.slice(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const logFormat = (env: string, appName: string) =>
  winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `[${level}] ${formatDate(
      new Date(timestamp)
    )} ${appName}-${env} ${message} `;
    if (metadata) {
      try {
        const meta =
          env === "local"
            ? JSON.stringify(metadata, undefined, 2)
            : JSON.stringify(metadata);
        if (meta !== "{}") msg += `\n ${meta}`;
      } catch (err) {
        console.error("error parsing context in logger");
      }
    }
    return msg;
  });

export class Logger {
  public static fixed: any;
  private static logger: winston.Logger;

  private static getClient(): winston.Logger {
    if (!Logger.logger) {
      let hostname = os.hostname();
      if (AppConfig.logger?.hostname?.prefix) {
        hostname = AppConfig.logger.hostname.prefix + "--" + hostname;
      }

      Logger.logger = winston.createLogger({
        levels: {
          emerg: 0,
          alert: 1,
          crit: 2,
          error: 3,
          warning: 4,
          notice: 5,
          info: 6,
          debug: 7,
        },
        level: AppConfig.logger.level ?? LoggerLevel.debug,
        format: winston.format.combine(
          AppConfig.env === "local" && winston.format.colorize(),
          winston.format.json(),
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          logFormat(AppConfig.env, AppConfig.applicationName)
        ),
        transports: [new winston.transports.Console()],
      });
    }
    return Logger.logger;
  }

  private static make(): winston.Logger {
    return Logger.fixed
      ? Logger.getClient().child(Logger.fixed)
      : Logger.getClient();
  }

  static setFixed(fixed: any): void {
    Logger.fixed = fixed;
  }

  static setLevel(level: LoggerLevel): void {
    Logger.getClient().level = level;
  }

  static trace(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().error(context, message);
  }

  static debug(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().debug(message, context);
  }

  static info(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().info(message, context);
  }

  static warn(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().warn(message, context);
  }

  static error(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().error(message, context);
  }

  static fatal(message: string, context: any = null): void {
    context = Logger.parseContext(context);
    Logger.make().emerg(message, context);
  }

  private static parseContext(context: any) {
    if (context instanceof BaseError) {
      return { context: context.toObject() };
    }

    if (context instanceof Error) {
      return {
        errorFileName: context["fileName"],
        errorLineNumber: context["lineNumber"],
        stack: context["stack"],
      };
    }

    return context;
  }
}
