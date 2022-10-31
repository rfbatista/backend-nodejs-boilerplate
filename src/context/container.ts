import { config as appConfig } from "@infrastructure/config/index";
import { Logger } from "@infrastructure/Logger";
import { Router } from "express";

export type GraphqlResolverHook = (arg: any) => void
export type GraphqlSchemaHook = (arg: any) => void

type ApplicationHooks = {
  addGraphqlResolver: Function;
  addGrapqlSchema: Function;
  apiRouter: Router;
};

export type ModuleContext = {
  onReady: (fn: () => Promise<void>) => void;
  onDisposing: (fn: () => Promise<void>) => void;
  logger: typeof Logger;
  config: typeof appConfig;
  hooks: Map<keyof ApplicationHooks, Function>;
  registerHook: (name: keyof ApplicationHooks, fn: Function) => void;
}

type MakeModuleCallback = ModuleContext & {
  build: (fn: (context: ModuleContext) => Promise<void>) => Promise<void>;
};


type Module = {
  name: string;
  fn: (data: MakeModuleCallback) => Promise<void>;
};

type MakeModule = (
  name: string,
  fn: (data: MakeModuleCallback) => Promise<void>
) => { name: string; fn: (data: MakeModuleCallback) => Promise<void> };

type Bootstrap = (modules: Module[]) => Promise<void>;

const { makeModule, bootstrap } = ((
  logger: Logger,
  config: typeof appConfig
): { makeModule: MakeModule; bootstrap: Bootstrap } => {
  const onReadyHook: (() => Promise<void>)[] = [];
  const onDisposingHook: (() => Promise<void>)[] = [];

  const onReady = (fn: () => Promise<void>): void => {
    onReadyHook.push(fn);
  };

  const onDisposing = (fn: () => Promise<void>): void => {
    onDisposingHook.push(fn);
  };

  const makeModule = (
    name: string,
    fn: (data: MakeModuleCallback) => Promise<void>
  ): Module => {
    return {
      name,
      fn,
    };
  };

  const stop = async () => {
    const promises: Promise<unknown>[] = [];
    for (const hook of onDisposingHook) promises.push(hook());
    await Promise.all(promises);
  };

  const shutdown = (code) => async () => {
    process.stdout.write("\n");
    setTimeout(() => {
      Logger.error("Ok, my patience is over! #ragequit");
      process.exit(code);
    }, 10000).unref();
    await stop();
    process.exit(code);
  };

  const hooks = new Map<keyof ApplicationHooks, Function>();

  const registerHook = (name: keyof ApplicationHooks, fn: Function) => {
    hooks.set(name, fn);
  };

  let context = {
    onReady,
    onDisposing,
    logger,
    config,
    hooks,
    registerHook,
  };

  const build = (resolveFn) => {
    // eslint-disable-next-line no-use-before-define
    return resolveFn(context);
  };

  const bootstrap: Bootstrap = async (modules: Module[]): Promise<void> => {
    let module;
    try {
      for (module of modules) {
        Logger.info(`Bootstraping ${module.name} module`);
        await module.fn({
          ...context,
          build,
        });
      }
    } catch (error) {
      Logger.error(`Error bootstraping module ${module?.name || ""}`, error);
      return;
    }
    onReadyHook.forEach((hook) => {
      hook()
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    });
    process.on("SIGTERM", shutdown(0));
    process.on("SIGINT", shutdown(0));
    process.on("uncaughtException", shutdown(1));
    process.on("unhandledRejection", shutdown(1));
  };

  return {
    makeModule,
    bootstrap,
  };
})(Logger, appConfig);

export { makeModule, bootstrap };
