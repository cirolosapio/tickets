import type { EventResponse, Eventt } from '~~/types'

const SEGMENT_MUSIC = 'KZFzniwnSyZfZ7v7nJ'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  params.locale = 'it-it,it,*'
  params.segmentId = SEGMENT_MUSIC

  const data = await client(event)<EventResponse>('events.json', { params })

  const events = data._embedded?.events.reduce((acc, { url, ticketLimit, promoter, promoters, test, type, ...event }) => {
    if (type !== 'event') console.log({ type })
    if (test) return acc
    acc.push(event)
    return acc
  }, [] as Omit<Eventt, | 'test' | 'type' | 'promoter' | 'ticketLimit' | 'promoters' | 'url'>[]) ?? []

  return {
    pagination: data.page,
    rows: events
  }
})
