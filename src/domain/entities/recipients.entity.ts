import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, OneToOne, JoinColumn, Relation, ManyToMany } from "typeorm"
import UserEntity from "./user.entity"

@Entity('recipients')
export default class RecipientsEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    messageId: string

    @Column()
    userId: string

    @Column("boolean")
    isOpen: boolean

    @ManyToMany(() => UserEntity, (userEntity: UserEntity) => userEntity.recipients)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users?: Relation<UserEntity>

}