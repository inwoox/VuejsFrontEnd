<template>
  <transition name="fade">
  <v-app id="inspire" v-show="isActive">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-alert type="warning" v-if="isError">
                계정 정보가 잘못되었습니다.
            </v-alert>
           
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="아이디"
                    v-model="userid"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="패스워드"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="APILogin({userid, password})">Login</v-btn>
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
import { mapState, mapActions } from 'vuex'
import Axios from 'axios'
import store from '../store/index'
import VueCookies from 'vue-cookies'
  export default {
    created() {
            setTimeout(() => this.isActive = true, 200) 
    },
    data() {
        return {
          userid : null,
          password : null,
          isActive: false,
        }
    },
    props: {
      source: String,
    },
    computed: {
        ...mapState(['isLogin', 'isError']),
    },
    methods : {
        ...mapActions(['login']),
        APILogin: function(data) {
            Axios.post('/api/users/login', { user : data })
                .then((res) => {
                    console.log(res.data.message + '\n발급 토큰 : ' + res.data.AccessToken + '\n발급 시간 : ' + new Date())
                    if (res.data.message == 'success') {
                        store.state.isLogin = true
                        store.state.userAccessToken = res.data.AccessToken
                        store.state.userId = res.data.userId 
                        VueCookies.set('AccessToken', res.data.AccessToken, '30m')
                        this.$router.push({ name: 'mypage' })
                    }
                    else if (res.data.message == 'fail'){
                      store.state.isError = true
                    }
                })
                .catch(() => {
                    console.log('로그인 실패')
                })
        },
        
    }

  }
</script>
<style>
    .fade-enter-active, .fade-leave-active { transition-duration: 1s; transition-property: opacity; }
    .fade-enter, .fade-leave-active { opacity: 0 }
</style>