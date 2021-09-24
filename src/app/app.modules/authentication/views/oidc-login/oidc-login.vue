<template>
  <q-card-section class="full-height full-width row justify-center items-center">
    <div class="text-align-center">
      <q-btn
        class="q-my-sm"
        outline="outline"
        no-caps="no-caps"
        color="primary"
        size="lg"
        label="Login with identity"
        :loading="loading"
        @click="login"
      >
        <template v-slot:loading>
          <q-spinner-facebook></q-spinner-facebook>
        </template>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { InjectDependency } from 'app.shell/decorators';
import { InjectableType } from 'app.core/enums';
import { IAuthenticationStore } from 'app.core/interfaces/stores';
import { Configurations } from 'app.core/configurations';

export default class OidcLogin extends Vue {
  @InjectDependency(InjectableType.IAuthenticationStore)
  private readonly _authenticationStore!: IAuthenticationStore;

  @InjectDependency(Configurations)
  private readonly _configurations!: Configurations;

  loading = false;

  async login(): Promise<void> {
    this.loading = true;
    await this._authenticationStore.login(this._configurations.identity.redirectUri);
    this.loading = false;
  }

  async mounted() {
    this.loading = true;
    const isAuthenticated = await this._authenticationStore.isUserLoggedIn();

    if (isAuthenticated) await this.$router.push({ path: this._configurations.initialRoutePath });
    else this.loading = false;
  }
}
</script>
