import axios from "axios";
import {errorInterceptor} from "@/shared/infrastructure/error.interceptor.js";

const newsApi = import.meta.env.VITE_NEWS_API_URL;
const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const sourcesEndpoint = import.meta.env.VITE_SOURCES_ENDPOINT_PATH;
const topHeadlinesEndpoint = import.meta.env.VITE_TOP_HEADLINES_ENDPOINT_PATH;

/**
 * Axios instance configured for the News API.
 *
 * @remarks
 * This instance is pre-configured with the base URL and API key for the News API. It also includes a response interceptor to handle errors globally.
 *
 * @type {axios.AxiosInstance}
 */
const http = axios.create({
    baseURL: newsApi,
    params: {
        apiKey: apiKey
    },
});

// Add a response interceptor to handle errors globally
http.interceptors.response.use(
    errorInterceptor.onResponse,
    errorInterceptor.onError);

export class NewsApi {

    getSources = () => http.get(`${sourcesEndpoint}`);

    getTopHeadlines = (sourceId) => http.get(`${topHeadlinesEndpoint}`, {
            params: { sources: sourceId }
        }
    );

}