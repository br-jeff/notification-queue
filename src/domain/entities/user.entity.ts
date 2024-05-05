import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, Relation, OneToMany, ManyToMany } from "typeorm"
import { CompanyEntity } from "./company.entity"
import RecipientsEntity from "./recipients.entity"

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

    @Column({ default: false })
    isAdmin?: boolean

    @ManyToOne(() => CompanyEntity, company => company.user)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company?: Relation<CompanyEntity>[]

    @ManyToMany(() => RecipientsEntity, (recipientsEntity: RecipientsEntity) => recipientsEntity.users)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    recipients?: Relation<UserEntity>[]
}