export interface profileData {
  /**
   * 닉네임
   *
   * @type {string}
   * @memberof Data
   * @maxLength 20
   */
  nick: string;

  /**
   * 직책
   *
   * @type {string}
   * @memberof Data
   */
  jobTitle: string;
}

export namespace DtoProfile {
  export namespace Request {
    export interface PostProfile extends Partial<profileData> {}
  }

  export namespace Response {
    export interface GetProfile {
      data: Pick<profileData, 'nick' | 'jobTitle'>;
    }

    export interface UpdateProfile {
      data: boolean;
    }
  }
}
