import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ValidateTokenDto{
    @IsNotEmpty()
    @ApiProperty({example:'your.jwt.token.here'})
    token:string

}