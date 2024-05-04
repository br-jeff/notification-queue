import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    company_id: string

    @Column()
    name: string

    @Column()
    password: string
}