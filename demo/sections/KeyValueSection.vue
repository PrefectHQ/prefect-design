<template>
  <Section heading="Well Key/Value">
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
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
</script>