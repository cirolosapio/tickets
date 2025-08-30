import type { Venue, VenueResponse } from '~~/types'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  params.locale = 'it-it,it,*'
  params.preferredCountry = 'it'

  const data = await client(event)<VenueResponse>('venues.json', { params })

  const venues = data._embedded?.venues.reduce((acc, { test, url, type, locale, _links, ...venue }) => {
    if (test) return acc
    acc.push(venue)
    return acc
  }, [] as Omit<Venue, 'test' | 'locale' | 'url' | 'type' | '_links'>[]) ?? []

  return {
    pagination: data.page,
    rows: venues
  }
})
