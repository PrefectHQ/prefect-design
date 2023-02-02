<template>
  <ComponentPage
    title="Tags"
    :demos="[
      { title: 'Basic' },
      { title: 'Using Slot' },
      { title: 'Using p-tag-wrapper' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code inline>
        p-tags
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <p-tag v-for="index in 3" :key="index">
        {{ index }}
      </p-tag>
    </template>

    <template #using-slot>
      <p-tag v-for="item in classes" :key="item.name" :class="item.className" class="tag" icon="TagIcon">
        {{ item.name }}
      </p-tag>
    </template>

    <template #using-p-tag-wrapper>
      <div class="flex flex-col gap-3">
        <p-tag-wrapper class="h-[48px]" :tags="numberArr" justify="left" />

        <p-tag-wrapper class="h-[48px]" :tags="numberArr">
          <template #tag="{ tag }">
            <p-tag icon="Prefect">
              {{ tag }}
            </p-tag>
          </template>

          <template #overflow-tags="{ overflowedChildren }">
            <div class="text-prefect-600">
              +{{ overflowedChildren }}
            </div>
          </template>
        </p-tag-wrapper>

        <p-tag-wrapper class="h-[48px]" justify="right">
          <p-tag v-for="i in 20" :key="i">
            Tag {{ i }}
          </p-tag>
        </p-tag-wrapper>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const numberArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']

  const classes = [
    { className: 'tag--completed', name: 'Completed' },
    { className: 'tag--cancelled', name: 'Cancelled' },
    { className: 'tag--failed', name: 'Failed' },
    { className: 'tag--pending', name: 'Pending' },
    { className: 'tag--running', name: 'Running' },
    { className: 'tag--scheduled', name: 'Scheduled' },
  ]
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

.tag {@apply
 rounded-md
}
.tag:is(.tag--completed,.tag--cancelled, .tag--failed, .tag--running) {@apply
  text-slate-50
}

.tag:is(.tag--pending,.tag--scheduled) {@apply
  text-slate-800
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
