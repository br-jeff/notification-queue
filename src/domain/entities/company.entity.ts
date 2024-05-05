import { Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Generated, JoinColumn, Relation, ManyToOne, ManyToMany, OneToMany, OneToOne, VirtualColumn } from "typeorm"
import MessageEntity from "./message.entity"
import UserEntity from "./user.entity"
import PlanEntity from "./plan.entity"
import CountMessageEntity from "./count-message.entity"

@Entity('companies')
export class CompanyEntity extends BaseEntity {   
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid') 
    id: string

    @Column({ type: 'uuid', name: 'plan_id' })
    planId: string

    @Column()
    name: string

    @OneToMany(() => UserEntity, userEntity => userEntity.company)
    @JoinColumn({ name: 'id', referencedColumnName: 'companyId' })
    user?: Relation<UserEntity>[]

    @ManyToMany(() => MessageEntity, messageEntity => messageEntity.companies)
    @JoinColumn({ name: 'id', referencedColumnName: 'companyId' })
    messages?: Relation<MessageEntity>[]
 
    @OneToOne(() => PlanEntity, (planEntity: PlanEntity) => planEntity.company)
   // @JoinColumn({ name: 'planId', referencedColumnName: 'id' })
    plan?: Relation<PlanEntity>

    @ManyToMany(() => CountMessageEntity, (countMessageEntity : CountMessageEntity) => countMessageEntity.company)
    @JoinColumn({ name: 'id', referencedColumnName: 'companyId' })
    countMessages?: Relation<CountMessageEntity>
}