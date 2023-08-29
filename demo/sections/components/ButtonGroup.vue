<template>
  <ComponentPage
    title="Button Group"
    :demos="[
      { title: 'Basic' },
      { title: 'Small' },
      { title: 'Simple', description: 'Uses `string[]` for options' },
      { title: 'Booleans', description: 'Uses `boolean[]` for options' },
    ]"
  >
    <template #basic>
      <p-button-group v-model="preselectedItem" :options="buttonGroup" />
    </template>

    <template #small>
      <p-button-group v-model="preselectedItem" small :options="buttonGroup" />
    </template>

    <template #simple>
      <p-button-group v-model="simpleValue" :options="simpleOptions" />
    </template>

    <template #booleans>
      <p-button-group v-model="booleanValue" :options="[true, false]" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@/types'
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const preselectedItem = ref('email')

  const buttonGroup: ButtonGroupOption[] = [
    {
      label: 'Email',
      value: 'email',
      icon: 'EnvelopeIcon',
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

  const simpleValue = ref('Email')
  const simpleOptions = computed(() => buttonGroup.map(({ label }) => label))

  const booleanValue = ref(true)
</script>