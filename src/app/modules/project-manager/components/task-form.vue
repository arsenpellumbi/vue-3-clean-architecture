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
      <q-form class="q-gutter-md" @submit="saveTask">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ mutableTask.id ? 'Edit task' : 'Create task' }}</div>
          <q-space>
            <q-btn icon="mdi-close" flat="flat" round="round" dense="dense" v-close-popup></q-btn>
          </q-space>
        </q-card-section>
        <q-card-section class="scroll q-pa-md" style="max-height: 50vh">
          <q-input
            v-model="mutableTask.title"
            outlined="outlined"
            label="Title"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text"></q-icon>
            </template>
          </q-input>
          <q-input
            v-model="mutableTask.description"
            outlined="outlined"
            autogrow="autogrow"
            label="Description"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text-subject"></q-icon>
            </template>
          </q-input>
          <q-option-group v-model="mutableTask.type" :options="taskTypeOptions" color="primary"></q-option-group>
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
/* eslint-disable no-undef */
import { Vue, Options, prop } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { TaskType } from '~/core/enums';
import { Task } from '~/core/models';
import { ToastService, TOAST_SERVICE } from '~/services/toast-service';
import { TaskStore, TASK_STORE } from '~/store/task-store';

class Props {
  readonly projectId = prop<Guid>({
    default: () => '' as Guid,
  });

  readonly task = prop<Task>({
    default: () => new Task(),
  });

  readonly value = prop<boolean>({
    default: () => false,
    required: true,
  });
}

@Options({
  watch: {
    task(value: Task) {
      this.mutableTask = value.clone();
    },
  },
  emits: ['update:value'],
})
export default class TaskForm extends Vue.with(Props) {
  @lazyInject(TASK_STORE)
  private readonly _taskStore!: TaskStore;

  @lazyInject(TOAST_SERVICE)
  readonly _toast!: ToastService;

  mutableTask: Task = new Task();

  get taskTypeOptions() {
    return [
      {
        label: 'To do',
        value: TaskType.ToDo,
      },
      {
        label: 'In progress',
        value: TaskType.InProgress,
      },
      {
        label: 'Completed',
        value: TaskType.Completed,
      },
    ];
  }

  updateValue(value: boolean): void {
    if (!value) this.clearTaskForm();
    this.$emit('update:value', value);
  }

  closeDialog(): void {
    this.updateValue(false);
  }

  clearTaskForm() {
    this.mutableTask = new Task();
  }

  async createTask() {
    if (!this._taskStore) return;
    await this._taskStore
      .createTask({
        projectId: this.projectId,
        title: this.mutableTask.title,
        description: this.mutableTask.description,
        type: this.mutableTask.type,
      })
      .then(() => {
        this._toast.success('Task created successfully!');
        this.closeDialog();
      });
  }

  async updateTask() {
    await this._taskStore
      .updateTask({
        id: this.mutableTask.id,
        title: this.mutableTask.title,
        description: this.mutableTask.description,
        type: this.mutableTask.type,
      })
      .then(() => {
        this._toast.success('Task updated successfully!');
        this.closeDialog();
      });
  }

  async saveTask() {
    if (this.mutableTask.id) await this.updateTask();
    else await this.createTask();
  }
}
</script>
