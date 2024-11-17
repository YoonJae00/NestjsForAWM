import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
} 