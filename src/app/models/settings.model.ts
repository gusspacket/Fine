export interface Settings {
 logo: string;
 phone_main: string;
 phone_sec: string;
 copyright: string;
 social: Social[];
 pay_system: PaySystem[];
}


export interface Social {
  name: string;
  description: string;
  img_url: string;
  active: boolean;
}

export interface PaySystem {
  name: string;
  img_url: string;
  description: string;
}










