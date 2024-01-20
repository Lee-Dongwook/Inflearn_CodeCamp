import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    number!: number

    @Column()
    writer!: string

    @Column()
    title!: string

    @Column()
    contents!: string
}