<template>
  <q-card class="my-card">
    <q-item>
      <q-item-section>
        <div class="text-h6">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="text-caption text-grey">{{ user.email }}</div>
      </q-item-section>
    </q-item>
    <q-list>
      <q-item clickable="clickable">
        <q-item-section avatar="avatar">
          <q-icon name="mdi-account"></q-icon>
        </q-item-section>
        <q-item-section avatar="avatar">Profile</q-item-section>
      </q-item>
      <q-item clickable="clickable">
        <q-item-section avatar="avatar">
          <q-icon name="mdi-notebook"></q-icon>
        </q-item-section>
        <q-item-section avatar="avatar">Tasks</q-item-section>
      </q-item>
      <q-item clickable="clickable">
        <q-item-section avatar="avatar">
          <q-icon name="mdi-email"></q-icon>
        </q-item-section>
        <q-item-section avatar="avatar">Messages</q-item-section>
      </q-item>
    </q-list>
    <q-separator></q-separator>
    <q-card-actions>
      <q-space></q-space>
      <q-btn outline="outline" color="negative" @click="logout" icon="mdi-logout" label="Logout"></q-btn>
      <q-space></q-space>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { InjectableType } from 'app.core/enums';
import { IAuthenticationStore } from 'app.core/interfaces/stores';
import { User } from 'app.core/models';
import { InjectDependency } from 'app.shell/decorators';

export default class AppUserBadge extends Vue {
  @InjectDependency(InjectableType.IAuthenticationStore)
  private readonly _authenticationStore!: IAuthenticationStore;

  get user() {
    return this._authenticationStore.user || new User();
  }

  async logout() {
    await this._authenticationStore.logout();
  }
}
</script>
