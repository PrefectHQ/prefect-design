<template>
  <div class="resizable-container">
    <p-tag-wrapper>
      <p-tag v-for="i in 20" :key="i" class="resizable-container__tag">
        {{ i }} tag
      </p-tag>
    </p-tag-wrapper>


    <p-tag-wrapper>
      <p-tag v-for="i in 40" :key="i" class="resizable-container__tag">
        {{ i }} tag
      </p-tag>
    </p-tag-wrapper>

    <p-tag-wrapper>
      <p-tag v-for="i in 60" :key="i" class="resizable-container__tag">
        {{ i }} tag
      </p-tag>
    </p-tag-wrapper>
  </div>
</template>

<style>
.resizable-container {
  min-width: 75px;
  max-width: 50%;
  resize: horizontal;
  overflow: hidden;
}

.resizable-container__tag {
  display: inline-block;
}
</style>