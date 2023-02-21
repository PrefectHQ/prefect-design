<template>
  <ComponentPage title="Card" :demos="[{ title: 'Card' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-card
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #card>
      <p-card class="card-demo">
        <span class="card-demo-heading">Lorem with code</span>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem neque dolor obcaecati consequuntur repellendus. Accusantium ratione obcaecati voluptatum dolorum numquam accusamus praesentium asperiores iste laboriosam, consequatur necessitatibus? Placeat, tempore facere!
        <PCodeHighlight :text="json" lang="json" />
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  const json = `
{
  "foo": "bar",
  "yes": false,
  "single": ["is", "it", "really", "?"],
  "multiple": "no"
}
`.trim()
</script>

<style>
.card-demo { @apply
  flex
  flex-col
  gap-4
}

.card-demo-heading { @apply
  text-2xl
}
</style>