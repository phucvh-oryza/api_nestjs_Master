import { Images } from '../entities/image.entity';

export class ProductsRespone {
  ID: string;

  Name: string;

  Description: string;

  Price: number;

  Quantity: number;

  Datemade: string;

  CategoryID: string;

  UserID: number;

  Status: boolean;

  CreatedAt: Date;

  ListImages: Images[];
}
