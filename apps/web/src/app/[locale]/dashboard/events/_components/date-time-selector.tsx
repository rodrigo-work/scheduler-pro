'use client'

import { Button } from '@repo/design-system/components/ui/button'
import { Calendar } from '@repo/design-system/components/ui/calendar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/design-system/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/design-system/components/ui/select'
import { Dictionary, languages } from '@repo/internationalization'
import { useState } from 'react'
// import { type DateRange } from "react-day-picker"
import { enUS, es, ptBR, zhCN } from 'react-day-picker/locale'

type DateTimeSelectorProps = {
  dictionary: Dictionary

  date: Date | undefined
  selectedTime: string | null
  onDateChange: (date: Date | undefined) => void
  onTimeSelect: (time: string) => void
  onChange: (value: string) => void // field.onChange
  bookedDates?: Date[]
  timeSlots?: string[]
}

const bookedDates = Array.from(
  { length: 3 },
  (_, i) => new Date(2025, 5, 17 + i)
)

const timeSlots = Array.from({ length: 37 }, (_, i) => {
  const totalMinutes = i * 15 // Changed to 15 minutes for more frequent slots
  const hour = Math.floor(totalMinutes / 60) + 9
  const minute = totalMinutes % 60
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
})

export function DateTimeSelector({
  dictionary,
  date,
  selectedTime,
  onDateChange,
  onTimeSelect,
  onChange
}: DateTimeSelectorProps) {
  const [locale, setLocale] = useState<string>(dictionary.global.locale)

  const handleSelectTime = (time: string) => {
    onTimeSelect(time)
    if (date) {
      const [hours, minutes] = time.split(':').map(Number)
      const fullDate = new Date(date)
      fullDate.setHours(hours)
      fullDate.setMinutes(minutes)
      fullDate.setSeconds(0)
      fullDate.setMilliseconds(0)

      onChange(fullDate.toISOString())
    }
  }

  return (
    <Card className="md:w-[500px]-- w-full gap-0 p-8">
      <CardHeader className="border-b">
        <CardTitle>{dictionary.components.dateTimeSelector.title}</CardTitle>
        <CardDescription>
          {dictionary.components.dateTimeSelector.description}
        </CardDescription>
        <CardAction>
          <Select
            value={locale}
            onValueChange={(value) =>
              // setLocale(value as keyof typeof localizedStrings)
              setLocale(value as string)
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent align="end">
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {`${language.icon} ${language.label} (${language.locale})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="relative p-0 md:pr-48">
        <div className="p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            defaultMonth={date}
            disabled={bookedDates}
            // disabled={{
            //   before: new Date(2025, 5, 12)
            // }}
            showOutsideDays={false}
            modifiers={{ booked: bookedDates }}
            modifiersClassNames={{
              booked: '[&>button]:line-through opacity-100'
            }}
            // className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            locale={
              locale === 'es'
                ? es
                : locale === 'zh'
                  ? zhCN
                  : locale === 'pt'
                    ? ptBR
                    : locale === 'en'
                      ? enUS
                      : enUS // Fallback to enUS if locale is not recognized
            }
            // formatters={{
            //   formatWeekdayName: (date) =>
            //     date.toLocaleString('en-US', { weekday: 'short' })
            // }}
          />
        </div>
        <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-l md:border-t-0">
          <div className="grid gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => handleSelectTime(time)}
                className="w-full shadow-none"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t !py-5 px-6 md:flex-row">
        <div className="text-sm">
          {date && selectedTime ? (
            <>
              Your meeting is booked for{' '}
              <span className="font-medium">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </span>{' '}
              at <span className="font-medium">{selectedTime}</span>.
            </>
          ) : (
            <>Select a date and time for your meeting.</>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
