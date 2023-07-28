<template>
  <ComponentPage
    title="List Truncate"
    :demos="demos"
  >
    <template #basic>
      <PListTruncate :items="items">
        <template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>
      </PListTruncate>
    </template>

    <template #custom-button-label>
      <PListTruncate :items="items" button-label="Load more books">
        <template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>
      </PListTruncate>
    </template>

    <template #custom-increment>
      <PListTruncate :items="items" :shown="1" :increment="1">
        <template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>
      </PListTruncate>
    </template>

    <template #show-fewer>
      <PListTruncate :items="items" :decrement="5">
        <template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>

        <template #bottom="{ showLess, canShowLess, canShowMore, showMore }">
          <template v-if="canShowLess">
            <p-button class="p-list-truncate__button" @click="showLess">
              Show fewer
            </p-button>
          </template>

          <template v-if="canShowMore">
            <p-button class="p-list-truncate__button" @click="showMore">
              Show more
            </p-button>
          </template>
        </template>
      </PListTruncate>
    </template>

    <template #async>
      <PListTruncate :items="asyncItems" :shown="Infinity">
        <template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>

        <template #bottom>
          <p-button
            v-if="asyncItems.length < items.length"
            class="p-list-truncate__button"
            :loading="loading"
            @click="loadMore"
          >
            Load more
          </p-button>
        </template>
      </PListTruncate>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PListTruncate from '@/components/ListTruncate/PListTruncate.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Custom button label' },
    { title: 'Custom increment' },
    { title: 'Show fewer' },
    { title: 'Async' },
  ]

  const books = [
    "The Philosopher's Pizza",
    'A Tale of Two Teapots',
    'The Great Gastropod',
    'Pride and Pyrotechnics',
    'Mystery of the Missing Muffin',
    'Lord of the Light Bulbs',
    'Cabbages and Kings: A Culinary Adventure',
    'Socks and Sorcery',
    'The Llama at the End of the Universe',
    'To Grill a Mockingbird',
    'The Wombat in the Wardrobe',
    'The Broccoli Chronicles',
    'Journey to the Center of the Sofa',
    '20,000 Leeks Under the Sea',
    'Nineteen Eighty-Fork',
    'Brave New Whirled Peas',
    'Gone with the Waffles',
    'The Secret Life of Potted Plants',
    'Moonwalking with Penguins: An Arctic Odyssey',
    'Life, the Universe, and Cupcakes',
  ]

  const items = ref(Array.from({ length: 20 }, (_, i) => ({ id: i, title: books[i] })))

  const asyncItems = ref(Array.from({ length: 5 }, (_, i) => ({ id: i, title: books[i] })))

  const loading = ref(false)

  const loadMore = async (): Promise<void> => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))

    const startingLength = asyncItems.value.length
    asyncItems.value = Array.from({ length: startingLength + 5 }, (_, i) => ({ id: i, title: books[i] }))
    loading.value = false
  }
</script>