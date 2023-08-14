import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger'; // Los DTOs son objetos que se utilizan para transferir datos entre diferentes partes de una aplicación, como entre el frontend y el backend, o entre diferentes capas de una arquitectura de software.
export class createRecipeDto {
  //Al utilizar la palabra clave readonly, se indica que una vez que se haya creado una instancia de la clase CreateProductDto, sus propiedades no podrán ser modificadas. Esto se hace para asegurar que los datos de entrada no sean modificados inadvertidamente mientras se transfieren entre diferentes partes del sistema.
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly summary: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly healthScore: number;

  @IsString()
  @IsNotEmpty()
  readonly steps: string;

  @IsArray()
  @IsNotEmpty()
  readonly diets: string[];
}
// Funciones de los DTOs:
// Proteger los datos
// Validar y tipar datos
// Evita hacer referencia a datos que no existan

// podemos instalar la dependencia @nestjs/mapped-types que nos ayuda a reutilizar codigo para no volver a copiar las mismas validaciones extendiento clases que ya tenemos
export class UpdateProductDto extends PartialType(createRecipeDto) {}
