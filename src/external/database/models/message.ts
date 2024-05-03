import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column({type: 'text', width: 3000 })
    content: string

    @Column()
    company_id: string
}