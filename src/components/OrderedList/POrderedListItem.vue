<template>
  <li class="p-ordered-list-item">
    <slot>
      <div class="p-ordered-list-item__left-container">
        <slot name="left" />
      </div>

      <div class="p-ordered-list-item__center-container">
        <div class="p-ordered-list-item__node-container">
          <slot name="node">
            <POrderedListNode />
          </slot>
        </div>
      </div>

      <div class="p-ordered-list-item__right-container">
        <slot name="right" />
      </div>
    </slot>
  </li>
</template>

<style>
.p-ordered-list-item { @apply
  flex
  items-start
  relative
  justify-center
  py-4
  box-content
}


.p-ordered-list-item__right-container,
.p-ordered-list-item__left-container { @apply
  self-center
  flex-1
}

.p-ordered-list-item__left-container { @apply
  text-right
}

.p-ordered-list-item__right-container { @apply
  text-left
}


.p-ordered-list-item__center-container,
.p-ordered-list-item__node-container { @apply
  self-stretch
  shrink
  grow-0
  flex
  flex-row
  items-center
  justify-center
}

.p-ordered-list-item__node-container { @apply
  pt-1
  min-w-[2.5rem]
  mx-4
  z-[1]
}

.p-ordered-list-item__center-container::before { @apply
  absolute
  top-0
  left-1/2
  bottom-0
  w-px
  h-full
  -translate-x-1/2
  bg-foreground-200
  dark:bg-foreground-300
  z-0
  ;

  content: '';
}
</style>