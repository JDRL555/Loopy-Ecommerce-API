import { BadRequestException } from '@nestjs/common'
import { Transform } from 'class-transformer'
import {
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator'

export class ParamsDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  lastPage?: number = 1

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    try {
      return parseInt(value)
    } catch (error) {
      throw new BadRequestException({
        message: [{
          field: value,
          error: `The ${value} must be a valid integer number`
        }]
      })
    }
  })
  total?: number = 1

  @IsOptional()
  @IsObject()
  filter?: object
}