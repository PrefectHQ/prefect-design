<template>
  <ComponentPage
    title="Code"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
      { title: 'Markdown' },
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

      <div>
        <p-checkbox v-model="showLineNumbers" label="Show line numbers" />
      </div>
    </template>

    <template #inline>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          This should be an inline <PCodeHighlight :text="inlineContent" lang="javascript" /> block.
        </template>
        <template #code>
          <PCodeHighlight :text="inlineCodeExample" multiline lang="vue" :show-line-numbers="showLineNumbers" />
        </template>
      </p-tabs>
    </template>

    <template #markdown>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="markdownContent" multiline lang="gh-markdown" :show-line-numbers="showLineNumbers" />
        </template>
        <template #code>
          {{ markdownContent }}
        </template>
      </p-tabs>
    </template>

    <template #vue>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="vueContent" multiline lang="vue" :show-line-numbers="showLineNumbers" />
        </template>
        <template #code>
          <PCodeHighlight :text="vueCodeExample" multiline lang="vue" :show-line-numbers="showLineNumbers" />
        </template>
      </p-tabs>
    </template>

    <template #python>
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="pythonContent" multiline lang="python" :show-line-numbers="showLineNumbers" />
        </template>
        <template #code>
          <PCodeHighlight :text="pythonCodeExample" multiline lang="vue" :show-line-numbers="showLineNumbers" />
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
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const showLineNumbers = ref(false)

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

  const markdownContent = `# Heading 1
  
## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<!-- This is a comment -->

Paragraph

**Bold**

*Italic*

~~Strikethrough~~

\`Inline code\`

\`\`\`javascript

const javascript = "variable"

\`\`\`

\`\`\`python

python = "one of the languages"

for i in range(10):
  print(python)

\`\`\`

[Link](https://google.com)

> Blockquote

- List item 1

- List item 2

- List item 3

1. List item 1

2. List item 2

3. List item 3

| Table | Heading 1 | Heading 2 |
| --- | --- | --- |
| Row 1 | Column 1 | Column 2 |
| Row 2 | Column 1 | Column 2 |
| Row 3 | Column 1 | Column 2 |
`

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

<script lang="ts" setup>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PCard',
  })
<\/script>

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