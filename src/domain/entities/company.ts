import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity()
export class CompanyEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    plan_id: string
}