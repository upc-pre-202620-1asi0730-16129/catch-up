
import {SourceAssembler} from "@/news/infrastructure/source.assembler.js";
import {Article} from "@/news/domain/model/article.entity.js";
import "@/news/infrastructure/news-resources.js";

/**
 * Infrastructure service that maps article data from API responses into Domain Entities.
 *
 * @remarks
 * Following DDD patterns, this assembler acts as a Data Mapper between the
 * infrastructure-specific article format and the Article domain entity.
 */
export class ArticleAssembler {
    #source;
    #sourceAssembler;

    /**
     * Initializes the ArticleAssembler.
     *
     * @param {import('@/news/domain/model/source.entity.js').Source | null} [source=null] - An optional Source entity to associate with assembled articles.
     */
    constructor(source = null) {
        this.#source = source;
        this.#sourceAssembler = new SourceAssembler();
    }

    /**
     * Maps a full Axios response containing article resources into an array of Article entities.
     *
     * @param {import('axios').AxiosResponse<ArticlesResponse>} response - The HTTP response from the news provider.
     * @returns {Article[]} An array of Article domain entities. Returns an empty array if the status is not 'ok'.
     */
    toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.data["status"]},  ${response.data["code"]}, ${response.data["message"]}`);
            return [];
        }
        const articlesResponse = response.data;
        return articlesResponse["articles"].map((article) => {
            try {
                return this.toEntityFromResource(article);
            } catch (error) {
                console.error('Validation error for article:', error.message, article);
                return null;
            }
        }).filter(article => article !== null);
    }

    /**
     * Maps a single article resource into an Article domain entity.
     *
     * @param {ArticleResource} resource - The article data as received from the external API.
     * @returns {Article} The assembled Article domain entity.
     */
    toEntityFromResource(resource) {
        let article = new Article({
            ...resource,
            source: resource.source || { name: 'Unknown Source' }
        });
        article.source = this.#source && (this.#source.id === resource.source?.id || this.#source.name === resource.source?.name) 
            ? this.#source 
            : this.#sourceAssembler.toEntityFromResource(resource.source || { id: 'unknown', name: 'Unknown Source' });
        return article;
    }
}
