<script setup lang="js">
import ArticleItem from "./article-item.vue";
import {Article} from "@/news/domain/model/article.entity.js";

/**
 * Presentation component for rendering a collection of article cards.
 *
 * @remarks
 * Iterates over an array of Article entities and renders an ArticleItem for each.
 */

/**
 * Properties for the ArticleList component.
 *
 * @typedef {Object} ArticleListProps
 * @property {Article[]} articles - An array of Article entities to be displayed.
 */
const { articles } = defineProps({ articles: { type: Array, required: true } });

</script>

<template>
  <div v-for="article in articles" :key="article.url.toString()">
    <article-item :article="article"/>
  </div>
</template>

<style scoped>

</style>