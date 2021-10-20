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
import { lazyInject } from '~/inversify.config';
import { Configurations } from '~/core/configurations';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/store/authentication-store';

export default class OidcLogin extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(Configurations)
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
