<template>
  <div class="p-card">
    <slot />
  </div>
</template>

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

.p-card .p-code-highlight { @apply
  px-4
  py-2
  dark:bg-slate-600
  bg-slate-200
}

.p-card .p-code-highlight__code-wrapper {
  color: unset;
}
</style>