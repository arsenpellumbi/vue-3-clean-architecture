import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { PluginParams } from '~/core/types/plugin-params.type';

export default function <TStore>({ app }: PluginParams<TStore>) {
  const requireComponent = require.context('../components', false, /app-[\w-]+\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));

    app.component(componentName, componentConfig.default || componentConfig);
  });
}
