import crypto from 'crypto'

// Chave secreta e IV (em produção, armazene via variável de ambiente)
const SECRET_KEY = crypto.randomBytes(32) // 32 bytes = 256 bits
const IV_LENGTH = 16 // AES usa IV de 16 bytes

// Tipagem do resultado de criptografia
interface EncryptedEmail {
  iv: string
  data: string
}

/**
 * Criptografa um e-mail com AES-256-CBC
 * @param email string - e-mail a ser criptografado
 * @returns EncryptedEmail - objeto contendo dados criptografados e IV
 */
export function criptografarEmail(email: string): EncryptedEmail {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv)

  let encrypted = cipher.update(email, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return {
    iv: iv.toString('hex'),
    data: encrypted
  }
}

/**
 * Descriptografa um e-mail
 * @param encrypted EncryptedEmail - objeto com dados e IV
 * @returns string - e-mail original
 */
export function descriptografarEmail(encrypted: EncryptedEmail): string {
  const iv = Buffer.from(encrypted.iv, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, iv)

  let decrypted = decipher.update(encrypted.data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
// import { criptografarEmail, descriptografarEmail } from './emailEncryptor';

// const email = 'usuario@dominio.com';

// const encrypted = criptografarEmail(email);
// console.log('Criptografado:', encrypted);

// const decrypted = descriptografarEmail(encrypted);
// console.log('Descriptografado:', decrypted);

// const SECRET_KEY = Buffer.from(process.env.SECRET_KEY!, 'hex')

// console.log(crypto.randomBytes(32).toString('hex'))
