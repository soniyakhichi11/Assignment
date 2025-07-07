import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserRole = 'student' | 'moderator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}