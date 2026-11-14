import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const serverDirectory = resolve(appDirectory, "..", "edu-tech-server");
const apiOrigin = new URL(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
).origin;
const webOrigin = new URL(
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
).origin;

let server;
let web;
let shuttingDown = false;
let serverFailed = false;

function stopChildren() {
  shuttingDown = true;
  server?.kill();
  web?.kill();
}

process.once("SIGINT", stopChildren);
process.once("SIGTERM", stopChildren);

async function isApiReady() {
  try {
    const response = await fetch(apiOrigin, {
      signal: AbortSignal.timeout(1_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function isWebReady() {
  try {
    const response = await fetch(webOrigin, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    return (await response.text()).includes("EduTech Impact");
  } catch {
    return false;
  }
}

async function startApi() {
  if (await isApiReady()) {
    console.log("Using the already-running EduTech API server.");
    return;
  }

  server = spawn(process.execPath, ["index.js"], {
    cwd: serverDirectory,
    stdio: "inherit",
  });

  server.once("error", (error) => {
    serverFailed = true;
    console.error("Unable to start the EduTech API server:", error.message);
    process.exitCode = 1;
  });

  server.once("exit", (code) => {
    if (!web && !shuttingDown) serverFailed = true;
    if (!shuttingDown && web) {
      console.error("The EduTech API server stopped unexpectedly.");
      web.kill();
      process.exitCode = code || 1;
    }
  });

  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    if (serverFailed) {
      throw new Error("The API server failed to start.");
    }

    if (server.exitCode !== null || server.signalCode !== null) {
      throw new Error("The API server stopped before it became ready.");
    }

    if (await isApiReady()) return;

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
  }

  throw new Error(
    `The API did not become ready at ${apiOrigin} within 60 seconds.`,
  );
}

try {
  await startApi();
  if (await isWebReady()) {
    console.log("The EduTech website is already running at", webOrigin);
    if (server) {
      console.log("The API server is running in this process.");
    }
  } else {
    console.log("EduTech API is ready. Starting the Next.js app.");

    web = spawn(
      process.execPath,
      [
        resolve(appDirectory, "node_modules", "next", "dist", "bin", "next"),
        "dev",
      ],
      { cwd: appDirectory, stdio: "inherit" },
    );

    web.once("error", (error) => {
      console.error("Unable to start the Next.js app:", error.message);
      process.exitCode = 1;
      stopChildren();
    });

    web.once("exit", (code) => {
      shuttingDown = true;
      server?.kill();
      process.exitCode = code ?? 0;
    });
  }
} catch (error) {
  console.error(error.message);
  stopChildren();
  process.exitCode = 1;
}
