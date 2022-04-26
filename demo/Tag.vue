<template>
  <div class="bg-gray-200	p-5">
    <div>
      <h1>No Icons: </h1>

      <p-tag>
        one
      </p-tag>

      <p-tag>
        two
      </p-tag>


      <p-tag>
        three
      </p-tag>
    </div>
    <div>
      <h1>Icons: </h1>
      <p-tag>
        <template #icon>
          <TagIcon class="h-3 w-3 text-gray-300 " />
        </template>

        one
      </p-tag>

      <p-tag>
        <template #icon>
          <TagIcon class="h-3 w-3 text-gray-300 " />
        </template>
        two
      </p-tag>


      <p-tag>
        <template #icon>
          <TagIcon class="h-3 w-3 text-gray-300 " />
        </template>

        three
      </p-tag>
    </div>

    <h1>States: </h1>
    <p-tag class="bg-green-500">
      <template #icon>
        <TagIcon class="h-3 w-3 text-white" />
      </template>

      <span class="text-white">Completed</span>
    </p-tag>

    <p-tag class="bg-black">
      <template #icon>
        <TagIcon class="h-3 w-3 text-white" />
      </template>

      <span class="text-white">Cancelled</span>
    </p-tag>

    <p-tag class="bg-red-500">
      <template #icon>
        <TagIcon class="h-3 w-3 text-white" />
      </template>

      <span class="text-white">Failed</span>
    </p-tag>

    <p-tag>
      <template #icon>
        <TagIcon class="h-3 w-3 text-black" />
      </template>

      Pending
    </p-tag>

    <p-tag class="bg-blue-600">
      <template #icon>
        <TagIcon class="h-3 w-3 text-white" />
      </template>

      <span class="text-white">Running</span>
    </p-tag>

    <p-tag class="bg-yellow-500">
      <template #icon>
        <TagIcon class="h-3 w-3 text-black" />
      </template>

      <span class="text-black">Scheduled</span>
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { TagIcon } from '@heroicons/vue/solid'
  import PTag from '../src/components/Tag/PTag.vue'
</script>

