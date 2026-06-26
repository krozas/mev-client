import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
var root = resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var command = _a.command, mode = _a.mode;
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    var env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), visualizer()],
        server: {
            port: parseInt("9001"),
        },
        base: "/mev-client",
        resolve: {
            alias: {
                "@": root,
                "@components": resolve(root, "components"),
                "@pages": resolve(root, "pages"),
                "@hooks": resolve(root, "hooks"),
                "@api": resolve(root, "api"),
                "@utils": resolve(root, "utils"),
                "@assets": resolve(root, "assets"),
                "@modules": resolve(root, "modules"),
                "@styles": resolve(root, "styles"),
                "@store": resolve(root, "store"),
                "@config": resolve(root, "config"),
            },
        },
    };
});
