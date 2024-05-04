import { BaseEntity } from "typeorm";

export type DefaultModelOmit<D> = Omit<D, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'recover' | 'reload' | keyof typeof BaseEntity>


