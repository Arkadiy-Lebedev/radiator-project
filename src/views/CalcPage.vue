<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'

import axios from 'axios'
import type { IRadiator } from '../types/IRadiator'
import type { IEyeliner } from '../types/IEyeliner'
import type { IColor } from '../types/IColor'
import type { IType } from '../types/IType'
import type { ISection } from '../types/ISection'
import type { IBoiler } from '../types/IBoiler'
import type { IHotWaterItem } from '../types/IHotWaterItem'

import { groupByTitle } from '../services/groupByTitle'
import { groupByTitleColor } from '../services/groupByTitleColor'
import { sections } from '../dataBase/section'
import { types } from '../dataBase/types'
import { eyelinerDb } from '../dataBase/eyeliner'
import { colorsDb } from '../dataBase/color'
import { boilerBd } from '../dataBase/boilerBd'
import { hotWaterBd } from '../dataBase/hotWaterBd'
import { volumeBd } from '../dataBase/volumeBd'
import { powerBd } from '../dataBase/powerBd'

import ImgSections from '../components/ImgSections.vue'
import ColorSections from '../components/ColorSections.vue'
import SeeMore from '../components/SeeMore.vue'
import TextSections from '../components/TextSections.vue'
import EyelinerSections from '../components/EyelinerSections.vue'
import BoilerItem from '../components/BoilerItem.vue'
import radiatorPicture from '../assets/image/radiator.png'
import { API } from '../api/api'

import Footer from '../components/Footer.vue'

interface IEyelinerGroup {
	items: IEyeliner[]
	title: string
}

interface IColorGroup {
	items: IColor[]
	title: string
}

// let group = items.reduce((acc, c) => (c.title in acc ? acc[c.title].push(c) : acc[c.title] = [c], acc), {})
// console.log(group)

// function groupByTitle(items) {
//   const groups = {}

//   // Iterate over each item in the array
//   items.forEach(item => {
//     const { title, text, status } = item

//     // If a group with the specified title doesn't exist yet, create a new group
//     if (!groups[title]) {
//       groups[title] = { title, items: [] } // Create a group object with the title key and an empty array for items
//     }

//     // Add the current item to the group's items array
//     groups[title].items.push({ title, text, status }) // Add an object with title, text, and status to the items array
//   })

//   // Return the array of values from the groups object
//   return Object.values(groups).map(group => group.items) // Convert the groups object into an array, leaving only the items arrays
// }

const eyelinerItem = ref<IEyeliner | null>(null)
const typesRadiator = ref<IType[]>([])
const colorItem = ref<IColor | null>(null)
const eyeliners = ref<IEyelinerGroup[]>([])
const colorsGroup = ref<IColorGroup[]>([])
const sectionRadiator = ref<ISection[]>([])

const eyelinersDefault = ref<IEyeliner[]>([])
const moreEyeliners = ref(false)
const moreColors = ref(false)
const rediatorImage = ref<string | null>()

const radiator: IRadiator = reactive<IRadiator>({
	section: '',
	section_type: null,
	height: null,
	quantity: null,
	eyeliner: '',
	eyeliner_type: '',
	color: '',
	boiler_name: '',
	boiler_type: null,
	hot_water: '',
	hot_water_type: null,
	hot_water_volume: '',
	power1: '',
	power2: '0',
	node: [],
  smoke: '',
  sensor: [],
  automatic: '',
  installation: []
})

const sectionAdd = (item: ISection) => {
	radiator.section = item.text
	rediatorImage.value = item.img_2
	radiator.section_type = item.type
}

const result = groupByTitle(eyelinerDb)
// @ts-ignore
eyeliners.value = result
eyelinersDefault.value = eyelinerDb.filter(
	(item) => item.title == 'Часто используемые'
)
console.log(result)

const resultColor = groupByTitleColor(colorsDb)
// @ts-ignore
console.log(resultColor)
// @ts-ignore
colorsGroup.value = resultColor
colorItem.value = colorsDb.filter((item) => item.bg == '#FFFFFF')[0]
radiator.color = colorItem.value?.text

