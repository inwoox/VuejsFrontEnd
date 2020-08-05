
<template>
    <transition name="fade">
        <div v-show="isActive">
            <header>
                <v-simple-table dark>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">번호</th><th class="text-left">제목</th><th class="text-left">내용</th><th class="text-left">작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Content, index) in ContentListData" :key="index">
                            <td @click="GetContent(index+1 + ((currentPage-1) * 10))">{{index+1 + ((currentPage-1) * 10)}}</td>
                            <td @click="GetContent(index+1 + ((currentPage-1) * 10))">{{Content.subject}}</td>
                            <td @click="GetContent(index+1 + ((currentPage-1) * 10))">{{Content.contents}}</td>
                            <td @click="GetContent(index+1 + ((currentPage-1) * 10))">{{Content.author}}</td>
                        </tr>
                    </tbody>
                    </template>
                    
                </v-simple-table>
            </header>
            
            <footer>
                <ul class="pagination" v-if="data.length > 10 || currentPage > 1">
                    <li> <v-btn class="ma-2" outlined color="indigo" @click="onClickFirstPage()" :disabled="isInFirstPage">First</v-btn> </li>
                    <li> <v-btn class="ma-2" outlined color="indigo" @click="onClickPreviousPage()" :disabled="isInFirstPage">Prev</v-btn> </li>
                    <li> <v-btn class="ma-2" outlined color="indigo" @click="onClickNextPage()" :disabled="isInLastPage">Next</v-btn> </li>
                    <li> <v-btn class="ma-2" outlined color="indigo" @click="onClickLastPage()" :disabled="isInLastPage">Last</v-btn> </li>
                </ul>
            </footer>
        </div>
    </transition>
</template>

<script>
import store from '../store/index.js'
import router from '../router/index.js'
import { mapState } from 'vuex'
import axios from 'axios'
    export default {
        name : 'board-view',
        data(){
            return {
                isActive: false,
                currentPage1 : this.currentPage
            }
        },
        created() {
            setTimeout(() => this.isActive = true, 200) 
        },
        props: {
            data : { type: Array, required: true },
            totalPages: { type: Number, required: true },
            total: { type: Number, required: true },
            perPage: { type: Number, required: true },
            currentPage: { type: Number, required: true }
        },
        computed: {
            ContentListData() {
                let start = (this.currentPage - 1) * this.perPage
                let end = start + this.perPage
                return this.data.slice(start, end)
            },

            isInFirstPage() { return this.currentPage === 1 },
            isInLastPage() { return this.currentPage === this.totalPages },
            ...mapState(['userId', 'isLogin'])
        },
        methods: {
            onClickFirstPage(){ 
                this.isActive = false
                setTimeout(() => {
                    this.isActive = true
                    this.$emit('pagechanged', 1) 
                }, 500);
            },
            onClickPreviousPage(){ 
                this.isActive = false
                setTimeout(() => {
                    this.isActive = true
                    this.$emit('pagechanged', this.currentPage - 1) 
                }, 500);
            },
            onClickNextPage() { 
                this.isActive = false
                setTimeout(() => {
                    this.isActive = true
                    this.$emit('pagechanged', this.currentPage + 1) 
                }, 500);
            },
            onClickLastPage(){
                this.isActive = false
                setTimeout(() => {
                    this.isActive = true
                    this.$emit('pagechanged', this.totalPages)
                }, 500);
            },

            updateData(num) {
                router.push({
                    name: 'write',
                    params: { updateFlag : 1, contentNumber : num }
                })
            },
            deleteData(num) {
                axios.post('/api/contents/delete', { num : num -1 } )
                .then((res) => {
                        if (res.data.message == "success"){
                            console.log('정상적으로 글이 삭제 되었습니다.')
                        }
                    })

                store.state.contentList.splice(num-1, 1)
                console.log('삭제된 글의 번호:' , num)
                router.push({ name : 'board'})
            },
            GetContent(num){
                router.push({
                    name: 'content',
                    params: { num: num }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    span { margin: 0px 30px;}
    footer { position: relative;}
    ul { list-style: none; position: absolute; left:650px; top:50px; }
    li { float: left; margin: 0px 10px;}

    .fade-enter-active, .fade-leave-active { transition-duration: 1s; transition-property: opacity; }
    .fade-enter, .fade-leave-active { opacity: 0 }
</style>