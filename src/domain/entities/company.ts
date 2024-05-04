import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm"

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