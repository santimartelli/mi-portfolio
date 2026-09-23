import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { fileURLToPath } from 'node:url';

/*
 * El servidor de desarrollo no recarga tailwind.config.mjs: la integracion lee
 * la config una sola vez al arrancar y no vuelve a mirarla, asi que un cambio
 * de tema (escala tipografica, colores, animaciones) se queda invisible hasta
 * reiniciar el servicio a mano. Se comprobo tocando el archivo y sirviendo
 * todavia el valor viejo, incluso recien arrancado.
 *
 * Este plugin lo vigila y reinicia el servidor el solo. Solo actua en
 * desarrollo (`apply: 'serve'`), asi que no toca el build.
 */
const watchTailwindConfig = () => ({
  name: 'watch-tailwind-config',
  apply: 'serve',
  configureServer(server) {
    const configPath = fileURLToPath(new URL('./tailwind.config.mjs', import.meta.url));
    server.watcher.add(configPath);
    server.watcher.on('change', (file) => {
      if (file !== configPath) return;
      server.config.logger.info('tailwind.config.mjs cambio: reiniciando el servidor', {
        timestamp: true,
      });
      server.restart();
    });
  },
});

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [tailwind(), react()],
  vite: {
    plugins: [watchTailwindConfig()],
  },
});
