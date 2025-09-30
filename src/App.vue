<script setup>
import '@/assets/styles/fonts.scss'
import Header from './components/Header.vue'
import TableFilters from './Widgets/TableFilters.vue'
import TableFiltersCalendar from './Widgets/TableFilterCalendar.vue'
import TableContent from './components/TableContent.vue'

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
</script>

<template>
  <div class="wrapper">
    <Header />
    <!-- <TableFilters /> -->
    <div class="filterInputs">
      <TableFiltersCalendar />
      <div v-for="input in inputs" :key="input.id">
        <TableFilters :title="input.title" :img="input.img" />
      </div>
    </div>
    <TableContent />
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

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fff;
  border-radius: 20px;
  height: 100vh;
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
