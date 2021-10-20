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
import { lazyInject } from '~/inversify.config';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/store/authentication-store';

export default class OidcLoginRedirect extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  async mounted() {
    await this._authenticationStore.signoutRedirectCallback(this.$route.fullPath);
    await this.$router.push({ path: '/authentication' });
  }
}
</script>
