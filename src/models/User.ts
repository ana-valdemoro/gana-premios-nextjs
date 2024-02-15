import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

const enum ROLES {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  PARTICIPANT = "PARTICIPANT",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: ROLES;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
