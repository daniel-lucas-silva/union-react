import {ResourceStore} from "./ResourceStore";
import {IUser} from "../models/user";
import {Users} from "../config/http";

export class UsersStore extends ResourceStore<IUser, number> {

  constructor(key: string) {
    super(key);
  }

  load = async ({acceptCache = false}) => {
    if (acceptCache)
      this.loadCache();

    this.setLoading(true);
    const page = 1;
    const { data: response } = await Users.all(page);
    this.cache = response;
    this.setMap(response.data);
    this.setPagination(response.pagination);
    this.setLoading(false);
  };

  get = (id: number, {acceptCache = false}) => {
    if (acceptCache) {
      const user = this.item(id);
      if (user) return Promise.resolve(user);
    }
    this.setLoading(true);

    // http
    //   .get()
    //   .then((response) => {
    //     this.setMap();
    //     this.setPagination();
    //   })
    //   .finally(() => {
    //     this.setLoading(false);
    //   })
  }


}
