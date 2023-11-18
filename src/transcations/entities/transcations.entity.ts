import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { Account } from 'src/account/account.entity';

@Entity()
export class Transfer extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "int", nullable: true })
    fromUserId: number | null;
  
    @Column({ type: "int", nullable: true })
    fromAccountNumber: number | null;
  
    @Column({ type: "int", nullable: true })
    toUserId: number | null;
  
    @Column({ type: "int", nullable: true })
    toAccountNumber: number | null;
  
    @Column({ type: "int", nullable: true })
    amount: number | null;
  
    @Column({ type: "varchar", nullable: true })
    type: string | null;
  
    @Column({ type: "varchar", nullable: true })
    description: string | null;
  
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
}
