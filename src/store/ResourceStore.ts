import { observable, action, computed } from 'mobx'
import {IResource, Paginated, Pagination} from "../models/common";

export class ResourceStore<T extends IResource<K>, K> {

  @observable
  private map = observable.map<K, T>();

  @observable
  pagination: Pagination = {
    total: 0,
    size: 0,
    offset: 0,
  };

  @observable
  loading = false;

  constructor(public key: string) {}

  @computed
  get items(): T[] {
    return Array.from(this.map.values());
  };

  item = (key: K) => {
    return this.map.get(key);
  };

  @action
  protected setPagination = (pagination: Pagination): void => {
    this.pagination = pagination;
  };

  @action
  protected setLoading = (loading: boolean): void => {
    this.loading = loading;
  };

  @action
  protected set = (key: K, value: T): void => {
    this.map.set(key, value);
  };

  @action
  protected delete = (key: K): void => {
    this.map.delete(key);
  };

  clear = (): void => {
    this.map.clear();
    this.pagination = {
      total: 0,
      size: 0,
      offset: 0,
    };
  };

  protected get cache(): Paginated<T> {
    const storage = localStorage.getItem(this.key);
    return storage && JSON.parse(storage);
  }

  protected set cache(data: Paginated<T>) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  protected loadCache = () => {
    const cache = this.cache;
    if(cache) {
      this.setPagination(cache.pagination);
      this.setMap(cache.data);
    }
  };

  protected setMap = (map: T[]) => {
    map.forEach((item) => {
      this.set(item.id, item);
    });
  }
}
