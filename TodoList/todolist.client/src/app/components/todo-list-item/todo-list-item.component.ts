import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent implements OnInit{

  @Input() id: number | undefined = 0;

  editMode: boolean = false;
  todo: TodoItem | null = null;
  editingTodo: TodoItem | null = null;

  constructor(
    private _todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this.loadTodoItem(this.id!);
  }

  /** Load TodoItem */
  loadTodoItem(id:number) {
    this.todo = this._todoListService.getTodoItem(this.id!);
  }

  /** Complete todoItem */
  onComplete(id: number) {
    this._todoListService.completeTodoItem(id);
  }

  /** Complete todoItem */
  onUncomplete(id: number) {
    this._todoListService.unCompleteTodoItem(id);
  }

  /** Edit todoItem */
  onEdit(id: number) {
    this.editMode = !this.editMode;
    this.editingTodo = this._todoListService.getTodoItem(id);
  }

  /** Delete todoItem */
  onDelete(id: number) {
    this._todoListService.deleteTodoItem(id);
  }
}

