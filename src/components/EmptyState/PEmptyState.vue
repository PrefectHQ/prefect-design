<template>
  <p-card class="p-empty-state">
    <div v-if="$slots.cornerLabel" class="p-empty-state__corner-label">
      <slot name="corner-label" />
    </div>
    <div
      class="p-empty-state__text"
    >
      <div v-if="$slots.icon" class="p-empty-state__icon">
        <slot name="icon" />
      </div>

      <h3 v-if="$slots.heading" class="p-empty-state__heading">
        <slot name="heading" />
      </h3>

      <p v-if="$slots.description" class="p-empty-state__description">
        <slot name="description" />
      </p>

      <slot />

      <div v-if="$slots.actions" class="p-empty-state__actions">
        <slot name="actions" />
      </div>
    </div>
  </p-card>
</template>


<style>
.p-empty-state__corner-label { @apply
  mt-2
  text-right
}

.p-empty-state__text { @apply
  text-center
  p-4
  md:p-10
  lg:p-16
}

.p-empty-state__icon { @apply
  text-subdued
  flex
  items-center
  justify-center
  gap-x-4
}

.p-empty-state__icon .p-icon { @apply
  h-14
  w-14
}

.p-empty-state__heading { @apply
  mt-9
  text-2xl
  font-bold
}

.p-empty-state__description { @apply
  text-subdued
  text-base
  font-normal
  mt-2
}

.p-empty-state__actions { @apply
  mt-6
  flex
  items-center
  gap-2
  justify-center
}
</style>
