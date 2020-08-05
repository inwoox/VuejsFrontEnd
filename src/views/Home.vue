
<template>
  <div>
    <h1>홈화면입니다.</h1>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
export default {
    created () {         
            axios.get('/api/contents/list')
                .then((response) => {
                store.state.contentList = response.data
                })
    },
}
</script>
<style lang="scss" scoped>
</style>