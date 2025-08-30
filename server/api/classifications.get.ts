import type { TreeItem } from "@nuxt/ui"
import type { ClassificationResponse } from '~~/types'

const SEGMENT_MUSIC = 'KZFzniwnSyZfZ7v7nJ'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  params.locale = 'it-it'

  const data = await client(event)<ClassificationResponse>('classifications.json', { params })

  return data._embedded.classifications.reduce((acc, item) => {
    if (!item.segment || item.segment.id !== SEGMENT_MUSIC) return acc

    item.segment._embedded.genres.forEach(genre => {
      acc.push({
        value: genre.id,
        label: genre.name,
        children: genre._embedded.subgenres.map(subGenre => ({
          value: subGenre.id,
          label: subGenre.name
        }))
      })
    })

    return acc
  }, [] as TreeItem[])
})
