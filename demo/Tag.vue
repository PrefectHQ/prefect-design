<template>
  <p-tag v-for="index in 3" :key="index">
    {{ index }}
  </p-tag>
  <div class="my-2">
    <p-tag v-for="item in classes" :key="item.name" :class="item.className" class="tag" icon="TagIcon">
      {{ item.name }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import PTag from '../src/components/Tag/PTag.vue'
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

