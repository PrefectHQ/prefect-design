<template>
  <Section heading="Key/Value Display">
    <SubSection heading="Default">
      <p-key-value label="Flow Run ID" value="3fa85f64" alternate />

      <br>

      <p-key-value alternate>
        <template #label>
          <div class="text-pink-400 uppercase">
            Created
          </div>
        </template>
        <template #value>
          {{ new Date().toISOString().slice(0, 10) }}
        </template>
      </p-key-value>

      <br>

      <p-key-value label="This should say 'None' below" alternate />

      <br>

      <p-key-value label="This uses an empty slot" alternate>
        <template #empty>
          None - <span class="key-value-section__turtles">Ninja turtles</span>
        </template>
      </p-key-value>
    </SubSection>

    <SubSection heading="Alt" class="grid gap-4">
      <p-key-value label="Group" value="Ninja Turtles">
        <template #value>
          <span class="key-value-section__turtles">Ninja turtles</span>
        </template>
      </p-key-value>


      <p-key-value label="Story">
        <template #value>
          Leonardo is the most disciplined and skilled turtle; an expert swordsman, he wields two katana and wears a blue bandana. Raphael, the strongest and most reckless turtle, wears a red bandana and uses a pair of sai. Donatello uses his intellect to invent gadgets and vehicles; he wears a purple mask and uses a bo staff. Michelangelo is the least disciplined and most fun-loving turtle, and is usually portrayed as the most agile. He wears an orange bandana and uses nunchucks.
        </template>
      </p-key-value>


      <p-divider />

      <p-key-value label="Leader" value="Leonardo" />
      <p-key-value label="Brains" value="Donatello" />
      <p-key-value label="Brawn" value="Raphael" />
      <p-key-value label="Comic Relief" value="Michelangelo" />

      <p-divider />

      <p-key-value label="Weaknesses">
        <template #empty>
          Absolutely none whatsoever
        </template>
      </p-key-value>

      <p-divider />

      <p-key-value label="Nemesis" value="Shredder, Karai, Baxter Stockman, Krang" />
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
  import SubSection from '../components/SubSection.vue'
</script>

<style>
.key-value-section__turtles {
  background-image: linear-gradient(to left, #E3331C, #EA9500, #4C9C23, #00AAE6, #995AA0);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>