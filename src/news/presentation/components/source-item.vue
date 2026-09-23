<script setup lang="js">
  import {Source} from "@/news/domain/model/source.entity.js";

  /**
   * Presentation component for a single news source item.
   *
   * @remarks
   * Displays source details and emits a selection event when clicked.
   */

  /**
   * Properties for the SourceItem component.
   *
   * @typedef {Object} SourceItemProps
   * @property {Source} source - The source entity to display.
   */

  /**
   * Emitted events for the SourceItem component.
   *
   * @typedef {Object} SourceItemEmits
   * @property {(event: 'source-selected', source: Source) => void} source-selected - Emitted when the source is clicked.
   */

  /** @type {SourceItemProps} */
  const { source } = defineProps({ source: { type: Source, required: true } });
  /** @type {SourceItemEmits['emit']} */
  const emit  = defineEmits(['source-selected']);

  /**
   * Emits a selected source to the parent component.
   *
   * @returns {void}
   */
  const emitSourceSelectedEvent = () => {
    emit('source-selected', source);
  };
</script>

<template>
  <div class="m-4">
    <div @click="emitSourceSelectedEvent" class="flex align-content-start flex-wrap cursor-pointer hover:bg-emphasis p-2 border-round transition-colors transition-duration-150">
    <span  class="flex align-items-center justify-content-center mr-2">
          <pv-avatar :aria-label="source.name"
                     :image="source.urlToLogo"
                     shape="circle"/>
    </span>
      <span  class="flex align-items-center justify-content-center font-medium">
          {{source.name}}
    </span>
    </div>
  </div>
</template>

<style scoped>

</style>