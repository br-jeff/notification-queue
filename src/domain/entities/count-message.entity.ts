import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity()
export default class CountMessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    company_id: string
}