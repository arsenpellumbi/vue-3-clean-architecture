import { date } from 'quasar';
import { Vue, Options } from 'vue-class-component';

import { lazyInject } from '~/inversify.config';
import TaskForm from '../../components/task-form.vue';

import { Project, Task } from '~/core/models';
import { ProjectStore, PROJECT_STORE } from '~/store/project-store';
import { TaskStore, TASK_STORE } from '~/store/task-store';

@Options({
  components: {
    TaskForm,
  },
  watch: {
    async filter(value: string) {
      await this._taskStore.searchTasks({
        pageIndex: 0,
        pageSize: this.taskList.pagination.pageSize,
        projectId: this.project.id,
        value: value,
      });
    },
  },
})
export default class ProjectItem extends Vue {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  @lazyInject(TASK_STORE)
  private readonly _taskStore!: TaskStore;

  project: Project = new Project();
  createTaskForm = false;
  editTaskForm = false;
  taskToEdit: Task = new Task();

  showAsGrid = false;
  filter = '';
  columns = [
    {
      name: 'title',
      align: 'left',
      label: 'Title',
      field: 'title',
      sortable: true,
    },
    {
      name: 'description',
      align: 'left',
      label: 'Description',
      field: 'description',
      sortable: true,
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date',
      field: 'date',
      sortable: true,
      format: (val: Date) => date.formatDate(val, 'DD MMMM YYYY HH:mm:ss'),
    },
    {
      name: 'type',
      align: 'left',
      label: 'Type',
      field: 'type',
      sortable: true,
    },
    { name: 'actions', align: 'center', label: 'Actions' },
  ];

  get taskList() {
    return this._taskStore.taskList;
  }

  openTask(task: Task) {
    this.editTask(task);
  }

  editTask(task: Task) {
    this.taskToEdit = task.clone();
    this.editTaskForm = true;
  }

  async deleteTask(task: Task) {
    await this._taskStore.deleteTask({ id: task.id });
  }

  async changeTasksPageSize(pageSize: number) {
    if (pageSize != this.taskList.pagination.pageSize) {
      await this._taskStore.searchTasks({
        projectId: this.project.id,
        pageIndex: 0,
        pageSize: pageSize,
        value: this.filter,
      });
    }
  }

  async changeTasksPage(pageIndex: number) {
    if (pageIndex != this.taskList.pagination.pageIndex) {
      await this._taskStore.searchTasks({
        pageIndex: pageIndex,
        pageSize: this.taskList.pagination.pageSize,
        projectId: this.project.id,
        value: this.filter,
      });
    }
  }

  async beforeMounted() {
    await this._taskStore.reset();
  }

  async mounted() {
    this.project = await this._projectStore.getProjectById({
      id: this.$route.params.projectId as Guid,
    });

    await this._taskStore.fetchTasks({
      projectId: this.project.id,
      pageIndex: 0,
      pageSize: this.taskList.pagination.pageSize,
    });
  }
}
