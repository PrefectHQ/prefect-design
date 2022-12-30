<template>
  <iframe ref="frame" srcdoc="<body class='bg-rose-500/50'></body>" :height="height" v-bind="$attrs" @load="onLoad" />
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
  import { ref } from 'vue'

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
    const [body] = frame.value.contentDocument.getElementsByTagName('body')
    body.appendChild(content.value)
  }
</script>