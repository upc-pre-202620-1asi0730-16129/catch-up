<script setup lang="js">
import {Source} from "@/news/domain/model/source.entity.js";
import SourceItem from "./source-item.vue";

/**
 * Presentation component for displaying a list of selectable news sources.
 *
 * @remarks
 * Renders news sources within a navigation drawer and handles source selection.
 */

/**
 * Properties for the SourceList component.
 *
 * @typedef {Object} SourceListProps
 * @property {boolean} visible - Controls the visibility of the source drawer.
 * @property {Source[]} sources - An array of news source entities to display.
 */

/**
 * Emitted events for the SourceList component.
 *
 * @typedef {Object} SourceListEmits
 * @property {(event: 'source-selected', source: Source) => void} source-selected - Emitted when a source is selected from the list.
 * @property {(event: 'update:visible', visible: boolean) => void} update:visible - Emitted when the visibility of the drawer changes.
 */

/** @type {SourceListProps} */
const { visible, sources } = defineProps({ visible: Boolean, sources: Array[Source] });
/** @type {SourceListEmits['emit']} */
const emit  = defineEmits(['source-selected', 'update:visible']);

/**
 * Emits the update:visible event for the container component.
 *
 * @param {boolean} value
 */
const emitVisibilityUpdatedEvent = (value) => {
  emit('update:visible', value);
};

/**
 * Bubbles the selected source to the parent container.
 *
 * @param {Source} source
 * @returns {void}
 */
const emitSourceSelectedEvent = source => {
  emit('source-selected', source);
};
</script>

<template>
  <pv-drawer :visible="visible" @update:visible="emitVisibilityUpdatedEvent">
    <source-item v-for="source in sources"
                 :key="source.id"
                 :source="source"
                 @source-selected="emitSourceSelectedEvent(source)"/>
  </pv-drawer>
</template>

<style scoped>

</style>