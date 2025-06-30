declare namespace NodeJS {
  interface ProcessEnv {
    TZ: string
    PORT: number
    API_URL: string
    NODE_ENV: 'development' | 'production'
  }
}
