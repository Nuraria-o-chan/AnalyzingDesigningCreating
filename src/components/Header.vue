<script setup>
defineProps({
  searchQuery: String,
  onDownload: Function,
})

const emit = defineEmits(['update:searchQuery'])
</script>

<template>
  <header>
    <h1>Таблица учреждений</h1>
    <div class="groupInputs">
      <div class="inputSearch">
        <input
          type="serch"
          placeholder="Поиск..."
          :value="searchQuery"
          @input="emit('update:searchQuery', $event.target.value)"
        />
        <img class="search" src="@/assets/icons/search.svg" alt="search" />
      </div>
      <button @click="onDownload && onDownload()">
        <img src="@/assets/icons/documents.svg" alt="documentsSvg" />Скачать
      </button>
    </div>
  </header>
</template>

<style lang="scss" setup>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .groupInputs {
    display: flex;
    gap: 20px;

    .inputSearch {
      position: relative;

      .search {
        width: 23px;
        height: 23px;
        position: absolute;
        right: 26px;
        top: 14px;
      }
    }

    input {
      border: 1px solid #d3d3de;
      border-radius: 10px;
      padding: 16px 60px 16px 24px;
      width: 300px;
      height: 56px;
      cursor: pointer;
      outline: none;
      font-weight: 400;
      font-size: 16px;
      color: #55555c;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 10px;
      padding: 16px 24px;
      width: 147px;
      height: 56px;
      background: #33d35e;
      border: 0;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: #24c14e;
        transition: 0.5s;
      }

      &:active {
        background: #16b240;
      }
    }
  }
}
</style>
