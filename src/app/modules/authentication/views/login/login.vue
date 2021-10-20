<template>
  <q-card-section class="full-height full-width row justify-center items-center">
    <div class="text-align-center">
      <div class="q-my-sm text-h6 text-align-left">Welcome</div>
      <q-form class="text-align-left" @submit="onSubmit" style="width: 400px; max-width: 80vw">
        <q-input
          class="q-mb-xs"
          outlined="outlined"
          v-model="username"
          label="Username"
          autocomplete="username"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please type your username']"
        ></q-input>
        <q-input
          outlined="outlined"
          v-model="password"
          type="password"
          label="Password"
          autocomplete="current-password"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please type your password']"
        ></q-input>
        <q-checkbox v-model="rememberMe" label="Remember me"></q-checkbox>
        <q-card-section class="row items-center q-pa-sm q-my-sm">
          <q-btn type="submit" :loading="loading" color="primary" label="Login"></q-btn>
          <q-space></q-space>
          <q-btn color="primary" outline="outline" label="Register" to="/authentication/register"></q-btn>
        </q-card-section>
      </q-form>
      <q-separator class="q-my-md"></q-separator>
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

export default class Login extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(Configurations)
  private readonly _configurations!: Configurations;

  loading = false;
  username = '';
  password = '';
  rememberMe = false;

  async login(): Promise<void> {
    this.loading = true;
    await this._authenticationStore.login(this._configurations.identity.redirectUri);
    const isUserLoggedIn = await this._authenticationStore.isUserLoggedIn();
    if (isUserLoggedIn) await this.$router.push({ path: this._configurations.initialRoutePath });
    this.loading = false;
  }

  onSubmit(): void {
    console.log('Login');
  }

  async mounted() {
    this.loading = true;
    const isAuthenticated = await this._authenticationStore.isUserLoggedIn();

    if (isAuthenticated) await this.$router.push({ path: this._configurations.initialRoutePath });
    else this.loading = false;
  }
}
</script>
