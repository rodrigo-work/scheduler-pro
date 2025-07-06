import { ApiError } from '../'

export class ResponseError extends ApiError {
  constructor(message: string, status: number = 498) {
    super(message, status)
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(message, 409)
  }
}

export class PersonalError extends ApiError {
  constructor(message: string, status: number = 498) {
    super(message, status)
  }
}
