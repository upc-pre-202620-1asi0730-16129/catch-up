<script setup>
import { useI18n } from 'vue-i18n'
import Layout from "./shared/presentation/components/layout.vue";

/**
 * Presentation shell component.
 *
 * @remarks
 * Hosts the application layout and keeps bootstrapping concerns out of
 * feature components.
 */
const { t } = useI18n()
</script>

<template>
  <layout/>
</template>

<style scoped>

</style>