/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { container } from '~/inversify.config';

type ServiceIdentifier<T> = string | symbol | (new (...args: any[]) => T);

/**
 * Decorator to inject dependencies in components or classes
 * @param id optional id, could be auto generated with prop name
 */
export function InjectDependency<T>(identifier?: ServiceIdentifier<T>) {
  return <V extends object>(target: V, key: string) => {
    const id = identifier || key;

    const getter = () => {
      return container.get<T>(id);
    };

    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: getter,
    });
  };
}

/**
 * Decorator to inject dependencies for testing purposes
 * @param target: the component
 * @param key: the injected class
 * @param mock: the object mock
 * @example
 * mockInject(wrapper.vm, 'citiesService', {
 *   remove: x => x + 100000
 * })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mockInjectDependency<T extends object>(target: T, key: string, mock: any) {
  const getter = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return mock;
  };

  Reflect.deleteProperty(target, key);
  Reflect.defineProperty(target, key, {
    get: getter,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    set: (x) => x,
  });
}
