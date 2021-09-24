<template>
  <div id="q-app">
    <app-splash-screen v-if="loading" label="Login"> </app-splash-screen>
    <component :is="layout" v-else>
      <router-view></router-view>
    </component>
  </div>
</template>
<script lang="ts">
import { InjectableType } from 'app.core/enums';
import { IAuthenticationStore } from 'app.core/interfaces/stores';
import { InjectDependency } from 'app.shell/decorators';
import { Vue } from 'vue-class-component';

export default class App extends Vue {
  @InjectDependency(InjectableType.IAuthenticationStore)
  private readonly _authenticationStore!: IAuthenticationStore;

  public name = 'App';

  get loading() {
    return this._authenticationStore.isAuthenticating && this.$route.name != 'Login';
  }

  get layout() {
    return this.$route.meta.layout || 'empty-layout';
  }
}
</script>
