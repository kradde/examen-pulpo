import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
    @ApiProperty({
        example: 400,
        description: 'El código de estado HTTP.',
    })
    statusCode: number;

    @ApiProperty({
        example: 'Invalid date format for createdAt',
        description: 'El mensaje de error.',
    })
    message: string | string[];

    @ApiProperty({
        example: 'Bad Request',
        description: 'La descripción del error.',
    })
    error: string;
}

export class BadRequestResponseExtendedDto extends BadRequestResponseDto {
    @ApiProperty({
        example: ['createdBy must be a string'],
        description: 'El mensaje de error.',
        isArray: true,
        type: 'string',
    })
    message: string[];
}
