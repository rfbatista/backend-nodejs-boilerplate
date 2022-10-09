import "reflect-metadata";
import "module-alias/register";
import "./context/module-alias";

import("@context/startup").then(({ startup }) => {
  startup().catch((error) => {
    console.error(error);
    if (process.env.NODE_ENV === "production") {
      process.kill(process.pid, "SIGTERM");
    }
  });
});
