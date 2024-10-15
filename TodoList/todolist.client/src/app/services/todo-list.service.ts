import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// const APIAddress = "https://localhost:7160";
const APIAddress = "https://todolistserver20241015124630.azurewebsites.net/";
// const APIAddress = environment.apiAddress;

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListSubject = new BehaviorSubject<TodoItem[]>([]);
  todoList$ = this.todoListSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  /** Gets all Todo items */
  getTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${APIAddress}/todoitems`).pipe(
      tap(todoList => this.todoListSubject.next(todoList)) // Notify components
    );
  }

  /** Get Todo item by id */
  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${APIAddress}/todoitems/${id}`);
  }

  /** Create a new Todo item */
  createTodoItem(newTodoItem: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.post<TodoItem>(APIAddress + `/todoitems`, newTodoItem).pipe(
      tap(() => {
        this.getTodoList().subscribe(); // Fetch the updated todoList after creation
      })
    );
  }

  /** Update a Todo item's completion status */
  updateTodoItem(id: number, updatedTodo: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${APIAddress}/todoitems/${id}`, updatedTodo);
  }

  /** Delete a Todo item */
  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(`${APIAddress}/todoitems/${id}`);
  }
}
