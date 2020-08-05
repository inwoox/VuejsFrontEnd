<template>
    <div> 
      <br><br>
      <v-card class="mx-auto" max-width="1000">
        <v-img
          height="200px"
          width="1000px"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        >
          <p class="font-weight-light" style="position: absolute; text-align: center; font-size: 50px; left:400px; top:50px;"> {{contentInfo.subject}} </p>
        </v-img>
        <br>
        <p class="font-weight-black" style="position:absolute; font-size:30px; left:20px" > {{contentInfo.index+1}} </p>
        <br><br><br>
        <v-row
          justify="center"
          style="min-height: 160px;"
        >
          <div class="mx-4 hidden-sm-and-down"></div>
          <v-expand-transition>
            <v-card
            v-show="expand"
            height="300"
            width="1000"
            class="mx-auto"
            >
              <v-card-text style="font-size:20px;">
                <div>
                  <div> 내용 </div>
                  <hr/><br>
                  <div> {{contentInfo.contents}} </div>
                </div>
                <br><br><br><br>
                <div>
                  <div> 작성자 </div>
                  <hr/><br>
                  <div> {{contentInfo.author}} </div>
                  <br>
                  <br>
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-row>
      </v-card>

      <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="600px" overlay-color="white" overlay-opacity="0.2" @keydown.esc="dialog = false">
              <template v-slot:activator="{ on }">
                  <v-btn v-if="userAccessToken !== null && userId == contentInfo.author" x-large color="primary" v-on="on" style="top:30px; margin:0px 20px">글 수정</v-btn>
                  <v-btn x-large color="primary" @click="back()" style="top:30px; margin:0px 20px">뒤로 가기</v-btn>
                  <v-btn v-if="userAccessToken !== null && userId == contentInfo.author" @click="Delete(contentInfo.index+1)" x-large color="primary" style="top:30px;">글 삭제</v-btn>
              </template>
              <v-card>
                  <v-card-title>
                      <h1>글을 수정하세요!</h1>
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
                              label="내용">
                          </v-textarea>
                      </v-form>
                  </v-container>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close()">닫기</v-btn>
                      <v-btn :disabled="!valid" color="blue darken-1" @click="update()">등록</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
      </v-layout>
    </div>
</template>

<script>

import store from '../store/index.js'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    created() {
      setTimeout(() => this.expand = true, 200) 
    },
    data() {
        const index = this.$route.params.num-1;
        return {
            dialog: false,
            valid: true,
            active: false,
            expand: false,

            contentInfo: {
                index : index,
                subject: store.state.contentList[index].subject,
                contents: store.state.contentList[index].contents,
                author: store.state.contentList[index].author
            },

            nameRules: [
                v => !!v || '제목은 필수!', //v => v.length <= 10 || 'Name must be less than 10 characters'
            ],

            contentRules: [
                v => !!v || '내용도 필수!',
            ],
        }
    },

    computed: {
      ...mapState(['contentList', 'isLogin', 'userInfo', 'userAccessToken', 'userId']),
    },

    methods: {
      update(){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': store.state.userAccessToken
        }
        axios.post('/api/contents/update', { content: this.contentInfo } , { headers : headers })
        .then((res) => {
            if (res.data.message == "success"){
                console.log('정상적으로 글이 수정 되었습니다.')
            }

            axios.get('/api/contents/list')
            .then((response) => {
            store.state.contentList = response.data
            })
        })
        this.dialog = false;
      },
      Delete(num) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': store.state.userAccessToken
        }
        axios.post('/api/contents/delete', { number : num -1 } , { headers : headers } )
        .then((res) => {
                if (res.data.message == "success"){
                    console.log('정상적으로 글이 삭제 되었습니다.')
                }
            })

        store.state.contentList.splice(num-1, 1)
        console.log('삭제된 글의 번호:' , num)
        this.$router.push('/board')
      },
      close() {
        this.dialog = false;
      },

      back() {
        this.expand = false
        setTimeout(() => this.$router.push({name:'board'}), 300) 
      }
    }
}
</script>

<style lang="scss" scoped>
    .subject { font-size: 30px; }
    .num { font-size: 20px;}
</style>