<template>
    <div>
        <h1>API 요청 페이지입니다.</h1>
        <h2>버튼을 누르면 API를 호출합니다.</h2>
        
        <br>
        <v-btn color="primary" dark v-bind="attrs" @click="getRequest()"> USER 정보 가져오기 </v-btn>
        <br>
        <br>

        <div v-for="(user, index) in userlist" :key="index" class="user-wrap">
        <h2>No. {{index + 1}}</h2>
        <dl>
            <hr/>
            <dt>아이디 : {{user.userid}}</dt>
            <dt>이름 : {{user.name}} </dt>
            <br>
        </dl>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
    export default {
        data() {
            return {
                userlist: []
            }
        },
        methods: {
            getRequest() {
                axios.get("/api/users/list" , {
                    headers: {
                        "Authorization" : store.state.userAccessToken
                }}) 
                .then((res) => {
                    if(res.data == "tokenInvalid"){
                        alert('세션이 종료되었습니다. 다시 로그인 해주세요')
                        this.$router.push('/login')
                    }

                    this.userlist = res.data
                    console.log(this.userlist)

                })
                .catch((err) => {
                    console.log(err)
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    input { background: white; width: 300px;}
    .user-wrap { color:white;}
</style>