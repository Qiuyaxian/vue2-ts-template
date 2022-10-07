import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  protected render () {
    return (
      <div class="hello">
        <p>
          <a href="https://cli.vuejs.org" target="_blank" rel="noopener">
            vue-cli documentation
          </a>
        </p>
      </div>
    )
  }
}
