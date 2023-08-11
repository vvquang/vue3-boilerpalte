/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_API_ENDPOINT_URL: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
