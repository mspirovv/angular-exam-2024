export interface User {
    "products": string[],
    "reviews": string[],
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
    _id: string,
    token?: any;  // Добавете токен като опционално свойство

  }

  export interface profileDetails {
    username: string,
    email: string,
    tel: string,
  }