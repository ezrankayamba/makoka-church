// Configurations:
// 1. Backend endpoint depending on test vs live
// 2.

const ENVIRON = process.env.NODE_ENV === "development" ? "DEV" : "PROD";

const CONF = {
  DEV: {
    baseUrl: "http://localhost:8000/api",
    ROOT: "http://localhost:8000",
  },
  PROD: {
    baseUrl: "/api",
    ROOT: "",
  },
};

export const BASE_URL = CONF[ENVIRON].baseUrl;
export const ROOT_URL = CONF[ENVIRON].ROOT;
export const GOOGLE_API_KEY = "AIzaSyDQ7WXCqy5-cyHTyho_XLgBDHJZe4n-nAw";
