<template>
  <div class="p-layout-table">
    <div class="p-layout-table__controls-header">
      <slot name="controls-header">
        <div class="p-layout-table__controls__section p-layout-table__controls__section--start">
          <slot name="controls-header__start" />
        </div>

        <div class="p-layout-table__controls__section p-layout-table__controls__section--end">
          <slot name="controls-header__end" />
        </div>
      </slot>
    </div>

    <slot />

    <div class="p-layout-table__controls-footer">
      <slot name="controls-footer">
        <div class="p-layout-table__controls__section p-layout-table__controls__section--start">
          <slot name="controls-footer__start" />
        </div>

        <div class="p-layout-table__controls__section p-layout-table__controls__section--end">
          <slot name="controls-footer__end" />
        </div>
      </slot>
    </div>
  </div>
</template>

<style>
.p-layout-table__controls-header { @apply
  flex
  justify-between
  items-center
  mb-2
  sticky
  top-0
  bg-white
  bg-opacity-90
  py-2
  z-10
}

.p-layout-table__controls-footer { @apply
  flex
  justify-between
  items-center
  mt-2
  bg-white
  bg-opacity-90
  py-2
  z-10
}

.p-layout-table__controls__section { @apply
  flex
  gap-2
  items-center
}

.p-layout-table__controls__section--start { @apply
  mr-auto
}

.p-layout-table__controls__section--end { @apply
  ml-auto
}

.p-layout-table__row__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>