import { Post } from "./post";
import { User } from "./user";


export interface newProduct {
    
        "subscribers": string[],
        "posts": Post[],
        "_id": string,
        "productName": string,
        "userId": User,
        "created_at": string,
        "updatedAt": string,
        "__v": number;
      }
