module.exports = {
    name: 'Desafio-B2W',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || "http://localhost:3000",
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://mongo/desafio-b2w',
    },
    page: 1,
    per_page: 10,
}