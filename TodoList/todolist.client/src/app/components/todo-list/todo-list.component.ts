import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  @Input() completedList: boolean = false;
  todoList: TodoItem[] = [];
  dataFetched: boolean = false;

  constructor(
    private _todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this._todoListService.todoList$.subscribe({
      next: (todoList) => {
        this.todoList = todoList;
        this.dataFetched = true;
      },
      error: (error) => {
        console.error('Error fetching Todo list:', error);
      }
    });
    this.loadTodoList();
  }

  /** Get todoList */
  loadTodoList(): void {
    // this._todoListService.getTodoList().subscribe({
    //   next: (response) => {
    //     this.todoList = response;
    //     this.dataFetched = true;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching Todo:', error);
    //   }
    // });
    this._todoListService.getTodoList().subscribe();
  }

}
