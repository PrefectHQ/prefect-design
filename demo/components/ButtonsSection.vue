<template>
  <Section heading="Buttons">
    <div class="flex flex-col gap-2">
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

      <div class="flex gap-1">
        <p-button icon="BeakerIcon" />
        <p-button secondary icon="BeakerIcon" />
        <p-button inset icon="BeakerIcon" />
        <p-button flat icon="BeakerIcon" />
        <p-button danger icon="BeakerIcon" />
      </div>

      <div class="flex gap-1">
        <p-button rounded icon="BeakerIcon" />
        <p-button secondary rounded icon="BeakerIcon" />
        <p-button inset rounded icon="BeakerIcon" />
        <p-button flat rounded icon="BeakerIcon" />
        <p-button danger rounded icon="BeakerIcon" />
      </div>

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

      <div class="flex items-start gap-1">
        <p-button size="xs" rounded icon="BeakerIcon" />
        <p-button size="sm" rounded icon="BeakerIcon" />
        <p-button size="md" rounded icon="BeakerIcon" />
        <p-button size="lg" rounded icon="BeakerIcon" />
        <p-button size="xl" rounded icon="BeakerIcon" />
      </div>

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

      <div class="flex gap-1">
        <p-button :loading="buttonLoading" icon="BeakerIcon">
          Loading Button
        </p-button>
      </div>

      <p-checkbox v-model="buttonLoading" label="show loading" />

      <p-button-group v-model="preselectedItem" :options="buttonGroup" @update:model-value="selectButton" />
      <p-button-group v-model="preselectedItem" size="xs" :options="buttonGroup" @update:model-value="selectButton" />
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption, SelectModelValue } from '@/types'
  import { ref } from 'vue'
  import Section from './Section.vue'

  const buttonLoading = ref(false)

  const selectButton = (value: SelectModelValue): void => {
    console.log(value)
  }

  const preselectedItem = ref('email')

  const buttonGroup: ButtonGroupOption[] = [
    {
      label: 'Email',
      value: 'email',
      icon: 'MailIcon',
    },
    {
      label: 'Slack',
      value: 'slack',
      icon: 'Slack',
    },
    {
      label: 'GitHub',
      value: 'github',
      disabled: true,
    },
    {
      label: 'Twitter',
      value: 'twitter',
    },
    {
      label: 'Facebook',
      value: 'facebook',
    },
    {
      label: 'Instagram',
      value: 'instagram',
      disabled: true,
    },
  ]
</script>