<template>
  <Section heading="Tags">
    <SubSection heading="Plain">
      <p-tag v-for="index in 3" :key="index">
        {{ index }}
      </p-tag>
    </SubSection>
    <SubSection heading="Custom">
      <p-tag v-for="item in classes" :key="item.name" :class="item.className" class="tag" icon="TagIcon">
        {{ item.name }}
      </p-tag>
    </SubSection>
    <SubSection heading="Block Wrapper (with padding)">
      <ResizableSection>
        <div class="bg-slate-200 absolute h-full left-[50px] right-[50px]" />
        <div class="bg-white px-[50px]">
          <p-tag-wrapper class="h-[48px]" :tags="numberArr" />

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

          <p-tag-wrapper class="h-[48px]">
            <p-tag v-for="i in 20" :key="i">
              Tag {{ i }}
            </p-tag>
          </p-tag-wrapper>
        </div>
      </ResizableSection>
    </SubSection>

    <SubSection heading="Flexed Wrapper">
      <ResizableSection>
        <div class="w-screen flex align-middle justify-items-stretch">
          <div class="w-full h-[200px] bg-rose-500">
            <p-tag-wrapper :tags="numberArr" />
          </div>
          <div class="w-full h-[200px] bg-slate-500">
            <p-tag-wrapper :tags="numberArr">
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
          </div>

          <div class="w-full h-[200px] bg-amber-500">
            <p-tag-wrapper>
              <p-tag v-for="i in 20" :key="i">
                Tag {{ i }}
              </p-tag>
            </p-tag-wrapper>
          </div>
        </div>
      </ResizableSection>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
  import Section from '../components/Section.vue'
  import SubSection from '../components/SubSection.vue'
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'

  const numberArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']

  const classes = [
    { className: 'tag--completed', name: 'Completed'  },
    { className: 'tag--cancelled', name: 'Cancelled'  },
    { className:  'tag--failed',  name: 'Failed'  },
    { className: 'tag--pending',  name: 'Pending'  },
    { className:  'tag--running',  name: 'Running'  },
    { className:  'tag--scheduled', name: 'Scheduled'  },
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

.tag--completed {
  background-color: var(--completed)
}

.tag--cancelled {
  background-color: var(--cancelled)
}

.tag--failed{
  background-color: var(--failed)
}

.tag--pending{
  background-color: var(--pending)
}

.tag--running{
  background-color: var(--running)
}

.tag--scheduled {
  background-color: var(--scheduled)
}
</style>

