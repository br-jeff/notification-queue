import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export default class Plan {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    name: string

    @Column()
    messagesPerMonth: string
}