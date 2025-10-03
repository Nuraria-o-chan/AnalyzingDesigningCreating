<script setup>
defineProps({
  schools: {
    type: Array,
    default: () => [],
  },
})

function uniquePrograms(school) {
  const programs = school?.supplements[0]?.educational_programs || []
  const names = programs.map((p) => p.edu_level?.name + ' ').filter(Boolean)
  return [...new Set(names)]
}

function shortSchoolName(fullName) {
  const parts = fullName.split('"')
  if (parts.length < 2) return fullName

  const typePart = parts[0].trim()
  const namePart = parts[1].trim()

  const abbreviation = typePart
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join('')

  return `${abbreviation} ${namePart}`
}

function getSchoolName(school) {
  const shortName = school?.edu_org.short_name
  const fullName = school.edu_org.full_name
  return shortName && shortName.length > 0 ? shortName : shortSchoolName(fullName)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>
          <div class="th-content">Регион <img src="../assets/icons/Sort.svg" alt="sort" /></div>
        </th>
        <th>
          <div class="th-content">Название <img src="../assets/icons/Sort.svg" alt="sort" /></div>
        </th>
        <th>
          <div class="th-content">Адрес <img src="../assets/icons/Sort.svg" alt="sort" /></div>
        </th>
        <th>
          <div class="th-content">
            Уровень образования <img src="../assets/icons/Sort.svg" alt="sort" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(school, index) in schools" :key="school.uuid || index">
        <td>{{ school.edu_org.region.name }}</td>
        <td>{{ getSchoolName(school) }}</td>
        <td>{{ school.edu_org.contact_info.post_address }}</td>
        <td>
          <div class="programs">
            <span v-for="program in uniquePrograms(school)" :key="program">
              {{ program }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" setup>
table {
  border-collapse: collapse;
  width: 100%;
  thead {
    background: #f0f0f7;
    width: 439px;
    height: 56px;
    color: #55555c;

    th,
    td {
      text-align: left;
      padding: 16px;

      .th-content {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  tbody {
    font-size: 14px;
    tr,
    td {
      padding: 16px;
      width: 439px;
      height: 63px;
    }

    tr {
      border-bottom: 1px solid #d3d3de;

      .programs {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        text-align: center;
        span {
          font-size: 12px;
          border: 1px solid rgba(14, 14, 16, 0.1);
          border-radius: 8px;
          padding: 4px 6px;
        }
      }
    }
  }
}
</style>
