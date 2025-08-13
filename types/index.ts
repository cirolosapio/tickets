export interface Attraction {
  id: string
  name: string
  type: 'attraction'
  test: boolean
  url: string
  aliases: string
  locale: string
  images: Image[]
  classifications: Classification[]
  upcomingEvents: {
    tmr: number
    ticketmaster: number
    _total: number
    _filtered: number
  }
  _links: Links
  externalLinks?: Record<
    'youtube' | 'twitter' | 'itunes' | 'instagram' | 'homepage',
    Array<{
      url: string
      type: string
    }>
  >
}

export interface AttractionResponse {
  _embedded?: {
    attractions: Attraction[]
  }
  _links: Links
  page: Pagination
}

interface Pagination {
  size: number
  totalElements: number
  totalPages: number
  number: number
}

export interface EventResponse {
  _embedded: {
    events: Eventt[]
  }
  _links: Links
  page: Pagination
}

export interface Eventt {
  id: string
  name: string
  description?: string
  type: 'event'
  test: boolean
  url: string
  locale: string
  images: Image[]
  sales: {
    public: {
      startDateTime: string
      endDateTime: string
      startTBD: boolean
      startTBA: boolean
    }
  }
  dates: {
    start: {
      localDate: string
      localTime: string
      dateTime: string
      dateTBD: boolean
      dateTBA: boolean
      timeTBA: boolean
      noSpecificTime: boolean
    }
    timezone: string
    status: { code: 'onsale' }
    spanMultipleDays: boolean
  }
  seatmap: {
    staticUrl: string
    id: 'seatmap'
  }
  ticketLimit: { id: 'ticketLimit' }
  ageRestrictions: {
    legalAgeEnforced: boolean
    id: 'ageRestrictions'
  }
  ticketing: {
    safefTix: { enabled: boolean }
    allInclusivePricing: { enabled: boolean }
    id: 'ticketing'
  }
  accessibility: { ticketLimit: number, id: 'accessibility' }
  promoter: Promoter
  promoters: Promoter[]
  classifications: Classification[]
  _embedded?: {
    attractions?: Attraction[]
    venues: Venue[]
  }
  _links: Links
}

interface Promoter {
  id: string
}

interface Classification {
  primary: boolean
  segment: {
    id: string
    name: string
  }
  genre: {
    id: string
    name: string
  }
  subGenre: {
    id: string
    name: string
  }
  type: {
    id: string
    name: string
  }
  subType: {
    id: string
    name: string
  }
  family: boolean
}

export interface Venue {
  id: string
  name: string
  type: string
  test: boolean
  url: string
  images?: Image[]
  locale: string
  postalCode: string
  timezone: string
  city: {
    name: string
  }
  state?: {
    name: string
    stateCode: string
  }
  country: {
    name: string
    countryCode: string
  }
  address?: {
    line1: string
    line2?: string
    line3?: string
  }
  location: {
    longitude: string
    latitude: string
  }
  markets?: {
    name: string
    id: string
  }[]
  dmas: { id: string }[]
  upcomingEvents: {
    archtics: number,
    tmr: number,
    ticketmaster: number,
    _total: number,
    _filtered: number
  }
  boxOfficeInfo?: {
    phoneNumberDetail: string
    openHoursDetail: string
    acceptedPaymentDetail: string
    willCallDetail: string
  }
  parkingDetail?: string
  accessibleSeatingDetail?: string
  generalInfo?: {
    generalRule: string
    childRule: string
  }
  social?: {
    twitter: { handle: string }
  }
  ada?: {
    adaPhones: string
    adaCustomCopy: string
    adaHours: string
  }
  _links: { self: { href: string } }
}

export interface Image {
  ratio: '16_9' | '3_2' | '4_3' | '1_1'
  url: string
  width: number
  height: number
  fallback: boolean
}

interface Links {
  first?: { href: string }
  next?: { href: string }
  last?: { href: string }
  self: { href: string }
  // attractions: Attraction[]
  // venues: Venue[]
}

export interface ClassificationResponse {
  _embedded: {
    classifications: {
      family: boolean
      _links: { self: { href: string } }
      type: {
        id: string
        name: string
        locale: string
        primaryId: string
        _links: { self: { href: string } }
        _embedded: {
          subtypes: {
            id: string
            name: string
            locale: string
            _links: { self: { href: string } }
          }[]
        }
      }
      segment?: {
        id: string
        name: string
        locale: string
        primaryId: string
        _links: { self: { href: string } }
        _embedded: {
          genres: {
            id: string
            name: string
            locale: string
            _links: { self: { href: string } }
            _embedded: {
              subgenres: {
                id: string
                name: string
                locale: string
                _links: { self: { href: string } }
              }[]
            }
          }[]
        }
      }
    }[]
  }
  _links: Links
  page: Pagination
}

export interface VenueResponse {
  _embedded: {
    venues: Venue[]
  }
  _links: Links
  page: Pagination
}