import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    plan_id: string
}