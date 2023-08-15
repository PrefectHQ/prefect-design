<template>
  <ComponentPage
    title="CodeHighlight"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
      { title: 'Markdown' },
      { title: 'Python' },
      { title: 'Vue' },
      { title: 'JavaScript' },
      { title: 'Jinja' },
      { title: 'HTML' },
      { title: 'CSS' },
      { title: 'YAML' },
      { title: 'Long lines' },
    ]"
  >
    <template #description>
      <p-code inline>
        PCodeHighlight
      </p-code> is a wrapper around <p-code inline>
        PCode
      </p-code> that adds syntax highlighting via <p-link href="https://github.com/highlightjs/highlight.js">
        highlight.js
      </p-link>.

      <div>
        <p-checkbox v-model="showLineNumbers" label="Show line numbers" />
      </div>
    </template>

    <template #inline>
      This should be an inline <PCodeHighlight :text="inlineContent" inline lang="javascript" /> block.
    </template>

    <template #markdown>
      <PCodeHighlight :text="markdownContent" lang="gh-markdown" :show-line-numbers="showLineNumbers" />
    </template>

    <template #vue>
      <PCodeHighlight :text="vueContent" lang="vue" :show-line-numbers="showLineNumbers" />
    </template>

    <template #python>
      <PCodeHighlight :text="pythonContent" lang="python" :show-line-numbers="showLineNumbers" />
    </template>

    <template #yaml>
      <PCodeHighlight :text="yamlContent" lang="yaml" :show-line-numbers="showLineNumbers" />
    </template>

    <template #jinja>
      <PCodeHighlight :text="jinjaContent" lang="jinja" :show-line-numbers="showLineNumbers" />
    </template>

    <template #long-lines>
      <PCodeHighlight :text="long" lang="md" :show-line-numbers="showLineNumbers" />
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

  const inlineContent = 'const javascript = "variable"'

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

  const pythonContent = `
greeting = "Hello, World!"

for i in range(10):
  print(greeting)
`.trim()


  const vueContent = `<template>
  <div class="p-card p-background">
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
  p-6
  rounded-default
  shadow-sm
}
</style>
`

  const jinjaContent = `Flow run {{ flow.name }}/{{ flow_run.name }} entered state \`{{ flow_run.state.name }}\` at {{ flow_run.state.timestamp }}.
Flow ID: {{ flow_run.flow_id }}
Flow run ID: {{ flow_run.id }}
Flow run URL: {{ flow_run|ui_url }}
State message: {{ flow_run.state.message }}

{% for i in range(11) %}
  {{ i }}
{% endfor %}
`

  const long = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  const yamlContent = `---
doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
  - huey
  - dewey
  - louie
  - fred
xmas-fifth-day:
  calling-birds: four
  french-hens: 3
  golden-rings: 5
  partridges:
    count: 1
    location: "a pear tree"
  turtle-doves: two`
</script>