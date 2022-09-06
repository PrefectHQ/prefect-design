<template>
  <ComponentPage
    title="Button"
    :demos="[
      { title: 'Simple Buttons', description: 'here is some useful info' },
      { title: 'With Icons', description: 'here is some useful info' },
      { title: 'Icons Only', description: 'here is some useful info' },
      { title: 'Icons Round', description: 'here is some useful info' },
      { title: 'Button Sizes', description: 'here is some useful info' },
      { title: 'Round Button Sizes', description: 'here is some useful info' },
      { title: 'Disabled', description: 'here is some useful info' },
      { title: 'Loading', description: 'here is some useful info' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-button</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #simple-buttons>
      <div class="flex gap-1">
        <p-button>something</p-button>
        <p-button secondary>
          secondary
        </p-button>
        <p-button inset>
          inset
        </p-button>
        <p-button flat>
          flat
        </p-button>
        <p-button danger>
          danger
        </p-button>
      </div>
    </template>

    <template #with-icons>
      <div class="flex gap-1">
        <p-button icon="BeakerIcon">
          icon with text
        </p-button>

        <p-button secondary icon="BeakerIcon">
          icon with text
        </p-button>

        <p-button inset icon="BeakerIcon">
          icon with text
        </p-button>

        <p-button flat icon="BeakerIcon">
          icon with text
        </p-button>

        <p-button danger icon="BeakerIcon">
          icon with text
        </p-button>
      </div>
    </template>

    <template #icons-only>
      <div class="flex gap-1">
        <p-button icon="BeakerIcon" />
        <p-button secondary icon="BeakerIcon" />
        <p-button inset icon="BeakerIcon" />
        <p-button flat icon="BeakerIcon" />
        <p-button danger icon="BeakerIcon" />
      </div>
    </template>

    <template #icons-round>
      <div class="flex gap-1">
        <p-button rounded icon="BeakerIcon" />
        <p-button secondary rounded icon="BeakerIcon" />
        <p-button inset rounded icon="BeakerIcon" />
        <p-button flat rounded icon="BeakerIcon" />
        <p-button danger rounded icon="BeakerIcon" />
      </div>
    </template>

    <template #button-sizes>
      <div class="flex items-start gap-1">
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
    </template>

    <template #round-button-sizes>
      <div class="flex items-start gap-1">
        <p-button size="xs" rounded icon="BeakerIcon" />
        <p-button size="sm" rounded icon="BeakerIcon" />
        <p-button size="md" rounded icon="BeakerIcon" />
        <p-button size="lg" rounded icon="BeakerIcon" />
        <p-button size="xl" rounded icon="BeakerIcon" />
      </div>
    </template>

    <template #disabled>
      <div class="flex gap-1">
        <p-button disabled>
          disabled
        </p-button>
        <p-button disabled secondary icon="BeakerIcon">
          disabled secondary with icon
        </p-button>
        <p-button disabled inset icon="BeakerIcon" />
        <p-button disabled flat icon="BeakerIcon" />
        <p-button disabled danger icon="BeakerIcon" />
      </div>
    </template>

    <template #loading>
      <div class="flex gap-1">
        <p-button :loading="buttonLoading" icon="BeakerIcon">
          Loading Button
        </p-button>
      </div>

      <p-checkbox v-model="buttonLoading" label="show loading" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const buttonLoading = ref(false)
</script>