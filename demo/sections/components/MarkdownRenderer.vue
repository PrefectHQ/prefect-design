<template>
  <ComponentPage title="Markdown Renderer" :demos="[{ title: 'Markdown Renderer' }]">
    <template #description>
      <p-code inline>
        p-markdown-renderer
      </p-code> is a component that renders a Vue component tree from markdown.
    </template>

    <p-tabs v-model:selected="tab" :tabs="['Tokens', 'Interactive', 'Live']" class="markdown-renderer__tabs">
      <template #tokens>
        <div>
          <PMarkdownRenderer :text="heading1" />
          <PMarkdownRenderer :text="heading2" />
          <PMarkdownRenderer :text="heading3" />
          <PMarkdownRenderer :text="heading4" />
          <PMarkdownRenderer :text="heading5" />
          <PMarkdownRenderer :text="heading6" />
          <PMarkdownRenderer :text="paragraph" />
          <PMarkdownRenderer :text="table" />
          <PMarkdownRenderer :text="overflowTable" />

          <PMarkdownRenderer :text="strikethrough" />
          <PMarkdownRenderer :text="emphasis" />
          <PMarkdownRenderer :text="strong" />
          <PMarkdownRenderer :text="orderedList" />
          <PMarkdownRenderer :text="unorderedList" />
          <PMarkdownRenderer :text="taskList" />
          <PMarkdownRenderer :text="checkbox" />
          <PMarkdownRenderer :text="inlineCode" />
          <PMarkdownRenderer :text="fencedCodeBlock" />
          <PMarkdownRenderer :text="highlightedCodeBlock" />

          <PMarkdownRenderer :text="image" />
          <PMarkdownRenderer :text="link" />
          <PMarkdownRenderer :text="anchor" />

          <PMarkdownRenderer :text="lineBreak" />
          <PMarkdownRenderer :text="horizontalRule" />

          <PMarkdownRenderer :text="blockQuote" />
          <PMarkdownRenderer :text="nestedBlockQuote" />

          <PMarkdownRenderer :text="safeHtml" />
          <PMarkdownRenderer :text="dangerousHtml" />
        </div>
      </template>

      <template #live>
        <p-card class="markdown-renderer__live">
          <p-label class="markdown-renderer__select" label="README.md">
            <p-select v-model="selectedMarkdown" :options="options" />
          </p-label>

          <p-tabs v-model:selected="liveTab" :tabs="['Parsed', 'Raw']">
            <template #parsed>
              <div>
                <PMarkdownRenderer :text="markdownRef" :link-base-url="getGitHubBaseUrl(selectedMarkdown)" />
              </div>
            </template>

            <template #raw>
              <p-code-highlight :text="markdownRef" class="markdown-renderer__raw p-background" show-line-numbers lang="markdown" />
            </template>
          </p-tabs>
        </p-card>
      </template>

      <template #interactive>
        <div class="markdown-renderer__interactive">
          <p-code-input v-model="interactiveRef" lang="markdown" show-line-numbers class="markdown-renderer__interactive-input" />


          <div class="markdown-renderer__interactive-preview">
            <PMarkdownRenderer :text="interactiveRef" />
          </div>
        </div>
      </template>
    </p-tabs>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs } from '@/components'
  import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'
  import { SelectOptionNormalized } from '@/types/selectOption'
  import { ref, watch } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const heading1 = '# Heading 1'
  const heading2 = '## Heading 2'
  const heading3 = '### Heading 3'
  const heading4 = '#### Heading 4'
  const heading5 = '##### Heading 5'
  const heading6 = '###### Heading 6'
  const paragraph = 'paragraph\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  const strikethrough = '~~strikethrough~~'
  const emphasis = '_emphasis_'
  const strong = '**strong**'
  const inlineCode = '`inline = "code block"`'
  const checkbox = '- [x] checkbox'
  const unorderedList = '- unordered list item 1\n- unordered list item 2\n- unordered list item 3'
  const orderedList = '1. ordered list item 1\n2. ordered list item 2\n3. ordered list item 3'
  const taskList = '- [x] task list item 1\n- [ ] task list item 2\n- [ ] task list item 3'
  const link = '[link](https://google.com)'
  const lineBreak = 'line break before\nline break after'
  const horizontalRule = '\nhorizontal rule before\n\n---\n\nhorizontal rule after\n'
  const anchor = '[anchor](#heading-1)'
  const image = '![image](https://via.placeholder.com/200/024DFD/FFFFFF?text=image)'
  const fencedCodeBlock = '\n```\nfenced = "code block"\n```\n'
  const highlightedCodeBlock = '\n```py\nhighlighted_fenced = "code block"\n```\n'

  const table = `**id**|**animal**|**animal_scientific**
:-----:|:-----:|:-----:|
1|Nelson ground squirrel|Ammospermophilus nelsoni
2|Verreaux's sifaka|Propithecus verreauxi
3|Madagascar hawk owl|Ninox superciliaris
4|Goliath heron|Ardea golieth
5|Red-billed hornbill|Tockus erythrorhyncus
`

  const overflowTable = `**id**|**first_name**|**last_name**|**email**|**ip_address**|**lat**|**lng**|**animal**|**animal_scientific**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
1|Nickolaus|Cowill|ncowill0@cbslocal.com|136.157.15.189| | |Nelson ground squirrel|Ammospermophilus nelsoni
2|Erek|Erwin|eerwin1@dropbox.com|147.123.202.177| | |Verreaux's sifaka|Propithecus verreauxi
3|Sayer|Lambourne|slambourne2@alexa.com|214.98.166.227| | |"Openbill| asian"
4|Mahala|Immer|mimmer3@blogtalkradio.com|228.89.210.237| | |Goliath heron|Ardea golieth
5|Yule|Monckton|ymonckton4@slate.com|237.202.148.165| | |Red-billed hornbill|Tockus erythrorhyncus
6|Deanna|Sinden|dsinden5@forbes.com|94.201.65.170| | |"Macaque| japanese"
7|Elsbeth|Ferriman|eferriman6@rediff.com|56.60.38.166| | |Southern right whale|Eubalaena australis
8|Barnabe|Wathen|bwathen7@taobao.com|42.251.160.255| | |"Anteater| australian spiny"
9|Isidore|Tixall|itixall8@multiply.com|182.210.108.228| | |Madagascar hawk owl|Ninox superciliaris
10|Ariella|Fleisch|afleisch9@jugem.jp|136.73.220.173| | |Hoffman's sloth|Choloepus hoffmani
11|Jocko|Luckham|jluckhama@wiley.com|190.69.237.31| | |Sage hen|Centrocercus urophasianus
12|Mickie|Horbart|mhorbartb@webmd.com|2.53.98.40| | |"Pie| rufous tree"
13|Homer|Absolom|habsolomc@fastcompany.com|140.48.162.186| | |Tiger cat|Dasyurus maculatus
14|Wright|MacLice|wmacliced@unblog.fr|60.233.57.123| | |South African hedgehog|Erinaceus frontalis
15|Demetris|Brigman|dbrigmane@dmoz.org|239.124.107.44| | |Tawny eagle|Anitibyx armatus
16|Corissa|Waterfield|cwaterfieldf@elpais.com|240.73.152.50| | |Black-crowned night heron|Nycticorax nycticorax
17|Paolo|Itzhayek|pitzhayekg@ucsd.edu|71.42.92.1| | |"Kangaroo| eastern grey"
18|Dirk|Philbin|dphilbinh@cargocollective.com|40.171.145.141| | |Little grebe|Tachybaptus ruficollis
19|Merissa|Adamsen|madamseni@europa.eu|30.4.118.234| | |Coqui partridge|Francolinus coqui
20|Katti|Matuszewski|kmatuszewskij@wunderground.com|234.210.162.94| | |"Sheep| american bighorn"
21|Andriana|Petegrew|apetegrewk@nps.gov|127.76.209.135| | |Chimpanzee|Pan troglodytes
22|Grove|Wint|gwintl@hostgator.com|111.31.6.83| | |"Skink| blue-tongued"
23|Andonis|Ranscombe|aranscombem@tripadvisor.com|209.238.59.116| | |Grey fox|Vulpes cinereoargenteus
24|Skippie|Castanie|scastanien@discuz.net|160.48.173.12| | |Tyrant flycatcher|Myiarchus tuberculifer
25|Dael|Aleso|dalesoo@adobe.com|185.118.252.240| | |"Flicker| campo"
26|Rochelle|Trobey|rtrobeyp@reddit.com|243.34.37.247| | |"Goose| spur-winged"
27|Giustino|Stangoe|gstangoeq@yellowbook.com|158.190.111.77| | |"Skua| great"
28|Mirabelle|Jerrard|mjerrardr@harvard.edu|151.255.62.109| | |Black spider monkey|Ateles paniscus
29|Marvin|Ketley|mketleys@bbc.co.uk|242.227.157.101| | |"Starling| greater blue-eared"
30|Murvyn|Belk|mbelkt@usa.gov|23.109.83.22| | |Brolga crane|Grus rubicundus
31|L;urette|Goldsworthy|lgoldsworthyu@so-net.ne.jp|15.114.149.149| | |"Macaque| pig-tailed"
32|Kaylee|Thornton-Dewhirst|kthorntondewhirstv@bbb.org|128.48.11.244| | |"Parrot| hawk-headed"
33|Bernita|Capelen|bcapelenw@xrea.com|145.76.54.110| | |"Lemming| collared"
34|Alberto|Petrovic|apetrovicx@cdbaby.com|8.50.88.8| | |Sable antelope|Hippotragus niger
35|Nathanial|Astill|nastilly@merriam-webster.com|225.192.86.12| | |"Parakeet| rose-ringed"
36|Tate|Aristide|taristidez@squarespace.com|55.6.205.182| | |African lynx|Felis caracal
37|Bethanne|Conaboy|bconaboy10@pen.io|122.204.197.28| | |Two-banded monitor|Varanus salvator
38|Ag|Townsend|atownsend11@columbia.edu|254.194.42.24| | |Common zorro|Dusicyon thous
39|Hetti|Meriel|hmeriel12@imageshack.us|17.198.11.141| | |Elegant crested tinamou|Eudromia elegans
40|Easter|Porte|eporte13@scientificamerican.com|84.193.231.159| | |Crab-eating fox|Dusicyon thous
41|Rebeca|Doward|rdoward14@gnu.org|238.180.167.106| | |Australian sea lion|Neophoca cinerea
42|Susannah|Ciotti|sciotti15@ovh.net|103.140.103.127| | |"Turtle| snake-necked"
43|Eyde|Wormell|ewormell16@abc.net.au|67.243.65.88| | |Weeper capuchin|Cebus nigrivittatus
44|Paulina|Ragate|pragate17@hud.gov|123.212.77.149| | |"Phalarope| grey"
45|Alexa|Trubshawe|atrubshawe18@ning.com|82.9.110.13| | |Horned rattlesnake|Crotalus cerastes
46|Karry|Kelsow|kkelsow19@illinois.edu|30.248.200.176| | |"Goose| cereopsis"
47|Idette|Lampkin|ilampkin1a@hexun.com|81.71.240.90| | |"Cat| tiger"
48|Lyman|Collisson|lcollisson1b@latimes.com|85.198.198.211| | |Woylie|Bettongia penicillata
49|Sean|Jaynes|sjaynes1c@princeton.edu|99.7.236.59| | |"Hyena| brown"
50|Chaddy|Strahan|cstrahan1d@europa.eu|45.213.51.1| | |American bighorn sheep|Ovis canadensis
51|Delbert|Laird-Craig|dlairdcraig1e@hatena.ne.jp|127.176.245.250| | |Blackbuck|Antilope cervicapra
52|Hall|O'Fielly|hofielly1f@nyu.edu|43.237.70.186| | |Small Indian mongoose|Herpestes javanicus
53|Kele|Brodeau|kbrodeau1g@un.org|7.64.236.174| | |"Gull| lava"
54|Kelli|Hornig|khornig1h@ameblo.jp|105.226.158.148| | |Northern phalarope|Phalaropus lobatus
55|Aguste|Kettlestringe|akettlestringe1i@ca.gov|184.55.210.41| | |Currasow (unidentified)|Crax sp.
56|Delaney|McClarence|dmcclarence1j@biblegateway.com|133.249.36.223| | |Jungle cat|Felis chaus
57|Gabrila|Kupka|gkupka1k@answers.com|77.127.75.26| | |"Cat| cape wild"
58|Colly|Hindrich|chindrich1l@booking.com|66.224.33.86| | |Eastern quoll|Dasyurus viverrinus
59|York|Dinsey|ydinsey1m@indiatimes.com|161.40.99.73| | |Desert spiny lizard|Sceloporus magister
60|Lyda|Willwood|lwillwood1n@hud.gov|136.248.77.5| | |Bonnet macaque|Macaca radiata
61|Dayna|Aspole|daspole1o@uol.com.br|21.162.143.32| | |Common rhea|Rhea americana
62|Curtis|Oda|coda1p@posterous.com|153.204.202.241| | |"Toucan| red-billed"
63|Greggory|Stiven|gstiven1q@adobe.com|8.168.75.174| | |"Tortoise| burmese brown mountain"
64|Bart|Simmill|bsimmill1r@theatlantic.com|231.19.225.162| | |Yellow-bellied marmot|Marmota flaviventris
65|Jewelle|Turbat|jturbat1s@photobucket.com|169.19.19.114| | |"Bird| pied butcher"
66|Theo|Stendell|tstendell1t@over-blog.com|3.124.90.157| | |"Pintail| white-cheeked"
67|Jess|Glendenning|jglendenning1u@tripadvisor.com|163.209.144.85| | |Downy woodpecker|Picoides pubescens
68|Jessamyn|Schroeder|jschroeder1v@geocities.jp|40.188.163.3| | |Grison|Galictis vittata
69|Killie|Triggle|ktriggle1w@ezinearticles.com|125.143.12.229| | |Bonnet macaque|Macaca radiata
70|Krispin|Foston|kfoston1x@technorati.com|219.108.171.174| | |Madagascar fruit bat|Pteropus rufus
71|Milicent|Jinks|mjinks1y@addtoany.com|170.59.176.58| | |"Bulbul| black-fronted"
72|Janette|Oloman|joloman1z@home.pl|210.250.128.255| | |"Roadrunner| greater"
73|Muffin|Huguenet|mhuguenet20@quantcast.com|252.53.143.149| | |"Woodcock| american"
74|Westbrook|Boggs|wboggs21@imdb.com|125.180.77.89| | |Mocking cliffchat|Thamnolaea cinnmomeiventris
75|Carmella|Le Quesne|clequesne22@vinaora.com|77.66.21.221| | |Tasmanian devil|Sarcophilus harrisii
76|Ernesta|Hewertson|ehewertson23@google.de|146.67.253.26| | |"Raccoon| common"
77|Sidonnie|Larciere|slarciere24@deliciousdays.com|102.112.236.53| | |"Antechinus| brown"
78|Foster|Setch|fsetch25@blogspot.com|46.220.216.38| | |Greater blue-eared starling|Lamprotornis chalybaeus
79|Alasteir|Ottewell|aottewell26@goo.ne.jp|254.34.67.196| | |Silver-backed fox|Vulpes chama
80|Haven|Stoodale|hstoodale27@utexas.edu|241.132.249.102| | |"Skink| african"
81|Herb|Rowntree|hrowntree28@scribd.com|70.200.128.235| | |"Stork| openbill"
82|Emery|Edworthye|eedworthye29@illinois.edu|186.226.92.224| | |Squirrel glider|Petaurus norfolcensis
83|Stepha|Wellman|swellman2a@wikipedia.org|42.61.5.67| | |Baleen whale|Eubalaena australis
84|Norbie|Manwell|nmanwell2b@a8.net|35.209.252.179| | |Greater kudu|Tragelaphus strepsiceros
85|Miles|Chamberlin|mchamberlin2c@behance.net|194.33.55.38| | |Verreaux's sifaka|Propithecus verreauxi
86|Gwen|Heaker|gheaker2d@redcross.org|111.94.78.13| | |"Iguana| land"
87|Vincent|Speller|vspeller2e@yahoo.com|179.35.60.5| | |"Cormorant| large"
88|Elysha|Bea|ebea2f@github.io|49.239.177.0| | |"Anteater| australian spiny"
89|Cyndia|Wyke|cwyke2g@ca.gov|148.93.75.5| | |"Marshbird| brown and yellow"
90|Pablo|Kerbey|pkerbey2h@ustream.tv|125.175.72.182| | |"Vulture| white-headed"
91|Veronique|Gaylard|vgaylard2i@xrea.com|228.120.104.212| | |Red-breasted cockatoo|Eolophus roseicapillus
92|Ernesto|Allanby|eallanby2j@biblegateway.com|235.60.249.83| | |"Avocet| pied"
93|Kinny|Purrington|kpurrington2k@craigslist.org|211.110.157.178| | |White-winged tern|Chlidonias leucopterus
94|Valene|Tosdevin|vtosdevin2l@epa.gov|188.149.135.187| | |"Whale| baleen"
95|Erick|Shrubb|eshrubb2m@time.com|171.145.246.43| | |"Hedgehog| south african"
96|Emili|Mullard|emullard2n@mail.ru|40.177.19.235| | |"Cockatoo| long-billed"
97|Ash|Robillard|arobillard2o@ustream.tv|107.244.128.250| | |Greater sage grouse|Centrocercus urophasianus
98|Nannie|Eccles|neccles2p@amazon.co.jp|44.131.239.105| | |"Parrot| hawk-headed"
99|Claudetta|Sparkes|csparkes2q@t-online.de|36.224.226.229| | |"Brocket| red"
100|Aggy|Sergean|asergean2r@facebook.com|201.182.36.125| | |"Anteater| giant"
`

  const blockQuote = '> Block quote'
  const nestedBlockQuote = `
  > Rendering in block quotes:
  > ${paragraph}
  > ${emphasis}
  > ${strong}
  > ${strikethrough}
  > ${link}
  > ${anchor}
  >
  > ${inlineCode}
  > \`\`\`
  > fenced = "code block"
  > \`\`\`
  >
  > \`\`\`py
  > highlighted_fenced = "code block"
  > \`\`\`
  > ${blockQuote} nested
  >
  > ${heading1}
  > ${heading2}
  > ${heading3}
  > ${heading4}
  > ${heading5}
  > ${heading6}
  > ${image}
  > ${lineBreak}
  > horizontal rule before
  > ---
  > horizontal rule after
  > - unordered list item 1
  > - unordered list item 2
  > - unordered list item 3
  > 1. ordered list item 1
  > 2. ordered list item 2
  > 3. ordered list item 3
  > - [x] task list item 1
  > - [ ] task list item 2
  > - [ ] task list item
  >
  > ${table}
  `

  const safeHtml = `
  <h2 class="text-3xl">Embedded HTML</h2>
<p>
    This is some embedded html; the color of <span class="text-amber-500">this text</span> should be orange
and the color of <span class="text-success">this text</span> should be green
</p>`

  const dangerousHtml = `
  <h2 class="text-3xl">Dangerous HTML💀💀💀💀</h2>
  <script>alert('window alert')<\/script>
<p>
    This is some embedded html that contains dangerous scripts; the color of <span class="text-amber-500">this text</span> should be orange
and the color of <span class="text-success">this text</span> should still be green.
</p>
<div class="text-3xl text-danger">NO WINDOW ALERT SHOULD HAVE FIRED</div>
`

  const getGitHubBaseUrl = (repo: string): string => `https://github.com/${repo}/raw/main`
  const options: (SelectOptionNormalized & { url: string })[] = [
    { label: 'Prefect', value: 'prefecthq/prefect', url: 'https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md' },
    { label: 'Orion Design', value: 'prefecthq/orion-design', url: 'https://raw.githubusercontent.com/PrefectHQ/orion-design/main/README.md' },
    { label: 'Vue Compositions', value: 'prefecthq/vue-compositions', url: 'https://raw.githubusercontent.com/PrefectHQ/vue-compositions/main/README.md' },
    { label: 'Microbundle', value: 'developit/microbundle', url: 'https://raw.githubusercontent.com/developit/microbundle/master/README.md' },
    { label: 'Fiber', value: 'gofiber/fiber', url: 'https://raw.githubusercontent.com/gofiber/fiber/master/.github/README.md' },
  ]
  const selectedMarkdown = ref('developit/microbundle')
  const tab = ref('Tokens')
  const liveTab = ref('Parsed')

  const user1 = 'xXXpossiblyviewerXXx'
  const user2 = 'boomerangstaysail15'
  const user3 = 'endurable_giraffe11'
  const interactiveRef = ref(`# Chat history

**${user1}**: hey
**${user1}**: can i trade
**${user1}**: items
**${user1}**: well can i see your item
**${user2}**: which one?
**${user1}**: the scroched
**${user1}**: can i just see it
**${user2}**: i can't it's my friend's
**${user1}**: can i see it for a sec
**${user1}**: whats ur friends name
**${user2}**: no
**${user1}**: its my brother's item
**${user2}**: what ur brothers name
**${user1}**: ${user3}

---

_**${user1}** has changed their name to **${user3}**_

---

**${user3}**: hey its me ur brother
**${user1}**: no its not
**${user3}**: yes

---

_**${user3}** has asked to trade with you_

---

_**${user3}** has changed their name to **${user1}**_

`)

  const markdownRef = ref('')
  const getMarkdown = async (): Promise<void> => {
    const url = options.find(option => option.value == selectedMarkdown.value)?.url
    if (!url) {
      return
    }
    markdownRef.value = await fetch(url).then(res => res.text())
  }
  watch(selectedMarkdown, getMarkdown, { immediate: true })
</script>

<style>
.markdown-renderer__select { @apply
  mb-4
  max-w-sm
  ml-auto
}

.markdown-renderer__tabs { @apply
  mb-8
}

.markdown-renderer__section-header { @apply
  mb-4
  border-b
  border-b-foreground-200
  text-2xl
  font-semibold
}

.markdown-renderer__interactive,
.markdown-renderer__live { @apply
  my-12
}

.markdown-renderer__raw { @apply
  overflow-auto
  pl-0
  max-w-full
  w-full
}

.markdown-renderer__interactive { @apply
  flex
  flex-col
  items-stretch
  justify-items-stretch
  gap-12
  md:flex-row
  h-96
}

.markdown-renderer__interactive-input { @apply
  w-full
}

.markdown-renderer__interactive-preview { @apply
  w-full
  h-96
  overflow-auto
}
</style>