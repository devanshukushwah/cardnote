// export const API_URL = "http://localhost:5000"
// export const API_URL = "https://cardnote.herokuapp.com"
export const API_URL = process.env.NODE_ENV == "production" ? "https://cardnote.herokuapp.com" : "http://localhost:5000"
