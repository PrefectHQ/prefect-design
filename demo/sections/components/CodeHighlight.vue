<template>
  <ComponentPage
    title="Code"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
      { title: 'Python' },
      { title: 'Vue' },
      { title: 'JavaScript' },
      { title: 'HTML' },
      { title: 'CSS' },
    ]"
  >
    <template #description>
      <p-code>PCodeHighlight</p-code> is a wrapper around <p-code>PCode</p-code> that adds syntax highlighting via <p-link href="https://github.com/highlightjs/highlight.js">
        highlight.js
      </p-link>.

      <PCodeHighlight :text="inlineCodeExample" multiline lang="vue" />
    </template>

    <template #inline>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          This should be an inline <PCodeHighlight :text="inlineContent" lang="javascript" /> block.
        </template>
        <template #code>
          <PCodeHighlight :text="inlineCodeExample" multiline lang="vue" />
        </template>
      </p-tabs>
    </template>

    <template #vue>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="vueContent" multiline lang="vue" />
        </template>
        <template #code>
          <PCodeHighlight :text="vueCodeExample" multiline lang="vue" />
        </template>
      </p-tabs>
    </template>

    <template #python>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="pythonContent" multiline lang="python" />
        </template>
        <template #code>
          <PCodeHighlight :text="pythonCodeExample" multiline lang="vue" />
        </template>
      </p-tabs>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape  */
  // ^^eslint doesn't know the difference between a necessary and a useless escape
  // in a <\/script> tag (try removing the one in this comment lol)
  import { PCode } from '@/components'
  import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const template = (content: string): string => `<template>\n  ${content}\n</template>`
  const script = (content: string): string => `<script lang="ts" setup>\n  ${content}\n<\/script>`
  const style = (content: string): string => `<style>\n${content}\n<\/style>`
  const codeHighlight = (text: string, lang: string): string => `<PCodeHighlight :text="${text}" lang="${lang}" />`

  const sfc = (options: {
    templateContent?: string,
    scriptContent?: string,
    styleContent?: string,
  }): string => {
    const { templateContent, scriptContent, styleContent } = options
    const content = []
    if (templateContent) {
      content.push(template(templateContent))
    }
    if (scriptContent) {
      content.push(script(scriptContent))
    }
    if (styleContent) {
      content.push(style(styleContent))
    }

    return content.join('\n\n')
  }

  const inlineContent = 'const javascript = "variable"'
  const inlineCodeExample = sfc({
    templateContent: `This should be an inline ${codeHighlight('inlineContent', 'javascript')} block.`,
    scriptContent: `const inlineContent = '${inlineContent}'`,
  })

  const pythonContent = `greeting = "Hello, World!"

for i in range(10):
  print(greeting)
`
  const pythonCodeExample = sfc({
    templateContent: '<PCodeHighlight :text="pythonContent" lang="python" />',
    scriptContent: `const pythonContent = \`${pythonContent}\``,
  })


  const vueContent = `<template>
  <div class="p-card">
    <slot />
  </div>
</template>

<style>
.p-card { @apply
  bg-background
  text-foreground
  border
  border-background-400
  dark:border-foreground-200
  p-6
  rounded-lg
  shadow-sm
}
</style>
`
  const vueCodeExample = sfc({
    templateContent: '<PCodeHighlight :text="vueContent" lang="vue" />',
    scriptContent: `const vueContent = \`${vueContent}\``,
  })
</script>