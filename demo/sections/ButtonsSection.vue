<template>
  <Section heading="Buttons">
    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button>something</p-button>
      <p-button secondary>
        secondary
      </p-button>
      <p-button inset>
        inset
      </p-button>
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button icon="BeakerIcon">
        icon with text
      </p-button>

      <p-button secondary icon="BeakerIcon">
        icon with text
      </p-button>

      <p-button inset icon="BeakerIcon">
        icon with text
      </p-button>
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button icon="BeakerIcon" />
      <p-button secondary icon="BeakerIcon" />
      <p-button inset icon="BeakerIcon" />
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button rounded icon="BeakerIcon" />
      <p-button secondary rounded icon="BeakerIcon" />
      <p-button inset rounded icon="BeakerIcon" />
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button size="xs">
        size xs
      </p-button>
      <p-button size="sm">
        size sm
      </p-button>
      <p-button size="md">
        size md
      </p-button>
      <p-button size="lg">
        size lg
      </p-button>
      <p-button size="xl">
        size xl
      </p-button>
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button size="xs" rounded icon="BeakerIcon" />
      <p-button size="sm" rounded icon="BeakerIcon" />
      <p-button size="md" rounded icon="BeakerIcon" />
      <p-button size="lg" rounded icon="BeakerIcon" />
      <p-button size="xl" rounded icon="BeakerIcon" />
    </div>

    <div class="flex flex-wrap items-start gap-2 mb-4">
      <p-button disabled>
        disabled
      </p-button>
      <p-button disabled secondary icon="BeakerIcon">
        disabled secondary with icon
      </p-button>
      <p-button disabled inset rounded icon="BeakerIcon" />
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/Section.vue'
</script>