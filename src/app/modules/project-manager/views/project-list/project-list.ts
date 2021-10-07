import { date } from 'quasar';

import { Vue, Options } from 'vue-class-component';
import { InjectDependency } from '~/shell/decorators';

import ProjectForm from '../../components/project-form.vue';
import { InjectableType } from '~/core/enums';
import { Project } from '~/core/models';
import { IProjectStore } from '~/core/interfaces/stores';

@Options({
  components: {
    ProjectForm,
  },
  watch: {
    async filter(value: string) {
      await this._projectStore.searchProjects({
        pageIndex: 0,
        pageSize: this.projectList.pagination.pageSize,
        value: value,
      });
    },
  },
})
export default class ProjectList extends Vue {
  @InjectDependency(InjectableType.IProjectStore)
  private readonly _projectStore!: IProjectStore;

  createProjectForm = false;
  editProjectForm = false;
  projectToEdit: Project = new Project();

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
    { name: 'actions', align: 'center', label: 'Actions' },
  ];

  get projectList() {
    return this._projectStore.projectList;
  }

  async openProject(project: Project) {
    await this.$router.push({
      name: 'ProjectItem',
      params: { projectId: project.id as string },
    });
  }

  editProject(project: Project) {
    this.projectToEdit = project;
    this.editProjectForm = true;
  }

  async deleteProject(project: Project) {
    await this._projectStore.deleteProject({ id: project.id });
  }

  async changeProjectsPageSize(pageSize: number) {
    if (pageSize != this.projectList.pagination.pageSize) {
      await this._projectStore.searchProjects({
        pageIndex: 0,
        pageSize: pageSize,
        value: this.filter,
      });
    }
  }

  async changeProjectsPage(pageIndex: number) {
    if (pageIndex != this.projectList.pagination.pageIndex) {
      await this._projectStore.searchProjects({
        pageIndex: pageIndex,
        pageSize: this.projectList.pagination.pageSize,
        value: this.filter,
      });
    }
  }

  async beforeMounted() {
    await this._projectStore.reset();
  }

  async mounted() {
    await this._projectStore.fetchProjects({
      pageIndex: 0,
      pageSize: this.projectList.pagination.pageSize,
    });
  }
}
