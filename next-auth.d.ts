declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenExpiresIn: number
    refreshToken: string
    user: {
      id: string
      name: string
      username: string
      email: string
      image: string
      bio: string
      token: string
      publicRepoCount: number
    }
  }
}
