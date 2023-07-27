<template>
  <ComponentPage
    title="Button"
    :demos="[
      { title: 'Default button', description: 'Your go-to button for interactions.' },
      { title: 'Primary button', description: 'For a button that progresses the current journey. Only one per screen.' },
      { title: 'Default danger button', description: 'To initiate a destructive action' },
      { title: 'Primary danger button', description: 'To confirm a destructive action.' },
      { title: 'Icon only', description: 'When an icon is provided with no text.' },
      { title: 'Flat icon only', description: 'While any button can technically be made flat, this style is intended to be used with icon only buttons.' },
      { title: 'Loading', description: 'A soothing loading indicator for when a button is working on it.' },
      { title: 'Activated', description: 'This style is intended for use only with default buttons, specifically in button groups.' },
    ]"
  >
    <template #description>
      Buttons. The 'DON'T PANIC' signs of the internet, assuring us there's always something we're allowed to click.
    </template>

    <template #default-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button>
          Button
        </p-button>
        <p-button icon="PlusIcon">
          With Icon
        </p-button>
        <p-button icon-append="PlusIcon">
          Appended Icon
        </p-button>
        <p-button disabled>
          Disabled
        </p-button>
        <p-button small>
          Small
        </p-button>
        <p-button small icon="PlusIcon">
          Small With Icon
        </p-button>
        <p-button small icon-append="PlusIcon">
          Small Appended Icon
        </p-button>
      </div>
    </template>

    <template #primary-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button kind="primary">
          Button
        </p-button>
        <p-button kind="primary" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button disabled kind="primary">
          Disabled
        </p-button>
        <p-button kind="primary" small>
          Small
        </p-button>
      </div>
    </template>

    <template #default-danger-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button kind="danger">
          Button
        </p-button>
        <p-button kind="danger" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button disabled kind="danger">
          Disabled
        </p-button>
        <p-button kind="danger" small>
          Small
        </p-button>
      </div>
    </template>

    <template #primary-danger-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button kind="primary--danger">
          Button
        </p-button>
        <p-button kind="primary--danger" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button disabled kind="primary--danger">
          Disabled
        </p-button>
        <p-button kind="primary--danger" small>
          Small
        </p-button>
      </div>
    </template>

    <template #icon-only>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button icon="PlusIcon" />
        <p-button icon="RocketLaunchIcon" kind="primary" />
        <p-button icon="TrashIcon" kind="danger" />
      </div>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button small icon="PlusIcon" />
        <p-button small icon="RocketLaunchIcon" kind="primary" />
        <p-button small icon="TrashIcon" kind="danger" />
      </div>
    </template>

    <template #flat-icon-only>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button icon="PlusIcon" kind="flat" />
        <p-button icon="PlusIcon" kind="flat" small />
        <p-button icon="PlusIcon" kind="flat" disabled />
      </div>
    </template>

    <template #loading>
      <div class="flex gap-4 flex-wrap">
        <p-button :loading="buttonLoading">
          Button
        </p-button>
        <p-button :loading="buttonLoading" kind="primary">
          Button
        </p-button>
        <p-button :loading="buttonLoading" kind="danger">
          Button
        </p-button>
        <p-button :loading="buttonLoading" kind="primary--danger">
          Button
        </p-button>
        <p-button :loading="buttonLoading" icon="PlusIcon" />
        <p-button :loading="buttonLoading" icon="PlusIcon" kind="flat" />
      </div>

      <p-checkbox v-model="buttonLoading" label="show loading" />
    </template>

    <template #activated>
      <div class="flex gap-4 flex-wrap">
        <p-button activated>
          Button
        </p-button>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const buttonLoading = ref(false)
</script>
