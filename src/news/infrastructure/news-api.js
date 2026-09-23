import axios from "axios";
import "@/news/infrastructure/news-resources.js";
import {errorInterceptor} from "@/shared/infrastructure/error.interceptor.js";

/**
 * Infrastructure adapter for NewsAPI HTTP endpoints.
 *
 * @remarks
 * This class isolates external transport concerns from the application and
 * domain layers.
 */
const newsApi               = import.meta.env.VITE_NEWS_API_URL;
const apiKey                = import.meta.env.VITE_NEWS_API_KEY;
const sourcesEndpoint       = import.meta.env.VITE_SOURCES_ENDPOINT_PATH;
const topHeadlinesEndpoint  = import.meta.env.VITE_TOP_HEADLINES_ENDPOINT_PATH;

/**
 * Axios instance configured for NewsAPI requests.
 *
 * @remarks
 * This instance is configured with the base URL and API key for the NewsAPI.
 *
 * @type {axios.AxiosInstance}
 */
const http = axios.create({
    baseURL: newsApi,
    params: {
        apiKey: apiKey,
    },
})

// Add a response interceptor
http.interceptors.response.use(errorInterceptor.onResponse, errorInterceptor.onError);

/**
 * Infrastructure adapter for interacting with the NewsAPI HTTP service.
 *
 * @remarks
 * This class isolates external transport concerns, providing a clean interface
 * for the application layer to fetch news data.
 */
export class NewsApi {

    /**
     * Retrieves all available news sources from the provider.
     *
     * @returns {Promise<import('axios').AxiosResponse<SourcesResponse>>} A promise resolving to the Axios response containing sources.
     */
    getSources = () => http.get(`${sourcesEndpoint}`);

    /**
     * Retrieves top headlines for a specific news source.
     *
     * @param {string} sourceId - The unique identifier of the news source (e.g., 'cnn').
     * @returns {Promise<import('axios').AxiosResponse<ArticlesResponse>>} A promise resolving to the Axios response containing articles.
     */
    getArticlesForSourceId = sourceId => http.get(`${topHeadlinesEndpoint}`, {params: {sources: sourceId}});

}