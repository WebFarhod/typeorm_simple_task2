import { AppDataSource } from "../utils/config";
import Product from "../entities/product.entity";
import BaseError from "../errors/base.error";
import IProduct from "../types/product.type";

class ProductService {
  private readonly productRepository = AppDataSource.getRepository(Product);

  async create(data: IProduct) {
    try {
      const product = this.productRepository.create(data);
      return this.productRepository.save(product);
    } catch (error) {
      throw BaseError.BadRequest("something went wrong");
    }
  }
  async all(): Promise<Product[] | []> {
    try {
      return await this.productRepository.find({
        relations: ["user"],
        select: {
          id: true,
          name: true,
          volume: true,
          user: {
            id: true,
          },
        },
      });
    } catch (error) {
      throw BaseError.BadRequest("something went wrong");
    }
  }
  async findById(id: string): Promise<Product | null> {
    try {
      return await this.productRepository.findOne({
        where: { id },
        relations: ["user"],
        select: {
          id: true,
          name: true,
          volume: true,
          user: {
            id: true,
          },
        },
      });
    } catch {
      return null;
    }
  }
  async update(id: string, data: Partial<IProduct>): Promise<Product | null> {
    try {
      const product = await this.findById(id);

      if (!product) {
        return null;
      }
      this.productRepository.merge(product, data);
      return await this.productRepository.save(product);
    } catch {
      return null;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw BaseError.BadRequest("something went wrong");
    }
  }
}

export default new ProductService();
