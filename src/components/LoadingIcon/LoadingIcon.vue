<template>
  <div class="p-loading-icon">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<style>
.p-loading-icon div {
  animation: loading-icon 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @apply
  absolute
  w-4
  h-4
  border-2
  border-current
  border-r-transparent
  border-b-transparent
  border-l-transparent
  rounded-[50%]
  top-[50%]
  left-[50%]
}

.p-loading-icon div:nth-child(1) {
  animation-delay: -450ms;
}

.p-loading-icon div:nth-child(2) {
  animation-delay: -300ms;
}

.p-loading-icon div:nth-child(3) {
  animation-delay: -150ms;
}

@keyframes loading-icon {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>