import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

function mockPingApi(): Plugin {
  return {
    name: "mock-ping-api",
    configureServer(server) {
      server.middlewares.use("/api/ping", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }

        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          res.setHeader("Content-Type", "application/json");

          const data = JSON.parse(body || "{}");
          if (data.uuid === "fail") {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Server error" }));
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true, received: data }));
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockPingApi()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