typesRadiator.value = types
sectionRadiator.value = sections

// const loadAllPump = async () => {
//   loading.value = true
//   fetch(`${API}/api/pump/read.php`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.data)

//       for (let i = 0; i < data.data?.length; i++) {
//         const obj = data.data[i]
//         for (let key in obj) {
//           if (obj.hasOwnProperty(key)) {
//             // @ts-ignore
//                if (obj[key] == "" || obj[key] == null || obj[key] == "null" || obj[key] == " ") {
//               // @ts-ignore
//               obj[key] = "---"
//             }
//           }
//         }
//       }

//       pumps.value = data.data
//       loading.value = false
//       loadTypes()
//     })
//     .catch((err) => {

//       loading.value = false
//       console.log(err)
//     })
//     .finally(() => {

//       loading.value = false
//     })
// }

onMounted(() => {
	// loadAllPump()
})

const select_item = (item: IEyeliner) => {
	console.log(item)
	eyelinerItem.value = item
	radiator.eyeliner = item.text
	radiator.eyeliner_type = item.type
	moreEyeliners.value = false
}

const select_color = (item: IColor) => {
	colorItem.value = item
	radiator.color = item.text
	moreColors.value = false
}

const boilerSelect = (item: IBoiler) => {
	radiator.boiler_name = item.text
	radiator.boiler_type = item.type
	if (radiator.boiler_type != 2) {
		radiator.power2 = '0'
	}
}

const hotWaterSelect = (item: IHotWaterItem) => {
	radiator.hot_water = item.text
	radiator.hot_water_type = item.type
	if (radiator.hot_water_type != 2) {
		radiator.hot_water_volume = ''
	}
}

const consumption = computed(() => { 
  let summ = +radiator.power1 + +radiator.power2

  switch (summ) {
    case 12:  return '1,4'
      break
    case 24: return '2,82'
      break
    case 36: return '4,18'
      break
    case 42: return '4,88'
      break
    case 46: return '5,35'
      break
    case 48: return '5,54'
      break
    case 54: return '6,24'
      break
    case 60: return '7,88'
      break
      
  default:
 return '0'
}

  
  
})


</script>

