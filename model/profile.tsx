export interface Profile {
  dataUser: {
    name: string;
    surname: string;
    email: string;
    tel: string;
    id_card: string;
    bookbank: string;
  };
  provider_login: {
    providerUid: string;
    providerSource: string;
    providerType: string;
    img: string;
    displayName: string;
  };
}

// export interface ProviderLogin {
// providerUid:string
// providerSource:string
// providerType:string
// img:string
// displayName:string
// }
