import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export default class CountMessage {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    company_id: string
}