<template>
  <iframe ref="frame" srcdoc="<body></body>" :height="height" v-bind="$attrs" @load="onLoad" />
  <teleport v-if="content" :to="content">
    <slot />
  </teleport>
</template>

<script lang="ts">
  export default {
    name: 'PFrame',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useElementRect } from '@prefecthq/vue-compositions'
  import { ref, watch } from 'vue'

  const props = defineProps<{
    bodyClass: Record<string, boolean> | string | string[],
  }>()

  const frame = ref<HTMLIFrameElement>()
  const content = ref<HTMLElement>(document.createElement('div'))

  const { height } = useElementRect(content)

  function addStyleAndLinks(head: HTMLHeadElement): void {
    const styles = Array.from(document.getElementsByTagName('style'))
    const links = Array.from(document.getElementsByTagName('link'))

    for (const el of styles.concat(links)) {
      const styleElement = el.cloneNode(true)
      head.appendChild(styleElement)
    }
  }

  function onLoad(): void {
    if (!frame.value?.contentDocument) {
      return
    }

    const [head] = frame.value.contentDocument.getElementsByTagName('head')
    addStyleAndLinks(head)
    updateBodyClasses()
    const [body] = frame.value.contentDocument.getElementsByTagName('body')
    body.appendChild(content.value)
  }

  function updateBodyClasses(): void {
    if (!frame.value?.contentDocument) {
      return
    }

    const [body] = frame.value.contentDocument.getElementsByTagName('body')
    body.classList.forEach((className) => body.classList.remove(className))

    if (typeof props.bodyClass === 'string') {
      body.classList.add(props.bodyClass)
    } else if (Array.isArray(props.bodyClass)) {
      body.classList.add(...props.bodyClass)
    } else {
      for (const [className, shouldAdd] of Object.entries(props.bodyClass)) {
        if (shouldAdd) {
          body.classList.add(className)
        } else {
          body.classList.remove(className)
        }
      }
    }
  }

  watch(() => props.bodyClass, () => {
    updateBodyClasses()
  })
</script>