<template>
	<div class="relative">
		<div
			class="mx-auto max-w-5xl px-4 py-11 sm:px-6 lg:px-8 relative 2xl:max-w-7xl"
		>
			<h4 class="text-center text-gray-700 text-3xl font-semibold">
				Конструктор радиатора Zehnder
			</h4>
			<h4 class="text-center text-gray-700 text-base w-6/12 mx-auto mt-2">
				С помощью конструктора вы можете быстро посчитать стоимость радиатора
				Zehnder Charleston в любом цвете и исполнении
			</h4>
			<div class="flex mt-10 pt-10 boreder-top gap-5">
				<div class="left flex-grow w-2/3 flex-shrink-0">
					<div class="flex gap-5 pb-10">
						<div class="w-1/3 text-right">
							<div class="step-text">
								<p>шаг 1</p>
							</div>
							<p class="font-semibold">Выберите количество трубок в секции</p>
						</div>
						<div class="flex gap-10 flex-grow">
							<div class="flex gap-3">
								<ImgSections
									v-for="(item, index) of sectionRadiator"
									:section="item"
									:key="index"
									:title="radiator.section"
									@click="sectionAdd(item)"
								/>
							</div>
							<div class="sections-text">
								<TextSections
									v-for="(item, index) of sectionRadiator"
									:section="item"
									:key="index"
									:title="radiator.section"
									@click="sectionAdd(item)"
								/>
							</div>
						</div>
					</div>
					<div class="flex gap-5 pb-10 pt-10 boreder-top items-center">
						<div class="w-1/3 text-right flex-shrink-0">
							<div class="step-text flex-grow">
								<p>шаг 2</p>
							</div>
							<p class="font-semibold">Задайте высоту радиатора</p>
						</div>
						<div class="flex-grow">
							<Dropdown
								class="w-full"
								v-model="radiator.height"
								:options="typesRadiator"
								optionLabel="text"
								optionValue="value"
								placeholder="Выберите высоту радиатора"
							/>
						</div>
					</div>
					<div class="flex gap-5 pb-10 pt-10 boreder-top">
						<div class="w-1/3 text-right flex-shrink-0">
							<div class="step-text">
								<p>шаг 3</p>
							</div>
							<p class="font-semibold">Введите количество секций</p>
						</div>
						<div class="flex gap-5 flex-grow">
							<InputNumber
								class="w-full"
								v-model="radiator.quantity"
								inputId="minmax"
								:min="0"
								:max="20"
							/>
							<!-- <InputText class=" w-full" v-model="radiator.quantity" placeholder="Кол-во секций, например 10" /> -->
						</div>
					</div>

					<div class="flex gap-5 pb-10 pt-10 boreder-top flex-wrap">
						<div class="w-1/3 text-right flex-shrink-0">
							<div class="step-text">
								<p>шаг 4</p>
							</div>
							<p class="font-semibold">Выберите подводку труб</p>
						</div>

						<div class="flex justify-between flex-grow">
							<div v-if="!eyelinerItem" class="flex items-center m-auto">
								<div
									class="cursor-pointer"
									@click="select_item(eyelinersDefault[0])"
								>
									<img :src="eyelinersDefault[0].img" alt="logo" />
								</div>
								<p class="">или</p>
								<div
									class="cursor-pointer"
									@click="select_item(eyelinersDefault[1])"
								>
									<img :src="eyelinersDefault[1].img" alt="logo" />
								</div>
							</div>

							<div class="m-auto" v-if="eyelinerItem">
								<img :src="eyelinerItem.img" alt="logo" />
							</div>

							<div class="more">
								<SeeMore @click="moreEyeliners = !moreEyeliners"></SeeMore>
							</div>
						</div>
						<div
							class="w-full border-solid border-2 border-gray-300 rounded-md p-5"
							v-if="moreEyeliners"
						>
							<EyelinerSections
								v-for="(item, index) of eyeliners"
								:key="index"
								:eyeliner="item"
								@select_item="select_item"
							></EyelinerSections>
						</div>
					</div>

					<div class="flex gap-5 pb-10 pt-10 boreder-top flex-wrap">
						<div class="w-1/3 text-right flex-shrink-0">
							<div class="step-text">
								<p>шаг 5</p>
							</div>
							<p class="font-semibold">Выберите цвет</p>
						</div>

						<div class="flex justify-between flex-grow">
							<div class="flex flex-col gap-1 m-auto" v-if="colorItem">
								<div
									class="color-box"
									:style="{
										backgroundColor: colorItem.bg != '' ? colorItem.bg : '',
										backgroundImage:
											colorItem.img != '' ? `url(${colorItem.img})` : '',
									}"
								></div>
								<p class="w-24 text-xs">{{ colorItem.text }}</p>
							</div>

							<div class="more">
								<SeeMore @click="moreColors = !moreColors"></SeeMore>
							</div>
						</div>
						<div
							class="border-solid border-2 border-gray-300 rounded-md p-5"
							v-if="moreColors"
						>
							<ColorSections
								v-for="(item, index) of colorsGroup"
								:key="index"
								:colors="item"
								@select_color="select_color"
							></ColorSections>
						</div>
					</div>
					<Button
						class="w-full"
						icon="pi pi-check"
						label="Расчитать"
						severity="Primary"
					></Button>
				</div>

				<div
					class="right border-solid border-2 border-gray-300 rounded-md p-5 flex-shrink-0 w-1/3"
				>
					<p class="text-xl text-center">
						Zehnder Charleston {{ radiator.section_type }}{{ radiator.height
						}}<span v-if="radiator.height">/</span>{{ radiator.quantity }}
						{{ radiator.eyeliner_type }}
						<span v-if="radiator.eyeliner != ''"
							>цвет {{ radiator.color }}</span
						>
					</p>
					<div class="flex mt-5 gap-2">
						<div
							class="picture"
							:style="{ backgroundImage: `url(${radiatorPicture})` }"
						>
							<p class="picture__section text-xs w-full">
								{{
									radiator.quantity != null
										? radiator.quantity * 46
										: 'задайте кол-во секции'
								}}
							</p>
							<p class="picture__section-heaght text-xs w-full">
								{{ radiator.height ? radiator.height : 'выберите высоту' }}
							</p>
							<p class="picture__section-heaght2 text-xs w-full">
								{{ radiator.height ? radiator.height - 70 : 'выберите высоту' }}
							</p>
						</div>
						<div class="" v-if="rediatorImage">
							<div
								class="picture_section"
								:style="{ backgroundImage: `url(${rediatorImage})` }"
							></div>
							<!-- <img :src="rediatorImage" alt="logo" /> -->
						</div>
					</div>
					<Button
						class="w-full mt-5"
						icon="pi pi-check"
						label="Купить"
						severity="Primary"
						outlined
					></Button>
					<div class="pt-4 mt-7 boreder-top">
						<p class="text-lg text-center">Характеристики</p>
						<table class="w-full mt-5">
							<tr>
								<td>Мощность (ΔT=50°)</td>
								<td>---</td>
							</tr>
							<tr>
								<td>Мощность (ΔT=60°)</td>
								<td>---</td>
							</tr>
							<tr>
								<td>Мощность (ΔT=70°)</td>
								<td>---</td>
							</tr>
							<tr>
								<td>Масса</td>
								<td>---</td>
							</tr>
							<tr>
								<td>Объем воды</td>
								<td>---</td>
							</tr>
							<tr>
								<td>Доля излучения</td>
								<td>---</td>
							</tr>
						</table>
					</div>
				</div>
			</div>

			<div class="boiler-room mt-28">
				<h4 class="text-center text-gray-700 text-3xl font-semibold">
					КОНСТРУКТОР КОТЕЛЬНОЙ
				</h4>
				<h4 class="text-center text-gray-700 text-base w-6/12 mx-auto mt-2">
					С помощью конструктора вы можете быстро посчитать стоимость котельной
				</h4>

				<div class="flex mt-10 pt-10 boreder-top gap-5">
					<div class="left flex-grow w-2/3 flex-shrink-0">
						<div class="flex gap-5 pb-10">
							<div class="w-1/4 text-right">
								<div class="step-text">
									<p>шаг 1</p>
								</div>
								<p class="font-semibold">Выберете комбинацию котлов</p>
							</div>
							<div class="flex gap-10 flex-grow justify-center w-3/4">
								<BoilerItem
									@click="boilerSelect(item)"
									v-for="(item, index) of boilerBd"
									:key="index"
									:img="item.img"
									:text="item.text"
									:name="radiator.boiler_name"
								></BoilerItem>
							</div>
						</div>
						<div class="flex gap-5 pb-10">
							<div class="w-1/4 text-right">
								<div class="step-text">
									<p>шаг 2</p>
								</div>
								<p class="font-semibold">Где будем брать горячую воду?</p>
							</div>
							<div class="flex gap-5 flex-grow justify-center flex-col w-3/4">
								<div class="flex gap-10">
									<BoilerItem
										@click="hotWaterSelect(item)"
										v-for="(item, index) of hotWaterBd"
										:key="index"
										:img="item.img"
										:text="item.text"
										:name="radiator.hot_water"
									></BoilerItem>
								</div>
								<div class="" v-if="radiator.hot_water_type == 2">
									<Dropdown
										class="w-full"
										v-model="radiator.hot_water_volume"
										:options="volumeBd"
										optionLabel="text"
										optionValue="value"
										placeholder="Выберите объем"
									/>
								</div>
							</div>
						</div>
						<div class="flex gap-5 pb-10">
							<div class="w-1/4 text-right">
								<div class="step-text">
									<p>шаг 3</p>
								</div>
								<p class="font-semibold">Выберите мощность котлов</p>
							</div>
							<div class="flex gap-5 flex-grow justify-center flex-col w-3/4">
								<div class="flex gap-10">
									<div class="w-40">
										<p class="mb-1 text-sm">Котел № 1</p>
										<Dropdown
											class="w-full"
											v-model="radiator.power1"
											:options="powerBd"
											optionLabel="text"
											optionValue="power"
											placeholder="Мощность"
										/>
									</div>
									<div class="w-40" v-if="radiator.boiler_type == 2">
										<p class="mb-1 text-sm">Котел № 2</p>
										<Dropdown
											class="w-full"
											v-model="radiator.power2"
											:options="powerBd"
											optionLabel="text"
											optionValue="power"
											placeholder="Мощность"
										/>
									</div>
								</div>
							</div>
						</div>

						<div class="flex gap-5 pb-10">
							<div class=" w-1/4 text-right">
								<div class="step-text">
									<p>шаг 4</p>
								</div>
								<p class="font-semibold">Выберите потребителей тепла</p>
							</div>
							<div class="w-3/4">
								
									<p class="font-semibold">Отопление этажа</p>
									<div class="flex gap-5 mt-5 flex-wrap">
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node1"
												name="node"
												value="Cмесительный узел"
											/>
											<label for="node1" class="ml-2">Cмесительный узел</label>
										</div>
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node2"
												name="node"
												value="Без регулирования с насосом"
											/>
											<label for="node2" class="ml-2"
												>Без регулирования с насосом
											</label>
										</div>
									</div>
									<p class="font-semibold mt-8">
										Отопление этажа (если хочешь отдельно управлять температурой
										этажа, добавь еще)
									</p>
									<div class="flex gap-5 mt-5 flex-wrap">
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node3"
												name="node"
												value="Cмесительный узел 2"
											/>
											<label for="node3" class="ml-2">Cмесительный узел</label>
										</div>
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node4"
												name="node"
												value="Без регулирования с насосом 2"
											/>
											<label for="node4" class="ml-2"
												>Без регулирования с насосом
											</label>
										</div>
									</div>
									<p class="font-semibold mt-8">Теплый пол этажа</p>
									<div class="flex gap-5 mt-5 flex-wrap">
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node5"
												name="node"
												value="Ручное регулирование"
											/>
											<label for="node5" class="ml-2"
												>Ручное регулирование</label
											>
										</div>
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node6"
												name="node"
												value="Cмесительный узел в котельной "
											/>
											<label for="node6" class="ml-2"
												>Cмесительный узел в котельной
											</label>
										</div>
									</div>
									<p class="font-semibold mt-8">Иное</p>
									<div class="flex gap-5 mt-5 flex-wrap">
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node7"
												name="node"
												value="Вентиляция (только до смесительного узла)"
											/>
											<label for="node7" class="ml-2"
												>Вентиляция (только до смесительного узла)</label
											>
										</div>
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node8"
												name="node"
												value="Бассейн с подогревом"
											/>
											<label for="node8" class="ml-2"
												>Бассейн с подогревом
											</label>
										</div>
										<div class="flex align-items-center">
											<Checkbox
												v-model="radiator.node"
												inputId="node9"
												name="node"
												value="Теплые дорожки от котла"
											/>
											<label for="node9" class="ml-2"
												>Теплые дорожки от котла
											</label>
										</div>
									</div>
								
							</div>
						</div>

						<div class="flex gap-5 pb-10">
							<div class="w-1/4 text-right">
								<div class="step-text">
									<p>шаг 5</p>
								</div>
								<p class="font-semibold">Добавим к заказу?</p>
							</div>
							<div class="">
								<p class="font-semibold">Дымоход</p>
								<div class="flex gap-5 mt-3 flex-wrap w-3/4">
									<div class="flex items-center">
										<RadioButton
											v-model="radiator.smoke"
											inputId="item1"
											value="Коаксиальный"
										/>
										<label for="item1" class="ml-2">Коаксиальный</label>
									</div>
									<div class="flex items-center">
										<RadioButton
											v-model="radiator.smoke"
											inputId="item2"
											value="Раздельный"
										/>
										<label for="item2" class="ml-2">Раздельный</label>
									</div>                  
								</div>
                <div class="flex items-center mt-7">
  											<Checkbox
  												v-model="radiator.sensor"
  												inputId="sensor"
  												name="node"
  												value="Датчик давления"
  											/>
  											<label for="sensor" class="ml-2 font-semibold">
                          Датчик давления
  											</label>
  										</div>
                  	<p class="font-semibold mt-7">Автоматика</p>
                    <div class="flex gap-5 mt-3 flex-wrap">
                      <div class="flex items-center">
  										<RadioButton
  											v-model="radiator.automatic"
  											inputId="automatic1"
  											value="могу управлять сам с телефона"
  										/>
  										<label for="automatic1" class="ml-2">могу управлять сам с телефона</label>
  									</div>
                    <div class="flex items-center">
  										<RadioButton
  											v-model="radiator.automatic"
  											inputId="automatic2"
  											value="нужен просто контроль за системой"
  										/>
  										<label for="automatic2" class="ml-2">нужен просто контроль за системой</label>
  									</div>
                    </div>
