import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  protected render() {
    const $route = this.$route
    return (
      <div id="app">
        <router-view key={$route.fullPath} />
      </div>
    )
  }
}
