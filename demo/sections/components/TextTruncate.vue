<template>
  <ComponentPage title="Text Truncate" :demos="[{ title: 'Text Truncate' }]">
    <template #text-truncate>
      <span class="heading">
        Default character count: 70<br>
        Default Action Text: See More<br>
        Default Collapse Text: See Less<br>
      </span>
      <hr class="divider">
      <span class="heading">
        Message is longer than character count:<br>
      </span>
      <p-text-truncate :text="exampleText" />
      <hr class="divider">
      <span class="heading">
        Message is shorter than character count:<br>
      </span>
      <p-text-truncate :text="exampleTextTwo" />
      <hr class="divider">
      <span class="heading">
        Custom character count, action text and collapse text:<br>
        Character Count: 35<br>
        Action Text: Lumos<br>
        Collapse Text: Noctum<br>
      </span>
      <p-text-truncate :text="exampleText" collapse-text="Noctum" action-text="Lumos" :character-count="35" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const exampleText = 'Cupcake ipsum dolor sit amet. Chocolate pastry icing danish sweet roll marshmallow. Candy sweet roll brownie powder muffin liquorice pie candy canes I love. Jelly beans gingerbread lollipop lemon drops dragée sugar plum tart.'
  const exampleTextTwo = 'Cupcake ipsum dolor sit amet.'
</script>

<style scoped>
.heading {
  @apply font-bold;
}
.divider {
  @apply my-3;
}
</style>