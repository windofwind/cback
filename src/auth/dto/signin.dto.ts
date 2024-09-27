import { Define } from '@app/1-common/base.type';

interface signinData {
  accessToken: string;
  refreshToken: string;
  profile: profileData;
}

interface profileData {
  nick: string;
  jobTitle: string;
}

export namespace DtoSignin {
  export namespace Request {
    export interface PostSignin {
      /**
       * 이메일
       *
       * @type {Define.Email}
       * @memberof PostSignin
       */
      email: Define.Email;

      /**
       * 패스워드
       *
       * @type {Define.Password}
       * @memberof PostSignin
       */
      password: Define.Password;
    }
  }

  export namespace Response {
    export interface PostSignin {
      data: signinData;
    }
  }
}
