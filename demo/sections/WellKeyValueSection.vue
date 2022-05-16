<template>
  <Section heading="Well Key/Value">
    <p-well-key-value well-key="Flow Run ID" well-value="3fa85f64" />
    <br>
    <p-well-key-value>
      <template #well-key>
        <div class="text-pink-400 uppercase">
          Created
        </div>
      </template>
      <template #well-value>
        {{ new Date().toISOString().slice(0, 10) }}
      </template>
    </p-well-key-value>
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
</script>