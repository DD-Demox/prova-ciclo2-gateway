import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NovaFila{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fila_nome:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fila_tipo_pessoa:string;

}