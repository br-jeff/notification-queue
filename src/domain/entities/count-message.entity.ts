import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, ManyToMany, JoinColumn, Relation } from "typeorm"
import { CompanyEntity } from "./company.entity"

@Entity('count_messages')
export default class CountMessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column()
    companyId: string

    @ManyToMany(() => CompanyEntity, (companyEntity: CompanyEntity) => companyEntity.countMessages)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company?: Relation<CompanyEntity>[]
}