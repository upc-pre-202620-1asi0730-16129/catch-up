<script lang="js" setup>

import {newsStore} from "@/news/application/news.store.js";
import SourceList from "@/news/presentation/components/source-list.vue";
import LanguageSwitcher from "./language-switcher.vue";
import ArticleList from "@/news/presentation/components/article-list.vue";
import UnavailableContent from "@/news/presentation/components/unavailable-content.vue";
import FooterContent from "./footer-content.vue";
import {ref, computed, onMounted} from "vue";

/**
 * Root presentation layout for the news application.
 *
 * @remarks
 * Coordinates the display of the menubar, news source drawer, and the main
 * content area (article list or error view). It bridges the UI with the
 * `newsStore` application service.
 */

const drawerVisible = ref(false);

/**
 * Toggles the source drawer visibility.
 *
 * @returns {void}
 */
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};


/** @type {import('vue').ComputedRef<import('@/news/domain/model/source.entity.js').Source[]>} */
const sources = computed(() => newsStore.sources);
/** @type {import('vue').ComputedRef<Array<unknown>>} */
const errors = computed(() => newsStore.errors);
/** @type {import('vue').ComputedRef<import('@/news/domain/model/article.entity.js').Article[]>} */
const articles = computed(() => newsStore.articles || []);

/**
 * Selects a source and refreshes article projections.
 *
 * @param {import('@/news/domain/model/source.entity.js').Source} source
 * @returns {void}
 */
const setSource = source => {
  newsStore.setCurrentSource(source);
  toggleDrawer();
};

onMounted(() => {
  newsStore.loadSources();
});


</script>

<template>
  <div class="layout-container">
    <header class="sticky-header">
      <pv-menubar>
        <template #start>
          <pv-button icon="pi pi-bars" label="CatchUp"
                     text @click="toggleDrawer" class="mr-2"/>
          <source-list :sources="sources"
                       v-model:visible="drawerVisible"
                       @source-selected="setSource"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </header>
    <main class="content-padding">
      <article-list v-if="articles.length" :articles="articles"/>
      <unavailable-content v-else :errors="errors"/>
    </main>
    <footer>
      <footer-content/>
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.content-padding {
  padding: 1rem;
  flex: 1;
}

@media screen and (min-width: 768px) {
  .content-padding {
    padding: 2rem;
  }
}
</style>