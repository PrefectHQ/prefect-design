<template>
  <section class="p-tabs">
    <template v-if="media.sm">
      <PTabNavigation v-model:selected="selected" class="p-tabs--not-mobile" :tabs="tabs">
        <template v-for="tab in tabs" #[`${kebabCase(tab.label)}-heading`]="data">
          <slot :name="`${kebabCase(tab.label)}-heading`" v-bind="data" />
        </template>

        <template #heading="data">
          <slot name="heading" v-bind="data" />
        </template>
      </PTabNavigation>
    </template>
    <template v-else>
      <PTabSelect v-model:selected="selected" :tabs="tabs">
        <template v-for="tab in tabs" #[`${kebabCase(tab.label)}-heading`]="data">
          <slot :name="`${kebabCase(tab.label)}-heading`" v-bind="data" />
        </template>

        <template #heading="data">
          <slot name="heading" v-bind="data" />
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
          <slot :name="`${kebabCase(tab.label)}`" v-bind="{ tab, index }">
            <slot name="content" v-bind="{ tab, index }" />
          </slot>
        </section>
      </template>
    </template>
  </section>
</template>

<script lang="ts" setup generic="T extends string">
  import { VNode, computed, ref } from 'vue'
  import PTabNavigation from '@/components/Tabs/PTabNavigation.vue'
  import PTabSelect from '@/components/Tabs/PTabSelect.vue'
  import { Tab, normalizeTab } from '@/types/tabs'
  import { media } from '@/utilities/media'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    tabs: Readonly<(T | Tab<T>)[]>,
    selected?: T,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: T): void,
  }>()

  type HeadingSlots = Record<`${string}-heading`, (props: { tab: Tab<T>, index: number }) => VNode>
  type HeadingSlot = { heading: (props: { tab: Tab<T>, index: number }) => VNode }
  type ContentSlots = Record<string, (props: { tab: Tab<T>, index: number }) => VNode>
  type ContentSlot = { content: (props: { tab: Tab<T>, index: number }) => VNode }

  defineSlots<HeadingSlots & HeadingSlot & ContentSlots & ContentSlot>()

  const tabs = computed(() => props.tabs.map(normalizeTab))

  const backupSelected = ref<T>()
  const selected = computed<T>({
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
