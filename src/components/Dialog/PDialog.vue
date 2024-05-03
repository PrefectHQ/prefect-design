<template>
  <PDialogBase v-bind="forwarded">
    <PDialogContent class="sm:max-w-[425px]" :as-child="Boolean($slots.default)" v-bind="$attrs">
      <slot>
        <PDialogHeader v-if="!$slots.header || $slots.title || $slots.description">
          <slot name="header">
            <PDialogTitle v-if="$slots.title">
              <slot name="title" />
            </PDialogTitle>
            <PDialogDescription v-if="$slots.description">
              <slot name="description" />
            </PDialogDescription>
          </slot>
        </PDialogHeader>
        <PDialogFooter v-if="$slots.footer">
          <slot name="footer" />
        </PDialogFooter>
      </slot>
    </PDialogContent>
  </PDialogBase>
</template>

<script setup lang="ts">
  import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
  import PDialogBase from '@/components/Dialog/PDialogBase.vue'
  import PDialogContent from '@/components/Dialog/PDialogContent.vue'
  import PDialogDescription from '@/components/Dialog/PDialogDescription.vue'
  import PDialogFooter from '@/components/Dialog/PDialogFooter.vue'
  import PDialogHeader from '@/components/Dialog/PDialogHeader.vue'
  import PDialogTitle from '@/components/Dialog/PDialogTitle.vue'

  defineOptions({
    inheritAttrs: false,
  })


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DialogRootProps>()
  const emits = defineEmits<DialogRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>
