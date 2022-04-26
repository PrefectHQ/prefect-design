<template>
  <div v-cloak class="pt-5 px-10 pb-10">
    <div>
      <router-link class="mr-4" to="/">
        Components
      </router-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
[v-cloak] {
  display: none;
}
</style>
