<template>
  <ComponentPage title="Markdown Renderer" :demos="[{ title: 'Markdown Renderer' }]">
    <template #description>
      <p-code inline>
        p-markdown-renderer
      </p-code> is a component that renders a Vue component tree from markdown.
    </template>

    <p-tabs v-model:selected="tab" :tabs="['Tokens', 'Interactive', 'Live']">
      <template #tokens>
        <div>
          <PMarkdownRenderer :text="heading1" />
          <PMarkdownRenderer :text="heading2" />
          <PMarkdownRenderer :text="heading3" />
          <PMarkdownRenderer :text="heading4" />
          <PMarkdownRenderer :text="heading5" />
          <PMarkdownRenderer :text="heading6" />
          <PMarkdownRenderer :text="paragraph" />

          <PMarkdownRenderer :text="strikethrough" />
          <PMarkdownRenderer :text="emphasis" />
          <PMarkdownRenderer :text="strong" />
          <PMarkdownRenderer :text="orderedList" />
          <PMarkdownRenderer :text="unorderedList" />
          <PMarkdownRenderer :text="taskList" />
          <PMarkdownRenderer :text="checkbox" />
          <PMarkdownRenderer :text="inlineCode" />
          <PMarkdownRenderer :text="fencedCodeBlock" />
          <PMarkdownRenderer :text="highlightedCodeBlock" />

          <PMarkdownRenderer :text="image" />
          <PMarkdownRenderer :text="link" />
          <PMarkdownRenderer :text="anchor" />

          <PMarkdownRenderer :text="lineBreak" />
          <PMarkdownRenderer :text="horizontalRule" />

          <PMarkdownRenderer :text="blockQuote" />
          <PMarkdownRenderer :text="nestedBlockQuote" />
        </div>
      </template>

      <template #live>
        <p-card class="markdown-renderer__live">
          <p-label class="markdown-renderer__select" label="README.md">
            <p-select v-model="selectedMarkdown" :options="options" />
          </p-label>

          <p-tabs v-model:selected="liveTab" :tabs="['Parsed', 'Raw']">
            <template #parsed>
              <div>
                <PMarkdownRenderer :text="markdownRef" :link-base-url="getGitHubBaseUrl(selectedMarkdown)" />
              </div>
            </template>

            <template #raw>
              <p-code-highlight :text="markdownRef" class="markdown-renderer__raw" show-line-numbers lang="markdown" />
            </template>
          </p-tabs>
        </p-card>
      </template>

      <template #interactive>
        <div class="markdown-renderer__interactive">
          <p-code-input v-model="interactiveRef" lang="markdown" show-line-numbers class="markdown-renderer__interactive-input" />


          <div class="markdown-renderer__interactive-preview">
            <PMarkdownRenderer :text="interactiveRef" />
          </div>
        </div>
      </template>
    </p-tabs>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs } from '@/components'
  import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'
  import { SelectOptionNormalized } from '@/types/selectOption'
  import { ref, watch } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const heading1 = '# Heading 1'
  const heading2 = '## Heading 2'
  const heading3 = '### Heading 3'
  const heading4 = '#### Heading 4'
  const heading5 = '##### Heading 5'
  const heading6 = '###### Heading 6'
  const paragraph = 'paragraph\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  const strikethrough = '~~strikethrough~~'
  const emphasis = '_emphasis_'
  const strong = '**strong**'
  const inlineCode = '`inline = "code block"`'
  const checkbox = '- [x] checkbox'
  const unorderedList = '- unordered list item 1\n- unordered list item 2\n- unordered list item 3'
  const orderedList = '1. ordered list item 1\n2. ordered list item 2\n3. ordered list item 3'
  const taskList = '- [x] task list item 1\n- [ ] task list item 2\n- [ ] task list item 3'
  const link = '[link](https://google.com)'
  const lineBreak = 'line break before\nline break after'
  const horizontalRule = '\nhorizontal rule before\n\n---\n\nhorizontal rule after\n'
  const anchor = '[anchor](#heading-1)'
  const image = '![image](https://via.placeholder.com/200/024DFD/FFFFFF?text=image)'
  const fencedCodeBlock = '\n```\nfenced = "code block"\n```\n'
  const highlightedCodeBlock = '\n```py\nhighlighted_fenced = "code block"\n```\n'

  const blockQuote = '> Block quote'
  const nestedBlockQuote = `
  > Rendering in block quotes:
  > ${paragraph}
  > ${emphasis}
  > ${strong}
  > ${strikethrough}
  > ${link}
  > ${anchor}
  >
  > ${inlineCode}
  > \`\`\`
  > fenced = "code block"
  > \`\`\`
  >
  > \`\`\`py
  > highlighted_fenced = "code block"
  > \`\`\`
  > ${blockQuote} nested
  > 
  > ${heading1}
  > ${heading2}
  > ${heading3}
  > ${heading4}
  > ${heading5}
  > ${heading6}
  > ${image}
  > ${lineBreak}
  > horizontal rule before
  > ---
  > horizontal rule after
  > - unordered list item 1
  > - unordered list item 2
  > - unordered list item 3
  > 1. ordered list item 1
  > 2. ordered list item 2
  > 3. ordered list item 3
  > - [x] task list item 1
  > - [ ] task list item 2
  > - [ ] task list item 
  `

  const getGitHubBaseUrl = (repo: string): string => `https://github.com/${repo}/raw/main`
  const options: (SelectOptionNormalized & { url: string })[] = [
    { label: 'Prefect', value: 'prefecthq/prefect', url: 'https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md' },
    { label: 'Orion Design', value: 'prefecthq/orion-design', url: 'https://raw.githubusercontent.com/PrefectHQ/orion-design/main/README.md' },
    { label: 'Vue Compositions', value: 'prefecthq/vue-compositions', url: 'https://raw.githubusercontent.com/PrefectHQ/vue-compositions/main/README.md' },
    { label: 'Microbundle', value: 'developit/microbundle', url: 'https://raw.githubusercontent.com/developit/microbundle/master/README.md' },
    { label: 'Fiber', value: 'gofiber/fiber', url: 'https://raw.githubusercontent.com/gofiber/fiber/master/.github/README.md' },
  ]
  const selectedMarkdown = ref('developit/microbundle')
  const tab = ref('Tokens')
  const liveTab = ref('Parsed')

  const user1 = 'xXXpossiblyviewerXXx'
  const user2 = 'boomerangstaysail15'
  const user3 = 'endurable_giraffe11'
  const interactiveRef = ref(`# Chat history

**${user1}**: hey
**${user1}**: can i trade
**${user1}**: items
**${user1}**: well can i see your item
**${user2}**: which one?
**${user1}**: the scroched
**${user1}**: can i just see it
**${user2}**: i can't it's my friend's
**${user1}**: can i see it for a sec
**${user1}**: whats ur friends name
**${user2}**: no
**${user1}**: its my brother's item
**${user2}**: what ur brothers name
**${user1}**: ${user3}

---

_**${user1}** has changed their name to **${user3}**_

---

**${user3}**: hey its me ur brother
**${user1}**: no its not
**${user3}**: yes

---

_**${user3}** has asked to trade with you_

---

_**${user3}** has changed their name to **${user1}**_

`)

  const markdownRef = ref('')
  const getMarkdown = async (): Promise<void> => {
    const url = options.find(option => option.value == selectedMarkdown.value)?.url
    if (!url) {
      return
    }
    markdownRef.value = await fetch(url).then(res => res.text())
  }
  watch(selectedMarkdown, getMarkdown, { immediate: true })
</script>

<style>
.markdown-renderer__select { @apply
  mb-4
  max-w-sm
  ml-auto
}

.markdown-renderer__section-header { @apply
  mb-4
  border-b
  border-b-foreground-200
  text-2xl
  font-semibold
}

.markdown-renderer__live { @apply
  bg-background-400
}

.markdown-renderer__interactive,
.markdown-renderer__live { @apply
  my-12
}

.markdown-renderer__raw { @apply
  bg-background-600
  dark:bg-background-400
  overflow-auto
  pl-0
  max-w-full
  w-full
}

.markdown-renderer__interactive { @apply
  flex
  flex-col
  items-stretch
  justify-items-stretch
  gap-12
  md:flex-row
  h-96
}

.markdown-renderer__interactive-input { @apply
  w-full
}

.markdown-renderer__interactive-preview { @apply
  w-full
  h-96
  overflow-auto
}
</style>