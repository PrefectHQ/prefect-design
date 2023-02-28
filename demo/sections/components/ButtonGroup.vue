<template>
  <ComponentPage
    title="Button Group"
    :demos="[
      { title: 'Basic' },
      { title: 'Small' },
      { title: 'Simple', description: 'Uses `string[]` for options' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code inline>
        p-button-group
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <p-button-group v-model="preselectedItem" :options="buttonGroup" />
    </template>

    <template #small>
      <p-button-group v-model="preselectedItem" size="xs" :options="buttonGroup" />
    </template>

    <template #simple>
      <p-button-group v-model="simpleValue" :options="simpleOptions" />
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

  const simpleValue = ref('Email')
  const simpleOptions = computed(() => buttonGroup.map(({ label }) => label))
</script>