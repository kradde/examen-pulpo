import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
    @ApiProperty({
        example: 404,
        description: 'El código de estado HTTP.',
    })
    statusCode: number;

    @ApiProperty({
        example: 'No vehicle found with id 2',
        description: 'El mensaje de error.',
    })
    message: string;

    @ApiProperty({
        example: 'Not Found',
        description: 'La descripción del error.',
    })
    error: string;
}
