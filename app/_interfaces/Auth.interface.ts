export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type ISODateString = string;

export interface DefaultSession {
  user?: User;
  expires: ISODateString;
}
