<template>
  <div class="p-navigation-bar">
    <template v-if="$slots.leading">
      <div class="p-navigation-bar__leading">
        <slot name="leading" />
      </div>
    </template>
    <div class="p-navigation-bar__content">
      <slot />
    </div>
    <template v-if="$slots.trailing">
      <div class="p-navigation-bar__trailing">
        <slot name="trailing" />
      </div>
    </template>
  </div>
</template>

<style>
.p-navigation-bar { @apply
  grid
}
</style>