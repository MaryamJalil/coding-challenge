import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DeveloperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  level: 'SENIOR' | 'JUNIOR';
}
