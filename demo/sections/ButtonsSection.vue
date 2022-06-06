<template>
  <Section heading="Buttons">
    <PContent>
      <PContent secondary flex>
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
      </PContent>

      <PContent secondary flex>
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
      </PContent>

      <PContent secondary flex>
        <p-button icon="BeakerIcon" />
        <p-button secondary icon="BeakerIcon" />
        <p-button inset icon="BeakerIcon" />
        <p-button flat icon="BeakerIcon" />
      </PContent>

      <PContent secondary flex>
        <p-button rounded icon="BeakerIcon" />
        <p-button secondary rounded icon="BeakerIcon" />
        <p-button inset rounded icon="BeakerIcon" />
        <p-button flat rounded icon="BeakerIcon" />
      </PContent>

      <PContent secondary flex class="items-start">
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
      </PContent>

      <PContent secondary flex class="items-start">
        <p-button size="xs" rounded icon="BeakerIcon" />
        <p-button size="sm" rounded icon="BeakerIcon" />
        <p-button size="md" rounded icon="BeakerIcon" />
        <p-button size="lg" rounded icon="BeakerIcon" />
        <p-button size="xl" rounded icon="BeakerIcon" />
      </PContent>

      <PContent secondary flex>
        <p-button disabled>
          disabled
        </p-button>
        <p-button disabled secondary icon="BeakerIcon">
          disabled secondary with icon
        </p-button>
        <p-button disabled inset icon="BeakerIcon" />
        <p-button disabled flat icon="BeakerIcon" />
      </PContent>

      <PContent secondary flex>
        <p-button :loading="buttonLoading" icon="BeakerIcon">
          Loading Button
        </p-button>
      </PContent>

      <p-checkbox v-model="buttonLoading" label="show loading" />
    </PContent>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'
  import PContent from '@/components/Content/PContent.vue'

  const buttonLoading = ref(false)
</script>