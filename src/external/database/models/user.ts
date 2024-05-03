import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    company_id: string

    @Column()
    name: string
}