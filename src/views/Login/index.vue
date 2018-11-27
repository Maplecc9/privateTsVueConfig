<template>
  <div>
    <section>
      <h4>登录平台</h4>
      <v-form v-model="validLogin">
        <v-text-field
          v-model="userForm.username"
          :rules="rules[0]"
          label="用户名"
          required
        ></v-text-field>
        <v-text-field
          v-model="userForm.password"
          :rules="rules[1]"
          label="密码"
          required
        ></v-text-field>
      </v-form>
      <v-btn
        flat
        color="info"
      >登录</v-btn>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserInfo } from '../../interface'

@Component
export default class App extends Vue {
  private validLogin: boolean = false
  private userForm: UserInfo = {
    username: '',
    password: ''
  }
  private rules = [
    [v => !!v || '登录账号不能为空!'],
    [v => !!v || '密码不能为空']
  ]
  private demo() {
    const ws = new WebSocket('ws://127.0.0.1:8080');
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        console.log('正在连接')
        break;
      case WebSocket.OPEN:
        console.log('连接成功')
        break;
      case WebSocket.CLOSING:
        console.log('正在关闭')
        break;
      case WebSocket.CLOSED:
        console.log('关闭成功')
        break;
      default:
        // this never happens
        break;
    }
    ws.onopen = () => {
      ws.send("数据")
    }
  }
  private mounted() {
    this.demo()
  }
}
</script>

