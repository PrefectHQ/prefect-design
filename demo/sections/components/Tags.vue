<template>
  <ComponentPage
    title="Tags"
    :demos="demos"
    use-resizable
  >
    <template #basic>
      <div class="tags__list">
        <p-tag v-for="index in 3" :key="index">
          {{ index }}
        </p-tag>
      </div>
    </template>

    <template #small>
      <div class="tags__list">
        <p-tag v-for="index in 3" :key="index" small>
          {{ index }}
        </p-tag>
      </div>
    </template>

    <template #using-slot>
      <div class="tags__list">
        <p-tag v-for="item in classes" :key="item.name" :class="item.className" class="tag" icon="TagIcon">
          {{ item.name }}
        </p-tag>
      </div>
    </template>

    <template #multiple>
      <p-tags :tags="numberArr">
        <template #default="{ tag }">
          Number {{ tag.label }}
        </template>
      </p-tags>

      <p-tags :tags="numberArr" small />
    </template>

    <template #using-p-tag-wrapper>
      <div class="flex flex-col gap-3">
        <p-tag-wrapper :tags="numberArr" justify="right" class="flex gap-2" />

        <p-tag-wrapper :tags="numberArr" justify="center" class="flex gap-2" />

        <p-tag-wrapper :tags="numberArr" justify="left" class="flex gap-2" />

        <p-tag-wrapper :tags="numberArr">
          <template #tag="{ tag }">
            <p-tag icon="Prefect">
              {{ tag }}
            </p-tag>
          </template>

          <template #overflow-tags="{ overflowedChildren }">
            <div class="text-subdued">
              +{{ overflowedChildren }}
            </div>
          </template>
        </p-tag-wrapper>

        <p-tag-wrapper justify="right">
          <p-tag v-for="i in 20" :key="i">
            Tag {{ i }}
          </p-tag>
        </p-tag-wrapper>

        <div>
          <p>Inline</p>
          <div class="border border-default p-2 max-w-full">
            <p-tag-wrapper :tags="numberArr" justify="left" inline class="border border-default" />
          </div>
        </div>
      </div>
    </template>

    <template #async-tag-wrapper>
      <div class="flex flex-col gap-3">
        <div>
          <p-button small @click="resetAsyncTags">
            Refresh
          </p-button>
        </div>

        <p-tag-wrapper :tags="asyncTagsNormalized" justify="right" inline />

        <p-tag-wrapper>
          <template v-for="tag in asyncTags" :key="tag.id">
            <p-tag :class="tag.tailwindClass">
              {{ tag.label }}
            </p-tag>
          </template>
        </p-tag-wrapper>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import { TagValue } from '@/types'
  import { randomId } from '@/utilities'
  import { computed, onMounted, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Small' },
    { title: 'Using Slot' },
    { title: 'Multiple' },
    { title: 'Using p-tag-wrapper' },
    { title: 'Async Tag Wrapper' },
  ]
  const numberArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']

  const classes = [
    { className: 'tag--completed', name: 'Completed' },
    { className: 'tag--cancelled', name: 'Cancelled' },
    { className: 'tag--failed', name: 'Failed' },
    { className: 'tag--pending', name: 'Pending' },
    { className: 'tag--running', name: 'Running' },
    { className: 'tag--scheduled', name: 'Scheduled' },
  ]

  type AsyncTag = { id: string, label: string, tailwindClass: string }

  const tailwindClasses = ['bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-gray-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
  function getAsyncTags(length: number = 50): AsyncTag[] {
    return Array.from({ length: length }, () => ({ id: randomId(), label: '', tailwindClass: tailwindClasses[Math.floor(Math.random() * tailwindClasses.length)] }))
  }
  const asyncTags = ref<AsyncTag[]>(getAsyncTags())
  const loading = ref(false)

  const timeouts: (NodeJS.Timeout | null)[] = []

  function updateAsyncTags(): Promise<void> {
    timeouts.forEach((timeout) => {
      if (timeout) {
        clearTimeout(timeout)
      }
    })

    return new Promise((resolve) => {
      asyncTags.value.forEach((tag, index) => {
        const timeout = setTimeout(() => {
          asyncTags.value[index].label = numberArr[Math.floor(Math.random() * numberArr.length)]
          if (index === asyncTags.value.length - 1) {
            resolve()
          }
        }, Math.floor(Math.random() * 1000) + 1000)

        timeouts.push(timeout)
      })
    })
  }

  const asyncTagsNormalized = computed<TagValue[]>(() => {
    return asyncTags.value.map((tag) => ({ label: tag.label, value: tag.id }))
  })

  async function resetAsyncTags(): Promise<void> {
    asyncTags.value = getAsyncTags()
    loading.value = true
    await updateAsyncTags()
    loading.value = false
  }

  onMounted(() => {
    resetAsyncTags()
  })
</script>

<style>
:root {
  --completed: #2AC769;
  --cancelled: #3D3D3D;
  --failed: #FB4E4E;
  --pending: #EBEEF7;
  --running: #1860F2;
  --scheduled: #FCD14E;
}

.tags__list { @apply
  flex
  gap-1
}

.tag:is(.tag--completed,.tag--cancelled, .tag--failed, .tag--running) {@apply
  text-default
}

.tag:is(.tag--pending,.tag--scheduled) {@apply
  text-inverse
}

.tag.tag--completed {
  background-color: var(--completed);
}

.tag.tag--cancelled {
  background-color: var(--cancelled);
}

.tag.tag--failed{
  background-color: var(--failed);
}

.tag.tag--pending{
  background-color: var(--pending);
}

.tag.tag--running{
  background-color: var(--running);
}

.tag.tag--scheduled {
  background-color: var(--scheduled);
}
</style>
