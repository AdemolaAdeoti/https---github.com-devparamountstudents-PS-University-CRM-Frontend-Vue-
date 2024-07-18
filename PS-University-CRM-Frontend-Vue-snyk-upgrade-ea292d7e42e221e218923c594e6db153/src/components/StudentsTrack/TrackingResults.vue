<template>
  <div>
    <div v-if="searchItem.length > 0">
      <StudentTrack
        v-for="(item, index) in searchItem"
        :key="index"
        :student="item"
      />
    </div>
    <div class="not-found" v-else>
      <img
        class="mb-3"
        :src="require('@/assets/images/crossed-search-icon.png')"
      />
      <h3>No results found</h3>
      <p>It seems we can't find any results based on your search.</p>
    </div>
  </div>
</template>
<script>
// import Search from '@/assets/images/search_icon'
import StudentTrack from './StudentTrack.vue';
export default {
  name: 'TrackingResults',
  components: { StudentTrack },
  props: ['searchItem'],
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
  h3 {
    font-size: 2.5rem;
  }
}
</style>