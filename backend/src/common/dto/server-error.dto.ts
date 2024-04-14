import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponseDto {
    @ApiProperty({
        example: 500,
        description: 'El código de estado HTTP.',
    })
    statusCode: number;

    @ApiProperty({
        example: 'Ha ocurrido un error interno en el servidor.',
        description: 'El mensaje de error.',
    })
    message: string;
}
