<template>
  <div class="flex items-start gap-2 mb-4">
    <p-button>something</p-button>
    <p-button secondary>secondary</p-button>
    <p-button inset>inset</p-button>
  </div>

  <div class="flex items-start gap-2 mb-4">
    <p-button>
      <template #icon>
        <BeakerIcon />
      </template>
      icon with text
    </p-button>

    <p-button secondary>
      <template #icon>
        <BeakerIcon />
      </template>
      icon with text
    </p-button>

    <p-button inset>
      <template #icon>
        <BeakerIcon />
      </template>
      icon with text
    </p-button>
  </div>

  <div class="flex items-start gap-2 mb-4">
    <p-button>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>

    <p-button secondary>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>

    <p-button inset>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
  </div>

  <div class="flex items-start gap-2 mb-4">
    <p-button rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>

    <p-button secondary rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>

    <p-button inset rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
  </div>

  <div class="flex items-start gap-2 mb-4">
    <p-button size="xs">size xs</p-button>
    <p-button size="sm">size sm</p-button>
    <p-button size="md">size md</p-button>
    <p-button size="lg">size lg</p-button>
    <p-button size="xl">size xl</p-button>
  </div>

  <div class="flex items-start gap-2 mb-4">
    <p-button size="xs" rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
    <p-button size="sm" rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
    <p-button size="md" rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
    <p-button size="lg" rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
    <p-button size="xl" rounded>
      <template #icon>
        <BeakerIcon />
      </template>
    </p-button>
  </div>
</template>

<script lang="ts" setup>
import { BeakerIcon } from '@heroicons/vue/solid'
</script>