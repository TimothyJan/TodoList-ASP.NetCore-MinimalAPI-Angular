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

  constructor(
    private _todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this.loadTodoList();
  }

  /** Get todoList */
  loadTodoList(): void {
    this.todoList = this._todoListService.todoList;
  }

}
