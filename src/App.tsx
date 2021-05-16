import React, { useMemo, useState } from 'react'
import { addMonths, isToday as dateIsToday } from 'date-fns'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight } from './icons'
import { range } from './util'
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type Event = {
  date: Date
  content: string
}

const events: Event[] = [
  {
    date: new Date(2021, 4, 1),
    content: '今日のご飯は焼き肉でした\n今日のご飯は焼き肉でした',
  },
  { date: new Date(2021, 4, 1), content: '今日のご飯は焼き肉でした' },
  { date: new Date(2021, 4, 1), content: '今日のご飯は焼き肉でした' },
  { date: new Date(2021, 4, 1), content: '今日のご飯は焼き肉でした' },
  { date: new Date(2021, 4, 1), content: '今日のご飯は焼き肉でした' },
  { date: new Date(2021, 4, 1), content: '今日のご飯は焼き肉でした' },
]

function Header(props: {
  year: number
  month: number
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}) {
  return (
    <div className="flex py-2 px-4 items-center justify-between">
      <button type="button" onClick={props.onToday}>
        <span className="font-bold text-lg text-gray-800">
          {MONTH_NAMES[props.month]}
        </span>
        <span className="font-normal text-lg ml-1 text-gray-600">
          {props.year}
        </span>
      </button>
      <div className="border rounded-lg px-1" style={{ paddingTop: 2 }}>
        <button
          type="button"
          onClick={props.onPrevMonth}
          className="rounded-lg cursor-pointer leading-none p-1 transition ease-in-out duration-100 inline-flex items-center hover:bg-gray-200"
        >
          <ArrowLeft />
        </button>
        <div className="border-r h-6 inline-flex"></div>
        <button
          type="button"
          onClick={props.onNextMonth}
          className="rounded-lg cursor-pointer leading-none p-1 transition ease-in-out duration-100 inline-flex items-center hover:bg-gray-200"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

function Days() {
  return (
    <div className="border-t border-l flex flex-wrap">
      {DAYS.map((day, i) => (
        <div
          key={i}
          style={{ width: '14.28%', height: 36 }}
          className="border-r py-2 px-2"
        >
          <div className="font-bold text-sm text-center tracking-wide text-gray-600 uppercase">
            {day}
          </div>
        </div>
      ))}
    </div>
  )
}

function Event(props: { title: string }) {
  const eventTheme = {
    blue: 'border-blue-200 text-blue-800 bg-blue-100',
    red: 'border-red-200 text-red-800 bg-red-100',
    yellow: 'border-yellow-200 text-yellow-800 bg-yellow-100',
    green: 'border-green-200 text-green-800 bg-green-100',
    purple: 'border-purple-200 text-purple-800 bg-purple-100',
  }

  const [content] = props.title.split('\n')
  return (
    <div className="mb-1 overflow-hidden">
      <p
        className={clsx(
          'text-9px leading-tight overflow-ellipsis overflow-hidden',
          eventTheme.blue
        )}
      >
        {content}
      </p>
    </div>
  )
}

function App() {
  const [today, setToday] = useState(new Date())
  const month = today.getMonth()
  const year = today.getFullYear()

  const dayOfWeek = new Date(year, month).getDay()
  const topBlankDays = range(dayOfWeek)

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const noOfDays = range(daysInMonth)

  const dayOfLastDate = new Date(year, month + 1, 0).getDay()
  const bottomBlankDays = range(6 - dayOfLastDate)

  const getDateEvents = (date: number) =>
    events.filter(
      (e) =>
        new Date(e.date).toDateString() ===
        new Date(year, month, date).toDateString()
    )

  const onNextMonth = () => {
    setToday((prev) => addMonths(prev, 1))
  }
  const onPrevMonth = () => {
    setToday((prev) => addMonths(prev, -1))
  }
  const onToday = () => {
    setToday(new Date())
  }

  const isToday = (date: number) => {
    return dateIsToday(new Date(year, month, date))
  }

  return (
    <div className="h-screen bg-gray-100 antialiased sans-serif">
      <div className="container mx-auto md:py-24">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Header
            year={year}
            month={month}
            onNextMonth={onNextMonth}
            onPrevMonth={onPrevMonth}
            onToday={onToday}
          />
          <div>
            <Days />
            <div className="border-t flex flex-wrap">
              {topBlankDays.map((d) => (
                <div
                  key={d}
                  style={{ width: '14.28%' }}
                  className="border-r border-b text-center px-4 pt-2"
                />
              ))}
              {noOfDays.map((date) => (
                <div
                  key={date}
                  style={{ width: '14.28%' }}
                  className="border-r border-b pt-1 relative"
                >
                  <div
                    className={clsx(
                      'rounded-full cursor-pointer text-xs h-5 w-5 text-center leading-none transition ease-in-out duration-100 inline-flex items-center justify-center',
                      {
                        'bg-blue-500 text-white': isToday(date),
                        'text-gray-700 hover:bg-blue-200': !isToday(date),
                      }
                    )}
                  >
                    {date}
                  </div>
                  <div className="mt-1 min-h-10 max-h-50 overflow-y-auto">
                    {getDateEvents(date).map((event, i) => (
                      <Event key={i} title={event.content} />
                    ))}
                  </div>
                </div>
              ))}
              {bottomBlankDays.map((d) => (
                <div
                  key={d}
                  style={{ width: '14.28%' }}
                  className="border-r border-b text-center px-4 pt-2"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
