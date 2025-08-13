import client from "../client"
import type { Attraction, AttractionResponse } from '~~/types'

const SEGMENT_MUSIC = 'KZFzniwnSyZfZ7v7nJ'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  params.locale = 'it-it'
  params.segmentId = SEGMENT_MUSIC

  const data = await client(event)<AttractionResponse>('attractions.json', { params })

  const attractions = data._embedded?.attractions.reduce((acc, { test, type, aliases, _links, url, upcomingEvents, externalLinks, ...attraction }) => {
    if (type !== 'attraction') console.log({ type })
    if (test) return acc
    acc.push(attraction)
    return acc
  }, [] as Omit<Attraction, 'upcomingEvents' | 'externalLinks' | '_links' | 'test' | 'type' | 'url' | 'aliases'>[]) ?? []

  return {
    pagination: data.page,
    rows: attractions
  }
})
