<script setup>
import { ref, onMounted, watch } from 'vue'

import '@/assets/styles/fonts.scss'
import Header from './components/Header.vue'
import TableFilters from './Widgets/TableFilters.vue'
import TableFiltersCalendar from './Widgets/TableFilterCalendar.vue'
import TableContent from './components/TableContent.vue'
import PaginationController from './components/PaginationController.vue'
import Loader from './components/Loader.vue'

import axios from './axios'

const schools = ref([])
const filters = ref({
  searchQuery: '',
  type: '',
  status: '',
})
const typeOptions = [
  { label: 'Все виды', value: '' },
  { label: 'Не определен', value: 'unknown' },
  { label: 'Постоянное', value: 'permanent' },
  { label: 'Образовательная организация высшего образования', value: 'higheredu' },
  { label: 'Академия', value: 'academy' },
]

const statusOptions = [
  { label: 'Все статусы', value: '' },
  { label: 'Действующее', value: 'inForce' },
  { label: 'Недействующее', value: 'notinforce' },
  { label: 'Без статуса', value: 'null' },
]

// слежение за изменениями
watch(
  () => ({ ...filters.value }),
  () => {
    pagination.value.page = 1 // сбрасываем на первую страницу при смене фильтра
    loadSchools()
  },
  { deep: true },
)
const pagination = ref({
  page: 1,
  limit: 10,
  totalPages: 0,
  totalCount: 0,
})

const districts = ref([])
const regions = ref([])

// лоадер
const isLoading = ref(false)

async function loadSchools() {
  try {
    isLoading.value = true

    const params = {
      count: pagination.value.limit,
      page: pagination.value.page,
    }

    if (filters.value.type) params.type = filters.value.type
    if (filters.value.status) params.status = filters.value.status

    const { data } = await axios.get('/schools', { params })
    schools.value = data.data.list
    pagination.value.totalCount = data.data.total_count
    pagination.value.totalPages = Math.ceil(data.data.total_count / pagination.value.limit)
  } finally {
    isLoading.value = false
  }
}

async function loadSearchRefs() {
  const dist = await axios.get('/federalDistricts')
  districts.value = dist.data.data || []

  const reg = await axios.get('/regions')
  regions.value = reg.data.data || []
  const params = {}
  if (dist && dist.id) {
    params.federal_district_id = dist.id
  }
  if (reg && reg.id) {
    params.region_id = reg.id
  }
}

loadSearchRefs()

onMounted(loadSchools)

// для того что бы не дёргать API на каждый символ ввода
let debounceTimer = null
watch(
  () => filters.value.searchQuery,
  async (query) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      try {
        isLoading.value = true
        if (!query) {
          // грузим все школы при отсутвии данных
          const { data } = await axios.get('/schools')
          schools.value = data.data.list
          return
        }

        // тут производим поиск по округу
        const district = districts.value.find((d) =>
          d.name.toLowerCase().includes(query.toLowerCase()),
        )

        // ищем по региону
        const region = regions.value.find((r) => r.name.toLowerCase().includes(query.toLowerCase()))

        const params = {}
        if (district) params.federal_district_id = district.id
        if (region) params.region_id = region.id

        const { data } = await axios.get(`/schools`, { params })
        schools.value = data.data.list
      } catch (error) {
        // ошибочки выводим и сбрасываем списки
        console.log(error)
        schools.value = []
        districts.value = []
        regions.value = []
      } finally {
        isLoading.value = false // выключаем лоадер
      }
    }, 500)
  },
)

const inputs = [
  {
    id: 1,
    title: 'Все виды',
    img: new URL('@/assets/icons/arrow-chevron-down.svg', import.meta.url).href,
  },
  {
    id: 2,
    title: 'Все статусы',
    img: new URL('@/assets/icons/arrow-chevron-down.svg', import.meta.url).href,
  },
]
// короче говоря эта 500 ошибка на ваш поломанный бэк сыпиться, но главное что у меня ui от этого не ломается, это по крайне мере предусмотрела
watch(
  () => [pagination.value.page, pagination.value.limit],
  () => {
    loadSchools()
  },
)

// массив выбранных регионов
const selectedRegions = ref([])
</script>

<template>
  <div class="wrapper">
    <Header v-model:searchQuery="filters.searchQuery" />
    <div class="filterInputs">
      <TableFilters title="Все виды" :options="typeOptions" v-model="filters.type" />

      <TableFilters title="Все статусы" :options="statusOptions" v-model="filters.status" />
    </div>
    <!-- рендерим только одну таблицу -->
    <TableContent v-if="schools.length" :schools="schools" />
    <!-- лоадер -->
    <div v-if="isLoading" class="loader-wrapper">
      <Loader />
    </div>
    <PaginationController
      v-model:page="pagination.page"
      v-model:limit="pagination.limit"
      :total-pages="pagination.totalPages"
      :total-count="pagination.totalCount"
    />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #f1f4fd;
  padding: 48px;
  font-family: 'GothamPro', sans-serif;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fff;
  border-radius: 20px;
  min-height: 100vh;
  width: 100%;
  padding: 24px;

  .filterInputs {
    display: flex;
    gap: 16px;
    width: 100%;

    > * {
      flex: 1;
      min-width: 0;
    }
  }

  .hr {
    color: #eaeaea;
  }
}
</style>
