<template>
  <Section heading="Key/Value Display">
    <p-key-value label="Flow Run ID" value="3fa85f64" />

    <br>

    <p-key-value>
      <template #label>
        <div class="text-pink-400 uppercase">
          Created
        </div>
      </template>
      <template #value>
        {{ new Date().toISOString().slice(0, 10) }}
      </template>
    </p-key-value>

    <br>

    <p-key-value label="This should say 'None' below" />
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
</script>