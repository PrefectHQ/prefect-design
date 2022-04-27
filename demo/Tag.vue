<template>
  <p-tag v-for="index in 3" :key="index">
    {{ index }}
  </p-tag>
  <div class="my-2">
    <p-tag v-for="item in classes" :key="item.name" :class="item.className" class="tag" icon="TagIcon">
      {{ item.name }}
    </p-tag>
  </div>

  <div class="my-2">
    <p-tag v-for="item in ['completed', 'cancelled', 'failed']" :key="item" icon="TagIcon" flat :class="`tag--${item}-flat`">
      {{ item }}
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
.tag {@apply
 rounded-md
}
.tag:is(.tag--completed,.tag--cancelled, .tag--failed, .tag--running) {@apply
  text-slate-50
}

.tag:is(.tag--pending,.tag--scheduled) {@apply
  text-slate-800
}

.tag--completed {@apply
  bg-state-colors-completed
}

.tag--completed-flat .p-tag--icon{@apply
  text-state-colors-completed
}
.tag--cancelled-flat .p-tag--icon{@apply
  text-state-colors-cancelled
}
.tag--failed-flat .p-tag--icon{@apply
  text-state-colors-failed
}

.tag--cancelled { @apply
  bg-state-colors-cancelled
}

.tag--failed{ @apply
  bg-state-colors-failed
}

.tag--pending{ @apply
  bg-state-colors-pending
}

.tag--running{ @apply
  bg-state-colors-running
}

.tag--scheduled { @apply
  bg-state-colors-scheduled
}
</style>

