import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity('messages')
export default class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    messageId: string

    @Column()
    userId: string

    @Column("boolean")
    isOpen: boolean
}