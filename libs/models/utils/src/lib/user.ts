export class User {
  displayName!: string | null | undefined;
  uid!: string;
  subscriptions: { [key: string]: unknown }[] = [];

  constructor(obj: Partial<User>) {
    Object.assign(this, obj);
  }
}
