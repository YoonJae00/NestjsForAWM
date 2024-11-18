import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserAuthority } from '../../auth/entity/user-authority.entity';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userId: string;

    @Column()
    userPassword: string;

    @Column()
    userName: string;

    @Column()
    userEmail: string;

    @Column({ nullable: true })
    userPhone: string;

    @Column({ nullable: true })
    userAddress: string;

    @OneToMany(type=>UserAuthority, userAuthority=>userAuthority.user, {eager: true})
    authorities: any[];

} 