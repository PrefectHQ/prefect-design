<template>
  <div class="p-accordion">
    <template v-for="section in sections" :key="section">
      <div class="p-accordion__section">
        <div class="p-accordion__header" @click="openSection(String(section))">
          <!-- dynamic slot names don't work great yet -->
          <!-- @vue-ignore -->
          <slot :name="`${section}-heading`">
            {{ section }}
          </slot>
        </div>

        <PAutoHeightTransition>
          <template v-if="isOpen(String(section))">
            <div class="p-accordion__content">
              <div class="pb-2">
                <!-- dynamic slot names don't work great yet -->
                <!-- @vue-ignore -->
                <slot :name="`${section}-content`" />
              </div>
            </div>
          </template>
        </PAutoHeightTransition>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup generic="const T extends Readonly<string[]>">
  import { Ref, ref } from 'vue'
  import { PAutoHeightTransition } from '@/components/AutoHeightTransition'

  const props = defineProps<{
    sections: T,
  }>()

  type AccordionSlots<T extends Readonly<string[]>> = {
    // this is the type vue wants sadly
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in T[number] as `${K}-heading`]?: (props: {}) => unknown
  } & {
    // this is the type vue wants sadly
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in T[number] as `${K}-content`]: (props: {}) => unknown
  }

  defineSlots<AccordionSlots<T>>()

  const open: Ref<T[number]> = ref(props.sections[0])

  function openSection(section: string): void {
    open.value = section
  }

  function isOpen(section: string): boolean {
    return open.value === section
  }
</script>

<style>
.p-accordion__header { @apply
  text-base
  py-2
  border-t
  border-foreground-200
}
</style>