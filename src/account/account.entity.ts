// account.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  accountName: string | null;

  @Column({ type: String, nullable: true , unique: true })
  accountNumber: string | null;

  @Column({ type: String, nullable: true })
  accountType: string | null;

  @Column({ type: Number, nullable: true })
  accountBalance: number | null;

  @Column({ type: String, nullable: true })
  accountStatus: string | null;

  @Column({ type: String, nullable: true })
  accountCurrency: string | null;

  @Column({ type: String, nullable: true })
  accountBank: string | null;

  @Column({ type: String, nullable: true })
  accountBranch: string | null;

  @Column({ type: String, nullable: true })
  accountAddress: string | null;

  @Column({ type: String, nullable: true })
  accountCity: string | null;

  @Column({ type: String, nullable: true })
  accountCountry: string | null;

  @Column({ type: String, nullable: true })
  accountPhone: string | null;

  @Column({ type: String, nullable: true })
  accountEmail: string | null;

  @Column({ type: String, nullable: true })
  accountWebsite: string | null;

  @Column({ type: String, nullable: true })
  accountDescription: string | null;

  @Column({ type: String, nullable: true })
  accountLogo: string | null;

  @Column({ type: String, nullable: true , default: Date.now().toString() })
  accountCreatedAt: string | null;

  @Column({ type: String, nullable: true })
  accountUpdatedAt: string | null;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
