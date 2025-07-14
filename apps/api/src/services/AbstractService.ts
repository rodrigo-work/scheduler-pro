export abstract class AbstractService {
  protected readonly clientId: string
  protected readonly clientSecret: string
  protected readonly userPoolId: string

  constructor() {
    this.clientId = process.env.COGNITO_CLIENT_ID!
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET!
    this.userPoolId = process.env.COGNITO_USER_POOL_ID!
  }
}
