import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Injectable()
export class TodoService {
  private todos: TodoEntity[] = [
    { id: 1, description: 'todo1 description', done: true },
    { id: 2, description: 'todo2 description', done: true },
    { id: 3, description: 'todo3 description', done: false },
  ];

  findAll(): TodoEntity[] {
    return this.todos;
  }

  findOne(id: number): TodoEntity {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`todo ${id} not found`);

    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput): TodoEntity {
    const newTodo = new TodoEntity();
    newTodo.id = this.todos.length + 1;
    newTodo.description = createTodoInput.description;
    newTodo.done = createTodoInput.done;

    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, updateTodoInput: UpdateTodoInput): TodoEntity {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) throw new NotFoundException(`todo ${id} not found`);

    const updatedTodo = {
      ...this.todos[index],
      ...updateTodoInput,
    };

    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  removeTodo() {
    return {};
  }
}
