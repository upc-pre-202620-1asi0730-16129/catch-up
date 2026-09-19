import {LogoDevApi} from "@/shared/infrastructure/logo-dev-api.js";
import {Source} from "@/news/domain/model/source.entity.js";

export class SourceAssembler {
    #logoApi;

    constructor() {
        this.#logoApi = new LogoDevApi();
    }

    toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error("Error in response:", response.data);
            return [];
        }

        const sourcesResponse = response.data;
        return sourcesResponse.sources.map(source => {
            try {
                return this.toEntityFromResource(source);
            } catch (error) {
                console.error("Error converting source to entity:", error);
                return null;
            }
        }).filter(source => source !== null);
    }

    toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = !source.url.isEmpty() ? this.#logoApi.getUrlToLogo(source) : '';
        return source;
    }
}