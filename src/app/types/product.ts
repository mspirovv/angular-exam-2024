import { Post } from "./post";
import { User } from "./user";


export interface Product {
    
        "subscribers": string[],
        "reviews": Post[],
        "_id": string,
        "productName": string,
        "productCategory": string,
        "productImage": string,
        "userId": User,
        "created_at": string,
        "updatedAt": string,
        "__v": number;
      }
