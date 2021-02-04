module.exports = {
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/auth/github',
        destination: 'http://server:5000/auth/github',
      },
      {
        source: '/logout',
        destination: 'http://server:5000/logout',        
      }
    ] : []
  },
}