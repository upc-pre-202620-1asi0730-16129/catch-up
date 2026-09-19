import {SourceAssembler} from "@/news/infrastructure/source.assembler.js";
import {Article} from "@/news/domain/model/article.entity.js";

export class ArticleAssembler {
    #source;
    #sourceAssembler;

    constructor(source = null) {
        this.#source = source;
        this.#sourceAssembler = new SourceAssembler();
    }

    toEntitiesFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error('Error fetching articles:', response.data);
            return [];
        }
        const articlesResponse = response.data;
        return articlesResponse["articles"].map((article) => {
            try {
                return this.toEntityFromResource(article);
            } catch (error) {
                console.error('Error converting article to entity:', error);
                return null;
            }
        }).filter((article) => article !== null);
    }

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