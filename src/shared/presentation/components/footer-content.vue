<script setup lang="js">
  import {useI18n} from "vue-i18n";

  /**
   * Presentation component for the application footer.
   *
   * @remarks
   * Displays attribution links, copyright information, and supports localization.
   */
  const { t } = useI18n();
</script>

<template>
  <div class="grid mt-4 p-4 justify-content-center bg-primary text-primary-contrast text-center">
    <div class="col-12 flex flex-column align-items-center">
      <p>Copyright &copy; 2026. ACME Studios</p>
    </div>
    <div  class="col-12 flex flex-column align-items-center mt-3">
      <p>
        {{ t('authoring-phrase.intro') }} <i class="pi pi-heart text-red-500"/>
        {{ t('authoring-phrase.use') }} <a href="https://primevue.org/" target="_blank" class="text-primary-contrast font-bold">PrimeVue</a>
        {{ t('authoring-phrase.author', {brand: 'ACME'}) }}
      </p>
      <p>{{ t('footer.powered-by') }} <a href="https://www.newsapi.org" class="text-primary-contrast font-bold">NewsAPI.org</a> {{ t('footer.and') }} <a href="https://logo.dev" class="text-primary-contrast font-bold">Logo.dev Logo API</a> </p>
    </div>
  </div>
</template>

<style scoped>

</style>