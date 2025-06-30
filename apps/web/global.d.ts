declare namespace NodeJS {
  interface ProcessEnv {
    TZ: string
    PORT: number
    NODE_ENV: 'development' | 'production'

    NEXT_PUBLIC_API_URL: string
  }
}
