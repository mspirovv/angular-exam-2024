export interface User {
    "themes": string[],
    "posts": string[],
    "_id": string,
    "tel": string,
    "email": string,
    "username": string,
    "password": string,
    "created_at": string,
    "updatedAt": string,
    "__v": number;
  }

  export interface userForAuth {  
    username: string,
    email: string,
    password: string,
    id: string,
  
  }

  export interface profileDetails {
    username: string,
    email: string,
    tel: string,
  }