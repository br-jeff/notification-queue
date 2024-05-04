import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity } from "typeorm"

@Entity('plans')
export default class PlanEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    name: string

    @Column()
    messagesPerMonth: string
}