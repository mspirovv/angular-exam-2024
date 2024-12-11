import { User } from "./user";


export interface Product {
        "_id": string,
        "productName": string,
        "description": string,
        "productCategory": string,
        "productImage": string,
        "userId": User,
        "likesCount": string[],
        "created_at": string,
        "updatedAt": string,
        "__v": number;
      }

  
      export interface ProductResponse {
        currentPage: number;
        products: Product[];
        totalPages: number;
        totalProducts: number;
      }