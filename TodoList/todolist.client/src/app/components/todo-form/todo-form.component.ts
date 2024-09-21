import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoListService } from '../../services/todo-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit {
  initialTodoItem: TodoItem | undefined;

  todoItemForm: FormGroup = new FormGroup({
    // dateAndTime: new FormControl("", Validators.required),
    isCompleted: new FormControl(false, Validators.required),
    name: new FormControl("", Validators.required),
  })

  constructor(
    private _todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this.initialTodoItem = this.todoItemForm.value;
  }

  /** Submit form and add todoItem to todoList */
  onSubmit(): void {
    if (this.todoItemForm.valid) {
      this._todoListService.createTodoItem(this.todoItemForm.value);
    }
    this.todoItemForm.reset(this.initialTodoItem);
  }
}
