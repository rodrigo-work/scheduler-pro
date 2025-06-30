import { format, toZonedTime } from 'date-fns-tz'

function formatarDataParaBrasil(data: Date = new Date()): string {
  const timeZone = 'America/Sao_Paulo'

  const dataBrasileira = toZonedTime(data, timeZone)

  // const formato = 'dd/MM/yyyy HH:mm:ss'
  const formato = 'dd/MM/yyyy HH:mm:ss'
  return format(dataBrasileira, formato, { timeZone })
}

export function formatDate(value: any, type?: any) {
  switch (type?.toLowerCase()) {
    case 'in':
      return 'Começando a semana!'
    case 'terça':
      return 'Terça-feira produtiva!'
    case 'out':
      return formatarDataParaBrasil(value)

    case 'quinta':
      return 'Quase lá!'
    case 'sexta':
      return 'Sextou!'
    case 'sábado':
      return 'Dia de descanso!'
    case 'domingo':
      return 'Prepare-se para a semana.'
    default:
      return formatarDataParaBrasil(value)
      return 'Prepare-se para a semana.'
  }

  // return formatarDataParaBrasil(value)
}
