<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'
  const wrapper = ref()

  const props = defineProps<{
    modelValue:  null,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: null) {
      emits('update:modelValue', value)
    },
  })

  function onTabClick(event: any): void {
    value.value = event.target.textContent ?? 'default'
    event.target.classList.add('p-tab__span-active')
    console.log('clicked', event.target)
  }
  onMounted(() => {

    Array.from(wrapper.value.children).forEach(tab => tab.onclick = onTabClick)
    // wrapper.value.children[0].onclick = onTabClick
  })
</script>

<style lang="scss" scoped>
</style>