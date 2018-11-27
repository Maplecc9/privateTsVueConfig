<template>
  <div>
    <h1>{{msg}}</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private msg = 'abc'
}
</script>

