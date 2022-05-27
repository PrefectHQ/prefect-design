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

    <br>

    <p-key-value label="This uses an empty slot">
      <template #empty>
        <span class="key-value-section__turtles">Ninja turtles</span>
      </template>
    </p-key-value>
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
</script>

<style>
.key-value-section__turtles {
  background-image: linear-gradient(to left, #E3331C, #EA9500, #4C9C23, #00AAE6, #995AA0);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>