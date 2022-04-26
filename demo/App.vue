<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <p-tag>
            <template #icon>
              <BeakerIcon class="h-5 w-5 text-blue-500 mr-px" />
            </template>
            tag
          </p-tag>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BeakerIcon } from '@heroicons/vue/solid'
  import PTag from '../src/components/Tag/PTag.vue'

  // Hello!
</script>
