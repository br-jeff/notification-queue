import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, PrimaryColumn } from "typeorm"

@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    companyId: string

    @Column()
    name: string

    @Column()
    username: string

    @Column()
    password: string
}