import * as heroIcons from '@heroicons/vue/solid'
import * as prefectIcons from '@/components/Icon/icons'

export type HeroIcon = keyof typeof heroIcons
export type PrefectIcon = keyof typeof prefectIcons
export type Icon = HeroIcon | PrefectIcon