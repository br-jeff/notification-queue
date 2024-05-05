import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, OneToOne, JoinColumn, Relation } from "typeorm"
import { CompanyEntity } from "./company.entity"

@Entity('plans')
export default class PlanEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    name: string

    @Column()
    messagePerMonth: number

    @OneToOne(() => CompanyEntity, (companyEntity: CompanyEntity) => companyEntity.plan)
    @JoinColumn({ name: 'id', referencedColumnName: 'planId' })
    company?: Relation<CompanyEntity>
}