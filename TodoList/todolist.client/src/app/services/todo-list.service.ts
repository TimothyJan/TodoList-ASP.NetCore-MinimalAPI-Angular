import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: TodoItem[] = [];

  constructor() { }

  /** Gets todoList */
  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  /** Get todoItem based off id */
  getTodoItem(id:number) {
    for(let i=0; i<this.todoList.length; i++) {
      if(this.todoList[i].id == id) {
        return this.todoList[i];
      }
    }
    return null;
  }

  /** Create TodoItem */
  createTodoItem(data:any): void {
    // Generate id based on date.now()
    let todoItemId = Date.now();
    let todoItem = new TodoItem(todoItemId, data.isCompleted, data.name);
    this.todoList.push(todoItem);
  }

  /** Complete TodoItem */
  completeTodoItem(id: number): void {
    for (let i=0; i<this.todoList.length; i++) {
      if(this.todoList[i].id == id) {
        this.todoList[i].isCompleted = true;
      }
    }
  }

  /** Uncomplete TodoItem */
  unCompleteTodoItem(id: number): void {
    for (let i=0; i<this.todoList.length; i++) {
      if(this.todoList[i].id == id) {
        this.todoList[i].isCompleted = false;
      }
    }
  }

  /** Update Todoitem */
  editTodoItem(id:number, editingTodo: TodoItem): void {
    for(let i=0; i<this.todoList.length; i++) {
      if(this.todoList[i].id == id) {
        this.todoList[i] = editingTodo;
      }
    }
  }

  /** Delete Review */
  deleteTodoItem(id:number): void {
    for (let i=0; i<this.todoList.length; i++) {
      if(this.todoList[i].id == id) {
        this.todoList.splice(i, 1);
      }
    }
  }
}
