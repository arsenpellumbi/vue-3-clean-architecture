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
import { InjectDependency } from '~/shell/decorators';
import { InjectableType } from '~/core/enums';
import { IAuthenticationStore } from '~/core/interfaces/stores';
import { Configurations } from '~/core/configurations';

export default class OidcLoginRedirect extends Vue {
  @InjectDependency(InjectableType.IAuthenticationStore)
  private readonly _authenticationStore!: IAuthenticationStore;

  @InjectDependency(Configurations)
  private readonly _configurations!: Configurations;

  async mounted() {
    await this._authenticationStore.signinRedirectCallback(this.$route.fullPath);
    await this.$router.push({ path: this._configurations.initialRoutePath });
  }
}
</script>
