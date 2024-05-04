import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity('companies')
export default class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column({type: 'text', width: 3000 })
    content: string

    @Column()
    company_id: string
}