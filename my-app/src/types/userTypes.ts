export interface iUser {
  id: number;
  email: string;
  first_name: string;
  gender: string;
  ip_address: string;
  last_name: string;
}

export interface iUserCreateDto {
  email: string;
  first_name: string;
  gender: string;
  ip_address: string;
  last_name: string;
}

export interface iUserEditDto {
  email: string;
  first_name: string;
  gender: string;
  ip_address: string;
  last_name: string;
}