---
to: src/components/<%= h.changeCase.pascal(componentName) %>/index.ts
---
<% namePascal = h.changeCase.pascal(componentName) -%>
<% nameCamel = h.changeCase.camel(componentName) -%>

import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class <%= namePascal %> extends Vue {
  protected render(h: CreateElement) {
    return <div><%= namePascal %></div>
  }
}
