<template>
  <transition name="fade">
    <v-app id="inspire" v-show="isActive">
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4" >
              <v-card class="elevation-12">
                <v-toolbar color="teal" dark flat>
                  <v-toolbar-title>회원가입</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text style="color:yellow">ID를 입력하고 중복 체크를 해주세요</v-text>
                    <v-btn small color="blue" style="right: -50px" @click="idCheck(user.userid)">아이디 중복 체크</v-btn>
                    <v-text-field label="아이디" prepend-icon="mdi-account" type="text" v-model="user.userid" color="teal"></v-text-field>
                    <v-text-field label="이름" name="name" prepend-icon="mdi-star" type="text" v-model="user.name"></v-text-field>
                    <v-text-field label="비밀번호" name="password" prepend-icon="mdi-lock" type="password" v-model="user.password" color="yellow"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="signUp">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </transition>
</template>

<script>
import Axios from 'axios'
  export default {
    created() {
            setTimeout(() => this.isActive = true, 200) 
    },
    data() {
        return {
            user1 : {
                userid: '',
                name: '',
                email: '',
                password:''
            },
            user: {
              userid: '',
              name: '',
              password: ''
            },
            isActive: false,
        }
    },
    props: {
      source: String,
    },
    methods: {
        signUp: function () {
            Axios.post('/api/users/signUp', {  user: this.user })
            .then((res) => {
                if (res.data.success == true) {
                    this.$router.push('/login') 
                }
                console.log(res.data.message);
            })
            .catch(function () {
                console.log('error')
            })
        },
        idCheck: function(id){
          if(id === ''){
            alert('ID를 입력하세요')
          }
          else{
            Axios.post('/api/users/idCheck', {  userid : id })
            .then((res) => {
              if (res.data.success == true){
                alert('사용 가능한 ID입니다.')
              }
              else{
                alert('사용할 수 없는 ID입니다.')
              }
            })
          }
        }
    }
}
</script>
<style>
    .fade-enter-active, .fade-leave-active { transition-duration: 1s; transition-property: opacity; }
    .fade-enter, .fade-leave-active { opacity: 0 }
</style>