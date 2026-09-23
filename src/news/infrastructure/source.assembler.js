
import {Source} from "@/news/domain/model/source.entity.js";
import {LogoDevApi} from "@/shared/infrastructure/logo-dev-api.js";
import "@/news/infrastructure/news-resources.js";

/**
 * Infrastructure service that maps source data from API responses into Domain Entities.
 *
 * @remarks
 * Following DDD patterns, this assembler acts as a Data Mapper between the
 * infrastructure-specific source format and the Source domain entity.
 */
export class SourceAssembler {
    #logoApi;

    /**
     * Initializes the SourceAssembler.
     */
    constructor() {
        this.#logoApi = new LogoDevApi();
    }

    /**
     * Maps a full Axios response containing source resources into an array of Source entities.
     *
     * @param {import('axios').AxiosResponse<SourcesResponse>} response - The HTTP response from the news provider.
     * @returns {Source[]} An array of Source domain entities. Returns an empty array if the status is not 'ok'.
     */
    toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.data["status"]},  ${response.data["code"]}, ${response.data["message"]}`);
            return [];
        }
        const sourcesResponse = response.data;
        return sourcesResponse.sources.map((source) => {
            try {
                return this.toEntityFromResource(source);
            } catch (error) {
                console.error('Validation error for source:', error.message, source);
                return null;
            }
        }).filter(source => source !== null);
    }

    /**
     * Maps a single source resource into a Source domain entity, including logo URL resolution.
     *
     * @param {SourceResource} resource - The source data as received from the external API.
     * @returns {Source} The assembled Source domain entity.
     */
    toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = !source.url.isEmpty() ? this.#logoApi.getUrlToLogo(source) : '';
        return source;
    }
}