<div class="flex items-center mt-7">
  											<Checkbox
  												v-model="radiator.installation"
  												inputId="installation"
  												
  												value="Нужен монтаж "
  											/>
  											<label for="installation" class="ml-2 font-semibold">
                          Нужен монтаж 
  											</label>
  										</div>
                    
							</div>
            
						</div>

						<Button
							class="w-full"
							icon="pi pi-check"
							label="Расчитать"
							severity="Primary"
						></Button>
					</div>

					<div
						class="right border-solid border-2 border-gray-300 rounded-md p-5 flex-shrink-0 w-1/3"
					>
						
						<div class=" mt-5 ">
							картинка
						</div>
						
						<div class="pt-4 mt-7 boreder-top">
							<p class="text-lg text-center">Характеристики</p>
							<table class="w-full mt-5">
								<tr>
									<td>Котел</td>
									<td>{{ radiator.hot_water_type == 1 ? 'двухконтурный' : radiator.hot_water_type == 2 ? 'одноконтурный' : '' }}</td>
								</tr>
								<tr>
									<td >Мощность котельной кВт</td>
									<td>{{ +radiator.power1 + +radiator.power2 }}</td>
								</tr>
								<tr>
									<td>Расход газа природного  м3/ч</td>
									<td>{{ consumption }}</td>
								</tr>
								
							</table>
              <Button
              v-tooltip="'Используемое оборудование: Котел Viessmann, Бойлер ELSEN'"
							class="w-full mt-8"
							icon="pi pi-check"
							label="Купить"
							severity="Primary"
							outlined
						></Button>
             <Button
             v-tooltip="'Используемое оборудование: Котел BAXI, Бойлер BAXI'"
							class="w-full mt-8"
							
							label="Удешевить"
							severity="help"
							outlined
						></Button>
						</div>
					</div>
				</div>
			</div>

			
		</div>
	</div>
</template>

<style scope>
.step-text {
	display: inline-block;
	min-width: 10px;
	padding: 3px 7px;
	font-size: 12px;
	font-weight: 700;
	line-height: 1;
	color: #fff;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	background-color: #777;
	border-radius: 10px;
	padding-bottom: 4px;
}

.boreder-top {
	border-top: 1px solid rgb(199, 199, 199);
}

.color-box {
	border: 1px solid #808080;
	border-radius: 5px;
	height: 50px;
	width: 80px;
}

.picture {
	width: 266px;
	height: 234px;
	position: relative;
}

.picture_section {
	width: 95px;
	height: 234px;
	position: relative;
	background-repeat: no-repeat;
}

.picture__section {
	position: absolute;
	top: 1px;
	text-align: center;
	background-size: cover;
	padding-left: 23px;
}

.picture__section-heaght {
	position: absolute;
	top: 110px;
	text-align: center;
	background-size: cover;

	transform: rotate(-90deg);
	left: -125px;
}

.picture__section-heaght2 {
	position: absolute;
	top: 110px;
	text-align: center;
	background-size: cover;

	transform: rotate(-90deg);
	right: -107px;
}

table td {
	font-weight: 500;
}
</style>
