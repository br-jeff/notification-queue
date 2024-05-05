import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, Relation, ManyToMany, JoinColumn } from "typeorm"
import { CompanyEntity } from "./company.entity"

@Entity('messages')
export default class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column({ type: 'text', width: 3000 })
    content: string

    @Column()
    companyId: string

    @ManyToMany(() => CompanyEntity, (companyEntity : CompanyEntity) => companyEntity.messages)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    companies?: Relation<CompanyEntity>  
    
}