import { Entity, PrimaryGeneratedColumn, Generated, Column } from "typeorm"

@Entity()
export default class Message {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    message_id: string

    @Column()
    user_id: string

    @Column("boolean")
    is_open: boolean
}