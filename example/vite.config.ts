import reactRefresh from "@vitejs/plugin-react-refresh"
import {defineConfig} from "vite"

export default defineConfig({
    esbuild: {
        // eslint-disable-next-line quotes
        jsxInject: 'import React from "react"',
    },
    plugins: [reactRefresh()],
})
