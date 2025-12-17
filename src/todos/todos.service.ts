import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = this.todosRepository.create(createTodoDto);
      await this.todosRepository.save(todo);
      return todo;
    } catch (error) {
      console.log('🚀 ~ TodosService ~ create ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const todos = await this.todosRepository.find();
      return todos;
    } catch (error) {
      console.log('🚀 ~ TodosService ~ findAll ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      // const todo = await this.todosRepository.findOneBy({ id: id.toString() });
      const todo = await this.todosRepository.findOne({
        where: { id },
      });
      if (!todo) {
        throw new BadRequestException('Todo not found');
      }
      return todo;
    } catch (error) {
      console.log('🚀 ~ TodosService ~ findOne ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.todosRepository.update(id, updateTodoDto);
      return todo;
    } catch (error) {
      console.log('🚀 ~ TodosService ~ update ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const todo = await this.todosRepository.delete(id);
      return {
        message: 'Todo deleted successfully',
      };
    } catch (error) {
      console.log('🚀 ~ TodosService ~ remove ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }
}
