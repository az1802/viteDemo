/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly MODE: "development" | "production";
  readonly BASE_URL: string;
  PROD: boolean;
  SSR: boolean;
  DEV: boolean;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
