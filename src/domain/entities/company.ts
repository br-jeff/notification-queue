import { Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Generated } from "typeorm"

@Entity('companies')
export class CompanyEntity extends BaseEntity {   
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    planId: string

    @Column()
    name: string
}