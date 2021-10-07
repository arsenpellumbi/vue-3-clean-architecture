<template>
  <q-card-section class="full-height full-width row justify-center items-center">
    <div class="text-align-center">
      <div class="text-h6 text-bold">Signing in</div>
      <q-spinner-facebook
        class="full-width"
        unelevated="unelevated"
        color="primary"
        size="lg"
        label="Login"
      ></q-spinner-facebook>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { InjectDependency } from 'app.shell/decorators';
import { InjectableType } from 'app.core/enums';
import { IAuthenticationStore } from 'app.core/interfaces/stores';

export default class OidcLoginSilentRenew extends Vue {
  @InjectDependency(InjectableType.IAuthenticationStore)
  private readonly _authenticationStore!: IAuthenticationStore;

  async mounted() {
    await this._authenticationStore.signinSilentCallback();
  }
}
</script>
