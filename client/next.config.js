module.exports = {
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/auth/:path',
        destination: 'http://server:5000/auth/:path',
      },
      {
        source: '/logout',
        destination: 'http://server:5000/logout',        
      }
    ] : [
      {
        source: '/auth/:path',
        destination: 'https://timestamped-notes-server.felixtan.me/auth/:path',
      },
      {
        source: '/logout',
        destination: 'https://timestamped-notes-server.felixtan.me/logout',        
      }
    ]
  },
}