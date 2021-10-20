<template>
  <q-dialog
    :model-value="value"
    @update:model-value="
      (value) => {
        updateValue(value);
      }
    "
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-form class="q-gutter-md" @submit="saveProject">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ mutableProject.id ? 'Edit project' : 'Create project' }}</div>
          <q-space></q-space>
          <q-btn icon="mdi-close" flat="flat" round="round" dense="dense" v-close-popup></q-btn>
        </q-card-section>
        <q-card-section class="scroll q-pa-md" style="max-height: 50vh">
          <q-input
            v-model="mutableProject.title"
            outlined="outlined"
            label="Title"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || `Please type something`]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text"></q-icon>
            </template>
          </q-input>
          <q-input
            v-model="mutableProject.description"
            outlined="outlined"
            autogrow="autogrow"
            label="Description"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || `Please type something`]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text-subject"></q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense="dense" flat="flat" type="reset" label="Cancel" icon="mdi-close" v-close-popup></q-btn>
          <q-btn dense="dense" flat="flat" type="submit" label="Save" color="primary" icon="mdi-check"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, prop, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { Project } from '~/core/models';
import { ToastService, TOAST_SERVICE } from '~/services/toast-service';
import { ProjectStore, PROJECT_STORE } from '~/store/project-store';

class Props {
  readonly project = prop<Project>({
    default: () => new Project(),
  });

  readonly value = prop<boolean>({
    default: () => false,
    required: true,
  });
}

@Options({
  watch: {
    project(value: Project) {
      this.mutableProject = value.clone();
    },
  },
  emits: ['update:value'],
})
export default class ProjectForm extends Vue.with(Props) {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  @lazyInject(TOAST_SERVICE)
  private readonly _toast!: ToastService;

  mutableProject: Project = new Project();

  updateValue(value: boolean): void {
    if (!value) this.clearProjectForm();
    this.$emit('update:value', value);
  }

  closeDialog(): void {
    this.updateValue(false);
  }

  clearProjectForm() {
    this.mutableProject = new Project();
  }

  async createProject() {
    await this._projectStore
      .createProject({
        title: this.mutableProject.title,
        description: this.mutableProject.description,
      })
      .then(() => {
        this._toast.success('Project created successfully!');
        this.closeDialog();
      });
  }

  async updateProject() {
    await this._projectStore
      .updateProject({
        id: this.mutableProject.id,
        title: this.mutableProject.title,
        description: this.mutableProject.description,
      })
      .then(() => {
        this._toast.success('Project updated successfully!');
        this.closeDialog();
      });
  }

  async saveProject() {
    if (this.mutableProject.id) await this.updateProject();
    else await this.createProject();
  }
}
</script>
