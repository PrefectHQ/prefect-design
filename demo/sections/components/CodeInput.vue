<template>
  <ComponentPage
    title="CodeInput"
    :demos="[
      { title: 'Unstyled' },
      { title: 'Markdown' },
      { title: 'Python' },
      { title: 'Vue' },
    ]"
  >
    <template #description>
      <p-code inline>
        PCodeInput
      </p-code> is a wrapper around <p-code inline>
        PCode
      </p-code> and <p-code inline>
        PCodeHighlight
      </p-code> that allows input.

      <div>
        <p-checkbox v-model="showLineNumbers" label="Show line numbers" />
      </div>
    </template>

    <template #unstyled>
      <PCodeInput v-model="vueInput" class="code-input__input" :show-line-numbers="showLineNumbers" />
    </template>

    <template #markdown>
      <PCodeInput v-model="markdownInput" class="code-input__input" lang="gh-markdown" :show-line-numbers="showLineNumbers" />
    </template>

    <template #vue>
      <PCodeInput v-model="vueInput" class="code-input__input" lang="vue" :show-line-numbers="showLineNumbers" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
/* eslint-disable no-useless-escape  */
// ^^eslint doesn't know the difference between a necessary and a useless escape
// in a <\/script> tag (try removing the one in this comment lol)
  import { PCode } from '@/components'
  import PCodeInput from '@/components/CodeInput/PCodeInput.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const showLineNumbers = ref(true)

  const vueInput = ref(`<template>
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
`)

  const markdownInput = ref(`Eloisa to Abelard
=======

by Alexender Pope
-----------
 
### &#169; 1717
 
How happy is the blameless vestal's lot! 
The world forgetting---by the world forgot.

Eternal sunshine of the   
spotless mind!

Each *pray'r accepted*, each **wish resign'd**, 
\`Labour\`, and ~~rest~~ .

That equal periods keep:

  * Obedient
  * Slumbers
  * Wake
  * Weep

Numbered Lists:

  1. Desires
  2. Composed
  3. Affections
  4. Ev'n

Tears that delight,
And sighs that waft to heav'n

 *[Alexander Pope](https://www.poetryfoundation.org/poems/44892/eloisa-to-abelard)*
`)
</script>

<style>
.code-input__input-textarea,
.code-input__input { @apply
  resize
  max-w-full
  h-64
  min-h-[200px]
  min-w-[200px]
}

.code-input__input-textarea { @apply
  bg-background
  text-foreground
  block
  my-2
  w-full
}
</style>