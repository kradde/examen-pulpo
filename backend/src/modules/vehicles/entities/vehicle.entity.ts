import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
    @ApiProperty({ description: 'El id del vehículo' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombre del vehículo' })
    @Column({ type: String, nullable: true })
    name?: string | null;

    @ApiProperty({ description: 'Placa del vehículo' })
    @Column({ type: String, nullable: true })
    plate?: string | null;

    @ApiProperty({ description: 'Número de identificación del vehículo (VIN)' })
    @Column({ nullable: true })
    vin?: string;

    @ApiProperty({ description: 'Número de serie del vehículo' })
    @Column({ nullable: true })
    serialNumber?: string;

    @ApiProperty({ description: 'Creado por' })
    @Column({ nullable: true })
    createdBy?: string;

    @ApiProperty({
        description: 'La fecha en que se creó el registro del vehículo',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description:
            'La fecha en que se actualizó por última vez el registro del vehículo',
    })
    @UpdateDateColumn()
    updatedAt: Date;
}
