<template>
  <p-card class="countries">
    <p-text-input v-model="search" class="countries__search" placeholder="Search countries" />

    <div class="countries__content">
      <p-virtual-scroller :items="items" class="countries__scroller">
        <template #default="{ item: { country } }">
          <p-overflow-menu-item class="countries__item" :class="classes.country(country)" @click="toggle(country)">
            {{ country }}

            <p-icon v-if="country === value" size="small" icon="ChevronRightIcon" class="ml-auto" />
          </p-overflow-menu-item>
        </template>
      </p-virtual-scroller>
    </div>
  </p-card>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  const search = ref()
  const continent = defineModel<string | undefined>('continent')
  const value = defineModel<string | undefined>('value')

  const Africa = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cape Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe']
  const Antarctica = ['Antarctica']
  const Asia = [
    'Afghanistan',
    'Bahrain',
    'Bangladesh',
    'Bhutan',
    'Brunei',
    'Myanmar',
    'Cambodia',
    'China',
    'East Timor',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'North Korea',
    'South Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Lebanon',
    'Malaysia',
    'Maldives',
    'Mongolia',
    'Nepal',
    'Oman',
    'Pakistan',
    'Philippines',
    'Qatar',
    'Russian Federation',
    'Saudi Arabia',
    'Singapore',
    'Sri Lanka',
    'Syria',
    'Tajikistan',
    'Thailand',
    'Turkey',
    'Turkmenistan',
    'United Arab Emirates',
    'Uzbekistan',
    'Vietnam',
    'Yemen',
  ]
  const Europe = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City']
  const NorthAmerica = ['Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States']
  const Oceania = ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu']
  const SouthAmerica = ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela']

  const countries: Record<string, string[]> = {
    Africa,
    Antarctica,
    Asia,
    Europe,
    'North America': NorthAmerica,
    Oceania,
    'South America': SouthAmerica,
  }

  const filteredCountries = computed(() => {
    if (!continent.value) {
      return Object.values(countries).flat()
    }

    if (!search.value) {
      return countries[continent.value]
    }

    return countries[continent.value].filter(continent => continent.toLowerCase().includes(search.value.toLowerCase()))
  })

  const items = computed(() => {
    return filteredCountries.value.map((country) => ({
      country,
    }))
  })

  const classes = computed(() => ({
    country: (continent: string) => ({
      'p-overflow-menu-item--active': continent === value.value,
    }),
  }))

  function toggle(country: string): void {
    if (country === value.value) {
      value.value = undefined
    } else {
      value.value = country
    }
  }
</script>


<style>
.countries { @apply
  px-0
  flex
  flex-col
  gap-4
  min-w-64
}

.countries__item { @apply
  text-xs
  rounded
}

.countries__search { @apply
  mx-4
  shrink
  w-auto
}

.countries__search .p-text-input__control { @apply
  text-xs
}

.countries__content { @apply
  overflow-hidden
  max-h-96
  pl-2
  grow
}

.countries__scroller { @apply
  overflow-y-auto
  max-h-96
}
</style>