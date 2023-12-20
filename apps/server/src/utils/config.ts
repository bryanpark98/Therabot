export default {
  port: process.env.PORT || 3000,
  notionRedirectUrl:
    process.env.NOTION_REDIRECT_URL ||
    "http://localhost:3000/notion/registration",
  notionClientId:
    process.env.NOTION_CLIENT_ID || "f193a33f-4624-4f80-8245-94a31b138352",
  notionClientSecret:
    process.env.NOTION_CLIENT_SECRET ||
    "secret_ZZz0sncarBLzu6bi9b6ruayiH88F5YAwvOc5utvJ1f",
  baseUrl: "https://therabot-6f55c2bb2df3.herokuapp.com",
};
