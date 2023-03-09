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

  persons: IPerson[],
}

export interface IRole extends IBaseModel {
  id: number,
  name: Roles,
  displayName?: string,
  person_id: number,

  person?: IPerson,
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
  personID: number,
  name: string,
  data: IRecordData[],

  person?: IPerson,
}

export interface IRecordGroup extends IBaseModel {
  id: number,
  recordGroupID?: number,
  personID: number,
  name: string,

  person?: IPerson,
  groups?: IRecordGroup[],
  records?: IRecord[],
}

export interface IPersonGroupRelation extends IBaseModel {
  id: number,
  personID: number,
  personGroupID: number,
  state: IPersonGroupRelationsState,

  person?: IPerson,
  group?: IPersonGroup,
}

export const enum IPersonGroupRelationsState {
  BANNED = 0,
  WAITING = 1,
  JOINED = 2,
}

export interface IPersonGroup extends IBaseModel {
  id: number,
  name: string,
  displayName?: string,
  person_id: number,

  person?: IPerson,
  members?: IPersonGroupRelation[],
}

export interface IRecordCanvas {
  records: IRecord[],
  groups: IRecordGroup[],
}

interface IBaseModel {
  created_at: string,
  modified_at?: string,
  deleted_at?: string,
}
