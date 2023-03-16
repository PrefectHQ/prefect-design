<template>
  <ComponentPage
    title="Links"
    :demos="[
      { title: 'Local' },
      { title: 'External' },
      { title: 'Callback' },
      { title: 'Disabled' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code inline>
        p-links
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #local>
      <p-link to="/icons">
        Link to Icons page
      </p-link>
    </template>

    <template #external>
      <p-link to="https://prefect.io">
        Link to prefect.io
      </p-link>
    </template>

    <template #callback>
      <p-link @click="toastEm">
        Pull the lever!
      </p-link>
    </template>

    <template #disabled>
      <p-link to="/icons" disabled>
        Link to prefect.io
      </p-link>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { showToast } from '@/plugins'
  import { h } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  function toastEm(): void {
    showToast(h('img', { src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2F5cd0279a34847c1adc9b180e239cc69f%2Ftenor.gif%3Fitemid%3D4931784&f=1&nofb=1&ipt=6d5cb5cc23da4fa0eee79f2ee6d359eff16ecefa8da7db98d66a92fcb1afd726&ipo=images' }))
  }
</script>