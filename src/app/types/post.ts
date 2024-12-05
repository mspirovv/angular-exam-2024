import { newProduct } from "./theme"
import { User } from "./user"

export interface Post {
  "likes": string[],
  "_id": string,
  "text": string,
  "userId": User,
  "themeId": newProduct,
  "created_at": string,
  "updatedAt": string,
  "__v": number
}