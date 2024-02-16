import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

// const enum ROLES {
//   ADMIN = "ADMIN",
//   MANAGER = "MANAGER",
//   PARTICIPANT = "PARTICIPANT",
// }
const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  PARTICIPANT: "PARTICIPANT",
} as const;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Object.values(ROLES),
    default: ROLES.PARTICIPANT,
  })
  role: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "bytea", nullable: true })
  gdprSignedFile: Buffer | null;
}
