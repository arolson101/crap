import { DateTime } from 'luxon'

interface MakeDateParams {
  year?: number
  month?: number // 0-11
  day?: number
}

export const makeDate = ({ year, month, day }: MakeDateParams): Date => {
  if (year === undefined) { throw new Error('year is not set') }
  if (month === undefined) { throw new Error('month is not set') }
  if (day === undefined) { throw new Error('day is not set') }

  // set to 12pm UTC so that date is the same in all timezones
  return DateTime.utc(year, month + 1, day, 12).toJSDate()
}

export const formatDate = (date: Date): string => {
  return DateTime.fromJSDate(date).toLocaleString()
}

export const standardizeDate = (date: Date): Date => {
  const value = makeDate({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  })
  return value
}
