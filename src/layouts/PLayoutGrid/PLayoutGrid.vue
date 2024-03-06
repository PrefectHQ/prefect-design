<template>
  <div class="p-layout-grid">
    <div class="p-layout-grid__header">
      <slot name="header">
        <div class="p-layout-grid__header-leading">
          <slot name="header-leading" />
        </div>
        <div class="p-layout-grid__header-trailing">
          <slot name="header-trailing" />
        </div>
      </slot>
    </div>
    <div class="p-layout-grid__toolbar">
      <slot name="toolbar">
        <div class="p-layout-grid__toolbar-leading">
          <slot name="toolbar-leading" />
        </div>
        <div class="p-layout-grid__toolbar-trailing">
          <slot name="toolbar-trailing" />
        </div>
      </slot>
    </div>
    <main class="p-layout-grid__main">
      <div v-if="$slots.left-rail" class="p-layout-grid__left-rail">
        <slot name="left-rail" />
      </div>
      <div class="p-layout-grid__content">
        <slot />
      </div>
      <div class="p-layout-grid__right-rail">
        <slot name="right-rail" />
      </div>
    </main>
  </div>
</template>

 <style>
  .p-layout-grid {
    @apply
    w-full
    h-full
    border-l
    border-[color:var(--p-color-divider)];
  }

  .p-layout-grid__toolbar,
  .p-layout-grid__header {
    @apply
    h-14
    min-h-14
    border-b
    border-[color:var(--p-color-divider)]
    flex
    justify-between
    pl-8
    pr-4
  }

  .p-layout-grid__toolbar {
    @apply
    h-12
    min-h-12
  }

  .p-layout-grid__toolbar-leading,
  .p-layout-grid__header-leading {
    @apply
    self-center
    flex
    flex-none
  }

  .p-layout-grid__toolbar-trailing,
  .p-layout-grid__header-trailing {
    @apply
    self-center
    flex
    flex-none
    justify-end
  }


  .p-layout-grid__main {
    @apply
    flex
    w-full
    flex-nowrap;
  }

  .p-layout-grid__content {
    @apply
    flex-1
    border-[color:var(--p-color-divider)];
  }
  .p-layout-grid__left-rail,
  .p-layout-grid__right-rail {
    @apply
    flex-shrink
    border-l
    border-[color:var(--p-color-divider)];
  }
  .p-layout-grid__left-rail {
    @apply
    pl-8
    border-r
    border-[color:var(--p-color-divider)]
  }
 </style>