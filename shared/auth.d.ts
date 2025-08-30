// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
    avatar: string
    provider: 'google'
    providerId: string
  }
}

export { }