import { Roles } from './enums';

export interface IPerson extends IBaseModel {
  id: number,
  loginID: number,
  firstname: string,
  lastname: string,

  login?: ILogin,
  contacts: undefined,
  roles?: IRole[],
}

export interface ILogin extends IBaseModel {
  id: number,
  username: string,
  password?: string,
  verified_at: string,
}

export interface IRole extends IBaseModel {
  id: number,
  name: Roles,
  display_?: string,
  author_id: number,

  author?: IPerson,
}

export interface IContact extends IBaseModel {
  id: number,
  value: string,
  contact_type_id: number,
  person_id: number,

  person?: IPerson,
  contact_type: undefined,
}

export interface IRecordData extends IBaseModel {
  id: number,
  row: number,
  column: number,
  value: string,
  recordID: number,
}

export interface IRecord extends IBaseModel {
  id: number,
  authorID: number,

  name: string,
  data: IRecordData[],

  author?: IPerson;
}

interface IBaseModel {
  created_at: string,
  modified_at?: string,
  deleted_at?: string,
}
