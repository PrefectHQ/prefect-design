<template>
  <div class="p-layout-grid">
    <div v-if="$slots.header || $slots['header-leading'] || $slots['header-trailing']" class="p-layout-grid__header">
      <slot name="header">
        <div class="p-layout-grid__header-leading">
          <slot name="header-leading" />
        </div>
        <div class="p-layout-grid__header-trailing">
          <slot name="header-trailing" />
        </div>
      </slot>
    </div>
    <div v-if="$slots.toolbar || $slots['toolbar-leading'] || $slots['toolbar-trailing']" class="p-layout-grid__toolbar">
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
      <div v-if="$slots['main-leading']" class="p-layout-grid__main-leading">
        <slot name="main-leading" />
      </div>
      <div class="p-layout-grid__content">
        <slot />
      </div>
      <div v-if="$slots['main-trailing']" class="p-layout-grid__main-trailing">
        <slot name="main-trailing" />
      </div>
    </main>
  </div>
</template>

 <style>
  .p-layout-grid {
    @apply
    w-full
    h-screen
    border-l
    flex
    flex-col
    border-[color:var(--p-color-divider-subdued)];
  }

  .p-layout-grid__toolbar,
  .p-layout-grid__header {
    @apply
    border-b
    border-[color:var(--p-color-divider-subdued)]
    flex
    justify-between
    pl-8
    pr-4
  }

  .p-layout-grid__header {
    @apply
    h-14
    min-h-14
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
    flex-1
    h-[calc(100%-theme('spacing.12')-theme('spacing.14'))]
    w-full
    relative
    overflow-auto
    flex-nowrap;
  }

  .p-layout-grid__content {
    @apply
    flex-1
    border-[color:var(--p-color-divider-subdued)];
  }
  .p-layout-grid__main-leading {
    @apply
    flex-shrink
    border-r
    pt-3
    px-8
    border-[color:var(--p-color-divider-subdued)];
  }
  .p-layout-grid__main-trailing {
    @apply
    border-l
    px-4
    pt-3
    border-[color:var(--p-color-divider-subdued)]
  }
 </style>