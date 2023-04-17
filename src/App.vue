<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderView from "@/components/layout/HeaderView.vue";
</script>

<template>
  <HeaderView></HeaderView>

  <div class="container">
    <div class="py-3 px-2">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
