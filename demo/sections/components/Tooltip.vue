<template>
  <ComponentPage title="Tooltip" :demos="demos">
    <template #text>
      <p>
        This is a sentence with a
        <p-tooltip text="This is a Tooltip component">
          <p-link>tooltip</p-link>
        </p-tooltip> in it.
      </p>
    </template>

    <template #button>
      <p-tooltip text="This is a Tooltip component">
        <p-button>Hover Me</p-button>
      </p-tooltip>
    </template>

    <template #content-slot>
      <p>
        This is a sentence with a
        <p-tooltip>
          <p-link>tooltip</p-link>
          <template #content>
            <div class="flex gap-2 items-center">
              <p>This is a Tooltip component</p>
              <p-button small>
                Button
              </p-button>
            </div>
          </template>
        </p-tooltip> that uses a slot in it.
      </p>
    </template>

    <template #tooltip-slot>
      <p>
        <p-tooltip>
          <p-link> This version</p-link>
          <template #tooltip>
            <p-card class="bg-slate-950">
              Hey that looks different
            </p-card>
          </template>
        </p-tooltip> overrides the entire tooltip.
      </p>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Text' },
    { title: 'Button' },
    { title: 'Content slot' },
    { title: 'Tooltip slot' },
  ]
</script>