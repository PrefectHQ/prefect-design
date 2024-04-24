<template>
  <ComponentPage
    title="Button"
    :demos="[
      { title: 'Default button', description: 'Your go-to button for interactions.' },
      { title: 'Primary button', description: 'For a button that progresses the current journey. Only one per screen.' },
      { title: 'Icon only', description: 'When an icon is provided with no text.' },
      { title: 'Flat icon only', description: 'While any button can technically be made flat, this style is intended to be used with icon only buttons.' },
      { title: 'Loading', description: 'A soothing loading indicator for when a button is working on it.' },
      { title: 'Selected', description: 'Indicates that a button is the active selection in a group.' },
    ]"
  >
    <template #description>
      Buttons. The 'DON'T PANIC' signs of the internet, assuring us there's always something we're allowed to click.
    </template>

    <template #default-button>
      <div class="flex gap-4 items-center flex-wrap mb-4">
        <p-button>
          Button
        </p-button>
        <p-button icon="PlusIcon">
          With Icon
        </p-button>
        <p-button icon-append="PlusIcon">
          Appended Icon
        </p-button>
        <p-button variant="destructive">
          Dangerous
        </p-button>
        <p-button disabled>
          Disabled
        </p-button>
      </div>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button size="sm">
          Button
        </p-button>
        <p-button size="sm" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button size="sm" icon-append="PlusIcon">
          Appended Icon
        </p-button>
      </div>
    </template>

    <template #primary-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button variant="default">
          Button
        </p-button>
        <p-button variant="default" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button disabled variant="default">
          Disabled
        </p-button>
        <p-button dangerous variant="default">
          Dangerous
        </p-button>
        <p-button variant="default" size="sm">
          Small
        </p-button>
      </div>
    </template>

    <template #icon-only>
      <div class="flex gap-4 items-center flex-wrap mb-4">
        <p-button icon="PlusIcon" />
        <p-button icon="RocketLaunchIcon" variant="default" />
        <p-button icon="TrashIcon" dangerous />
      </div>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button size="sm" icon="PlusIcon" />
        <p-button size="sm" icon="RocketLaunchIcon" variant="default" />
        <p-button size="sm" icon="TrashIcon" dangerous />
      </div>
    </template>

    <template #flat-icon-only>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button icon="PlusIcon" flat />
        <p-button icon="TrashIcon" flat dangerous />
        <p-button icon="PlusIcon" flat size="sm" />
        <p-button icon="PlusIcon" flat disabled />
      </div>
    </template>

    <template #loading>
      <div class="flex gap-4 flex-wrap mb-4">
        <p-button :loading="buttonLoading">
          Button
        </p-button>
        <p-button :loading="buttonLoading" variant="default">
          Button
        </p-button>
        <p-button :loading="buttonLoading" dangerous>
          Button
        </p-button>
        <p-button :loading="buttonLoading" variant="default" dangerous>
          Button
        </p-button>
        <p-button :loading="buttonLoading" icon="PlusIcon" />
        <p-button :loading="buttonLoading" icon="PlusIcon" flat />
        <p-button :loading="buttonLoading" icon="PlusIcon" flat dangerous />
      </div>

      <p-checkbox v-model="buttonLoading" label="show loading" />
    </template>

    <template #selected>
      <p-button selected>
        Button
      </p-button>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const buttonLoading = ref(false)
</script>
