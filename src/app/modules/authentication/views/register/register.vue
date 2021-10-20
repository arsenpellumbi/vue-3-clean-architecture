<template>
  <q-card-section class="full-height full-width row justify-center items-center">
    <div class="text-align-center">
      <div class="q-my-sm text-h6 text-align-left">New user</div>
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
          class="q-mb-xs"
          outlined="outlined"
          v-model="password"
          type="password"
          label="Password"
          autocomplete="new-password"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please type your password']"
        ></q-input>
        <q-input
          outlined="outlined"
          v-model="rePassword"
          type="password"
          label="Retype password"
          autocomplete="new-password"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please retype your password']"
        ></q-input>
        <q-checkbox v-model="acceptAgreements" label="Accept all agreements"></q-checkbox>
        <q-card-section class="row items-center q-pa-sm q-my-sm">
          <q-btn outline="outline" color="primary" icon="mdi-arrow-left" to="/authentication/login"></q-btn>
          <q-space></q-space>
          <q-btn type="submit" :loading="loading" color="primary" label="Register"></q-btn>
        </q-card-section>
      </q-form>
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
  rePassword = '';
  acceptAgreements = false;

  onSubmit(): void {
    console.log('Register');
  }

  async mounted() {
    this.loading = true;
    const isAuthenticated = await this._authenticationStore.isUserLoggedIn();

    if (isAuthenticated) await this.$router.push({ path: this._configurations.initialRoutePath });
    else this.loading = false;
  }
}
</script>
