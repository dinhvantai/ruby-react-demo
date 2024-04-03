/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VITE_API_HOST: string,
  readonly VITE_VITE_WEBSOCKET_HOST: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
