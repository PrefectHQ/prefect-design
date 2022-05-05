<template>
  <div class="p-tab">
    <div class="sm:p-tab-mobile">
      <div class="border-b border-gray-200">
        <button
          class="p-tab__button"
          type="button"
        >
          <span
            class="p-tab__span"
          >
            <slot>Tab</slot>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.p-tab {@apply
  inline-flex
  mr-2
}
.p-tab-mobile {@apply
  block
}

.p-tab__button {@apply
  -mb-px
}
.p-tab__span {@apply
  inline-flex
  items-center
  py-4
  px-1
  border-transparent
  text-gray-500
  hover:text-gray-700
  hover:border-gray-300
  whitespace-nowrap
}
.p-tab__span-active {@apply
  border-b-2
  font-medium
  text-sm
  border-indigo-500
  text-indigo-600
}
</style>