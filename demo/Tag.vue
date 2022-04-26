<template>
  <div class="bg-gray-200	p-5">
    <h1>No Icons: </h1>

    <p-tag>
      one
    </p-tag>

    <p-tag class="bg-primary">
      <span class="text-white">two</span>
    </p-tag>


    <p-tag>
      three
    </p-tag>

    <h1>Icons: </h1>
    <p-tag>
      <template #icon>
        <TagIcon class="h-3 w-3 text-gray-300 " />
      </template>

      one
    </p-tag>

    <p-tag class="bg-primary">
      <template #icon>
        <TagIcon class="h-3 w-3 text-gray-300 " />
      </template>

      <span class="text-white">two</span>
    </p-tag>


    <p-tag>
      <template #icon>
        <TagIcon class="h-3 w-3 text-gray-300 " />
      </template>

      three
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { TagIcon } from '@heroicons/vue/solid'
  import PTag from '../src/components/Tag/PTag.vue'
</script>

