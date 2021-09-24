import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { PluginParams } from 'app.core/types';

export default function <TStore>({ app }: PluginParams<TStore>) {
  const requireComponent = require.context('../layouts', false, /[\w-]+\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));

    app.component(componentName, componentConfig.default || componentConfig);
  });
}
