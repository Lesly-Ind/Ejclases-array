import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateUsuarioDto {
  @ValidateIf((_objeto, valor) => valor !== undefined)
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @ValidateIf((_objeto, valor) => valor !== undefined)
  @IsInt()
  @Min(0)
  edad?: number;
}
