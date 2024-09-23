export namespace dtoProfile {
  export interface Request {}

  export interface Data extends Profile {}

  export interface Profile {
    nick: string;
  }

  export interface Response {
    data: Data;
  }
}
