<template>
  <ComponentPage
    title="Button"
    :demos="[
      { title: 'Outline button' },
      { title: 'Default button' },
      { title: 'Destructive button' },
      { title: 'Ghost button' },
      { title: 'Icon only' },
      { title: 'Loading' },
      { title: 'Selected' },
    ]"
  >
    <template #outline-button>
      <div class="flex gap-4 items-center flex-wrap mb-4">
        <p-button variant="outline">
          Button
        </p-button>
        <p-button variant="outline" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button variant="outline" disabled>
          Disabled
        </p-button>
        <p-button variant="outline" size="sm">
          Small
        </p-button>
        <p-button variant="outline" icon="PlusIcon" size="sm">
          Small With Icon
        </p-button>
      </div>
    </template>

    <template #default-button>
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
        <p-button variant="default" size="sm">
          Small
        </p-button>
        <p-button variant="default" icon="PlusIcon" size="sm">
          Small With Left Icon
        </p-button>
        <p-button variant="default" icon-append="PlusIcon" size="sm">
          Small With Right Icon
        </p-button>
      </div>
    </template>

    <template #ghost-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button variant="ghost">
          Button
        </p-button>
        <p-button variant="ghost" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button variant="ghost" disabled>
          Disabled
        </p-button>
        <p-button variant="ghost" size="sm">
          Small
        </p-button>
        <p-button variant="ghost" icon="PlusIcon" size="sm">
          Small With Icon
        </p-button>
      </div>
    </template>

    <template #destructive-button>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button variant="destructive">
          Button
        </p-button>
        <p-button variant="destructive" icon="PlusIcon">
          With Icon
        </p-button>
        <p-button variant="destructive" disabled>
          Disabled
        </p-button>
        <p-button variant="destructive" size="sm">
          Small
        </p-button>
        <p-button variant="destructive" icon="PlusIcon" size="sm">
          Small With Icon
        </p-button>
      </div>
    </template>
    <template #icon-only>
      <div class="flex gap-4 items-center flex-wrap mb-4">
        <p-button icon="PlusIcon" />
        <p-button icon="RocketLaunchIcon" variant="default" />
        <p-button icon="TrashIcon" variant="destructive" />
      </div>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button size="sm" icon="PlusIcon" />
        <p-button size="sm" icon="RocketLaunchIcon" variant="default" />
        <p-button size="sm" icon="TrashIcon" variant="destructive" />
      </div>
    </template>

    <template #flat-icon-only>
      <div class="flex gap-4 items-center flex-wrap">
        <p-button icon="PlusIcon" variant="ghost" />
        <p-button icon="PlusIcon" variant="ghost" size="sm" />
        <p-button icon="PlusIcon" variant="ghost" disabled />
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
        <p-button :loading="buttonLoading" variant="destructive">
          Button
        </p-button>
        <p-button :loading="buttonLoading" icon="PlusIcon" />
        <p-button :loading="buttonLoading" icon="PlusIcon" variant="ghost" />
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
