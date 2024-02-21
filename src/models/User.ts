import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';

// const enum ROLES {
//   ADMIN = "ADMIN",
//   MANAGER = "MANAGER",
//   PARTICIPANT = "PARTICIPANT",
// }
const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  PARTICIPANT: 'PARTICIPANT',
} as const;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  encryptPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  @Column({
    type: 'enum',
    enum: Object.values(ROLES),
    default: ROLES.PARTICIPANT,
  })
  role: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'bytea', nullable: true })
  gdprSignedFile: Buffer | null;

  @Column({ type: 'text', nullable: true })
  token: string | null;

  @Column({ default: false })
  active: boolean;
}
