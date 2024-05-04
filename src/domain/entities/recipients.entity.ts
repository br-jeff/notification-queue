import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity()
export default class MessageEntity extends BaseEntity {
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