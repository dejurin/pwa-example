import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { type PWAOptions, qwikPwa } from "@qwikdev/pwa";
import deadFile from "vite-plugin-deadfile";
import tsconfigPaths from "vite-tsconfig-paths";
import rehypeExternalLinks from 'rehype-external-links';

const config: PWAOptions | undefined = process.env.CUSTOM_CONFIG === "true"
 ? { config: true }
    : undefined;

export default defineConfig((): UserConfig => {
  return {
    build: {
      chunkSizeWarningLimit: 500,
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    define: {
      // (optional) enables debugging in workbox
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
    plugins: [
      qwikCity({
        mdxPlugins: {
          remarkGfm: false,
          rehypeSyntaxHighlight: false,
          rehypeAutolinkHeadings: false,
        },
        mdx: {
          rehypePlugins: [
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer', 'nofollow'] }],
          ],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
      qwikPwa(config),
      deadFile({
        root: "src",
      }),
    ],
    server: {
      strictPort: true,
      // host: "app.local",
      port: 5173,
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
