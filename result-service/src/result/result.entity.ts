import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  studentName: string;

  @Column()
  subject: string;

  @Column()
  marks: number;

  @Column()
  total: number;

  @Column()
  grade: string;
}
