export default defineOAuthGoogleEventHandler({
  async onSuccess (event, { user: googleUser }) {
    console.log('--- ~ onSuccess ~ googleUser:', googleUser)
    const db = useDrizzle()
    const session = await getUserSession(event)

    let user = await db.query.users.findFirst({
      where: (user, { eq }) => and(eq(user.provider, 'google'), eq(user.providerId, googleUser.sub))
    })
    if (!user) {
      const newUser = await db.insert(tables.users).values({
        id: session.id,
        name: googleUser.name || '',
        email: googleUser.email || '',
        avatar: googleUser.picture || '',
        provider: 'google',
        providerId: googleUser.sub
      }).returning()
      user = newUser[0]
    } else {
      // Assign anonymous chats with session id to user
      // await db.update(tables.chats).set({
      //   userId: user.id
      // }).where(eq(tables.chats.userId, session.id))
    }

    await setUserSession(event, { user })

    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  }
})