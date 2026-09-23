/**
 * Source data structure as returned by the NewsAPI.
 *
 * @typedef {Object} SourceResource
 * @property {string} [id] - The unique identifier for the source.
 * @property {string} [name] - The name of the source.
 * @property {string} [description] - A description of the source.
 * @property {string} [url] - The website URL of the source.
 * @property {string} [category] - The category of the source.
 * @property {string} [language] - The language the source is written in.
 * @property {string} [country] - The country the source originates from.
 */

/**
 * API response structure for news sources.
 *
 * @typedef {Object} SourcesResponse
 * @property {string} status - The status of the response ('ok' or 'error').
 * @property {SourceResource[]} sources - The list of sources returned.
 */

/**
 * Article data structure as returned by the NewsAPI.
 *
 * @typedef {Object} ArticleResource
 * @property {string} [title] - The title of the article.
 * @property {string} [description] - The description or summary of the article.
 * @property {string} [url] - The URL to the article.
 * @property {string} [urlToImage] - The URL to the article's image.
 * @property {string} [publishedAt] - The ISO 8601 timestamp of publication.
 * @property {SourceResource} [source] - The source of the article.
 */

/**
 * API response structure for news articles.
 *
 * @typedef {Object} ArticlesResponse
 * @property {string} status - The status of the response ('ok' or 'error').
 * @property {ArticleResource[]} articles - The list of articles returned.
 */

export {}
