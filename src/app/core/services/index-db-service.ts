/* eslint-disable @typescript-eslint/no-explicit-any */
import { interfaces } from 'inversify';
import { provide } from '~/inversify.config';

const _appIndexedDbCollections = ['Projects', 'Tasks'];
let _appIndexedDB: IDBDatabase | null = null;

const request = window.indexedDB.open('pigeon-app', 1);

request.onerror = (e: Event): void => {
  console.log('Error opening IndexedDB', e);
};

request.onsuccess = (e: Event): void => {
  _appIndexedDB = (e.target as unknown as { result: IDBDatabase }).result;
};

request.onupgradeneeded = (e: Event): void => {
  console.log('onupgradeneeded');
  _appIndexedDB = (e.target as unknown as { result: IDBDatabase | null }).result;
  if (_appIndexedDB) {
    for (let i = 0, length = _appIndexedDbCollections.length; i < length; i++) {
      _appIndexedDB.createObjectStore(_appIndexedDbCollections[i]);
    }
  }
};

export const INDEX_DB_SERVICE: interfaces.ServiceIdentifier<IndexDbService> = 'INDEX_DB_SERVICE';

@provide<IndexDbService>(INDEX_DB_SERVICE)
export class IndexDbService {
  async getObjects<T>(collection: string): Promise<T[]> {
    return await new Promise((resolve, reject) => {
      if (!_appIndexedDB) return reject();

      const trans = _appIndexedDB.transaction([collection], 'readonly');

      const store = trans.objectStore(collection);
      const objects: T[] = [];

      trans.oncomplete = (): void => {
        resolve(objects);
      };

      store.openCursor().onsuccess = (e: Event): void => {
        const cursor = (e.target as unknown as { result: IDBCursorWithValue }).result;
        if (cursor) {
          objects.push(cursor.value as T);
          cursor.continue();
        }
      };
    });
  }

  async getObject<T>(collection: string, key: string): Promise<T> {
    return await new Promise((resolve, reject) => {
      if (!_appIndexedDB) return reject();

      const trans = _appIndexedDB.transaction([collection], 'readonly');

      const store = trans.objectStore(collection);
      let object: any;

      trans.oncomplete = (): void => {
        resolve(object);
      };

      store.get(key).onsuccess = (e: Event): void => {
        object = (e.target as unknown as { result: T }).result;
      };
    });
  }

  async saveObject<T>(collection: string, key: string, object: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!_appIndexedDB) return reject();

      const trans = _appIndexedDB.transaction([collection], 'readwrite');
      trans.oncomplete = (): void => {
        resolve();
      };

      const store = trans.objectStore(collection);
      store.put(object, key);
    });
  }

  async deleteObject(collection: string, key: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (!_appIndexedDB) return reject();

      const trans = _appIndexedDB.transaction([collection], 'readwrite');
      trans.oncomplete = (): void => {
        resolve();
      };

      const store = trans.objectStore(collection);
      store.delete(key);
    });
  }
}
