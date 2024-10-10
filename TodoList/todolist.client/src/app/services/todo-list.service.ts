import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const APIAddress = "https://localhost:7160"

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: TodoItem[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /** Gets all Todo items */
  getTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${APIAddress}/todoitems`);
  }

  /** Get Todo item by id */
  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${APIAddress}/todoitems/${id}`);
  }

  /** Create a new Todo item */
  createTodoItem(newTodoItem: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.post<TodoItem>(APIAddress + `/todoitems`, newTodoItem);
  }

  /** Update a Todo item's completion status */
  updateTodoItem(id: number, updatedTodo: Partial<TodoItem>): Observable<void> {
    return this.http.put<void>(`${APIAddress}/todoitems/${id}`, updatedTodo);
  }

  /** Delete a Todo item */
  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(`${APIAddress}/todoitems/${id}`);
  }
}
