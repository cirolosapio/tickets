import { createFetch } from 'ofetch'
import type { H3Event, EventHandlerRequest } from 'h3'

export default function (event: H3Event<EventHandlerRequest>) {
  const { ticketmaster } = useRuntimeConfig(event)

  return createFetch({
    defaults: {
      baseURL: ticketmaster.baseUrl,
      params: {
        apikey: ticketmaster.apiKey
      }
    }
  })
} 