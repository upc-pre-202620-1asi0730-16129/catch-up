import {reactive} from "vue";
import {Source} from "@/news/domain/model/source.entity.js";
import {NewsApi} from "@/news/infrastructure/news-api.js";
import {SourceAssembler} from "@/news/infrastructure/source.assembler.js";
import {ArticleAssembler} from "@/news/infrastructure/article.assembler.js";

/**
 * Application state and service orchestrator for news-related operations.
 *
 * @typedef {Object} NewsStore
 * @property {import('@/news/domain/model/source.entity.js').Source[]} sources - List of available news sources.
 * @property {import('@/news/domain/model/article.entity.js').Article[]} articles - List of articles for the current source.
 * @property {Array<string>} errors - List of error messages encountered during operations.
 * @property {import('@/news/domain/model/source.entity.js').Source | null} currentSource - The currently selected news source.
 * @property {(source: import('@/news/domain/model/source.entity.js').Source) => void} setCurrentSource - Sets the current source and triggers article loading.
 * @property {() => void} loadSources - Orchestrates fetching and assembling news sources.
 * @property {() => void} loadArticlesForCurrentSource - Orchestrates fetching and assembling articles for the active source.
 */

const newsApi = new NewsApi();
const sourceAssembler = new SourceAssembler();

/**
 * Reactive application store that coordinates use cases for news management.
 *
 * @remarks
 * In DDD, this serves as an Application Service, managing the interaction
 * between UI components and infrastructure-driven data acquisition.
 *
 * @type {NewsStore}
 */
export const newsStore = reactive({
        sources: [],
        articles: [],
        errors: [],
        currentSource: null,
        /**
         * Sets the active source and triggers article retrieval.
         *
         * @param {Source} source
         * @returns {void}
         */
        setCurrentSource(source) {
            this.currentSource = source;
            this.loadArticlesForCurrentSource();
        },
        /**
         * Loads the source list from the provider and selects the first source.
         *
         * @returns {void}
         */
        loadSources() {
            this.errors = [];
            newsApi.getSources().then(response => {
                this.sources = sourceAssembler.toEntitiesFromResponse(response);
                if (this.sources.length > 0 && !this.currentSource) this.setCurrentSource(this.sources[0]);
            }).catch(message => {
                this.errors.push(message);
                this.sources = [];
            });
        },
        /**
         * Loads articles for the current source.
         *
         * @returns {void}
         */
        loadArticlesForCurrentSource() {
            if (this.currentSource === null) return;
            newsApi.getArticlesForSourceId(this.currentSource.id).then(response => {
                const articleAssembler = new ArticleAssembler(this.currentSource);
                this.articles = articleAssembler.toEntitiesFromResponse(response);
            }).catch(message => {
                this.errors.push(message);
                this.articles = [];
            });
        }
    });