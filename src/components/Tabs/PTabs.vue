<template>
  <section class="p-tabs">
    <template v-if="media.sm">
      <PTabNavigation v-model:selected="selected" class="p-tabs--not-mobile" :tabs="tabs">
        <template v-for="(index, name) in slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </PTabNavigation>
    </template>
    <template v-else>
      <PTabSelect v-model:selected="selected" :tabs="tabs">
        <template v-for="(index, name) in slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </PTabSelect>
    </template>
    <template v-for="(tab, index) in tabs" :key="tab.label">
      <template v-if="selected === tab.label">
        <section
          :id="`${kebabCase(tab.label)}-content`"
          class="p-tabs__content"
          role="tabpanel"
          :aria-labelledby="`${kebabCase(tab.label)}`"
        >
          <slot :name="kebabCase(tab.label)" v-bind="{ tab, index }">
            <slot name="content" v-bind="{ tab, index }" />
          </slot>
        </section>
      </template>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, useSlots } from 'vue'
  import PTabNavigation from '@/components/Tabs/PTabNavigation.vue'
  import PTabSelect from '@/components/Tabs/PTabSelect.vue'
  import { Tab, normalizeTab } from '@/types/tabs'
  import { media } from '@/utilities/media'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    tabs: (string | Tab)[],
    selected?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string): void,
  }>()

  const slots = useSlots()
  const tabs = computed(() => props.tabs.map(normalizeTab))

  const backupSelected = ref<string>()
  const selected = computed({
    get() {
      if (props.selected) {
        return props.selected
      }

      if (backupSelected.value) {
        return backupSelected.value
      }

      const [first] = tabs.value

      return first.label
    },
    set(value) {
      backupSelected.value = value
      emits('update:selected', value)
    },
  })
</script>

<style>
.p-tabs__content { @apply
  mt-5
}
</style>
