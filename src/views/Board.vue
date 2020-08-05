
<template>
    <div>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
        <br>
        <transition name="fade">
            <h1 v-show="isActive" style="font-size:40px; margin:0px 20px; font-family: 'Noto Sans KR', sans-serif; opacity:0.5">자유게시판</h1>
        </transition>
        <!-- <text-highlight :queries="queries" style="font-size:50px;">{{description}}</text-highlight> -->
        <div> 
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="600px" overlay-color="white" overlay-opacity="0.2" @keydown.esc="dialog = false">
                    <template v-slot:activator="{ on }">
                        <v-btn v-if="isLogin && userAccessToken !== null" x-large color="primary" v-on="on" style="right:-750px; top:-30px" >글 쓰기</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <h1>글을 작성하세요!</h1>
                        </v-card-title>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valid" lazy-validation style="width:500px">
                                <v-text-field label="제목" required :rules="nameRules" v-model="contentInfo.subject"></v-text-field>
                                <br/>
                                <v-textarea
                                    required 
                                    :rules="contentRules" 
                                    v-model="contentInfo.contents"
                                    outlined
                                    name="input-7-4"
                                    label="내용">
                                </v-textarea>
                            </v-form>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close()">닫기</v-btn>
                            <v-btn :disabled="!valid" color="blue darken-1" flat @click="write()">등록</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </div>
        <hr style="opacity: 0.2"/>
        <board-view
            :data="dataList"
            :total-pages="Math.ceil(dataList.length / 10)"
            :total="dataList.length"
            :per-page="10"
            :currentPage="currentPage"
            v-on:pagechanged="onPageChange">
        </board-view>
        <div>
            <v-text-field label="검색내용" style="width:250px" v-model="search.search_content" color="yellow"></v-text-field>
            <v-radio-group v-model="search.search_mode" row>
                <v-radio
                    v-for="n in radio_list"
                    :key="n"
                    :label="n"
                    :value="n"
                    color="yellow"
                ></v-radio>
            </v-radio-group>
            <v-btn large color="blue" style="width:250px" @click="Search({search})">검색</v-btn>
        </div>
    </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex'
import BoardView from '../components/BoardView.vue'
import axios from 'axios'
import store from '../store/index'
    export default {
        created() {
            setTimeout(() => this.isActive = true, 200) 
            axios.get('/api/contents/list')
                        .then((response) => {
                        store.state.contentList = response.data
                        })
        },
        components:{
            BoardView,
        },
        data() {
            return {
                name: '',
                currentPage: 1,
                radio_list: [ '제목', '내용', '작성자' ],
                search: { search_content: '', search_mode: '' },
                dialog: false,
                valid: true,
                active: false,
                isActive: false,

                contentInfo: {
                    subject: "",
                    contents: "",
                    author: store.state.userId
                },

                nameRules: [
                    v => !!v || '제목은 필수!',
                    //v => v.length <= 10 || 'Name must be less than 10 characters'
                ],

                contentRules: [
                    v => !!v || '내용도 필수!',
                ],

                // queries: ["자유"],
                // description: '자유게시판',

            }
        },
        computed : {
            ...mapState(['contentList', 'isLogin', 'userInfo', 'userAccessToken']),
            ...mapGetters(['dataList'])
        },
        methods: {
            onPageChange(page){
                this.currentPage = page;
            },

            write(){
                console.log(store.state.userAccessToken)
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': store.state.userAccessToken
                }
                axios.post('/api/contents/write', { content : this.contentInfo }, { headers: headers })
                    .then((res) => {
                        if (res.data.message == "success"){
                            console.log('정상적으로 글이 추가 되었습니다.')
                        }

                        axios.get('/api/contents/list')
                        .then((response) => {
                        store.state.contentList = response.data
                        })
                    })
                this.dialog = false;

            },

            close() {
                this.dialog = false;
                this.contentInfo.subject = '';
                this.contentInfo.contents = '';
            },

            Search(search){
                axios.post('/api/contents/search', search)
                .then((res) => {
                    if(res.data.success == true){
                        console.log('검색 성공')
                        console.log(res.data)
                        store.state.contentList = res.data.data
                    }
                })
            },

        },
    }
</script>
<style lang="scss" scoped>
    th { padding: 0px 20px;}
    td { padding: 0px 20px;}
    .write1 { margin: 0px 20px; }

    .fade-enter-active, .fade-leave-active { transition-duration: 1s; transition-property: opacity; }
    .fade-enter, .fade-leave-active { opacity: 0 }
</style>