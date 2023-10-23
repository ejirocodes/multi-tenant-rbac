import { env } from "./config/env";
import { logger } from "./util/logger";
import { buildServer } from "./util/server";

async function gracefulShutDown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}

async function main() {
  const app = await buildServer();

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;

  for await (const signal of signals) {
    logger.info({ signal }, "Signal received");
    process.on(signal, async () => {
      gracefulShutDown({ app });
    });
  }
}

main();
