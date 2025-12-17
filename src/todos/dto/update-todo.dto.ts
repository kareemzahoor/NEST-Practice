import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
