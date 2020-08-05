<template>
    <div>
        <!-- <h1 style="font-size:70px">마이페이지</h1> -->
        <text-highlight :queries="queries" style="font-size:70px">{{description}}</text-highlight>
        <h2>{{userId}}님이 로그인하셨습니다.</h2>
    </div>
</template>

<script>
import TextHighlight from 'vue-text-highlight';
import { mapState } from 'vuex'
    export default {
        data(){
            return {
                queries: ["마이페이지"],
                description: '마이페이지입니다'
            }
        },
        components: {
            TextHighlight
        },
        computed : {
            ...mapState(['userId'])
        }
    }
</script>
