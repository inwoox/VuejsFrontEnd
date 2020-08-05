<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-arrow-up-bold-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({name:'board'})">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Board</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({name:'apirequest'})">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-phone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>API Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isLogin === false || userAccessToken === null" @click="$router.push({name:'register1'})">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/login" v-if="isLogin === false || userAccessToken === null">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/mypage" v-if="isLogin && userAccessToken !== null">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-domain</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>MyPage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>게시판</v-toolbar-title>
      <v-spacer></v-spacer>  
      <v-menu offset-y v-if="userAccessToken !== null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            내 정보
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/mypage">
            <v-list-item-title> 마이페이지 </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$store.dispatch('logout')" to="/home">
            <v-list-item-title> 로그아웃 </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else color="primary" to="/login">Login</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),

    created () {
      this.$vuetify.theme.dark = true
    },

    computed: {
      ...mapState(['isLogin' , 'userAccessToken'])
    }
  }
</script>