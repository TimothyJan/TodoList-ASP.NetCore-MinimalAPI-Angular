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
  initialTodoItem: Partial<TodoItem> = {
    name: '',
    isComplete: false
  };

  todoItemForm: FormGroup = new FormGroup({
    // dateAndTime: new FormControl("", Validators.required),
    // isCompleted: new FormControl(false, Validators.required),
    name: new FormControl("", Validators.required),
  })

  constructor(
    private _todoListService: TodoListService,
  ) {}

  ngOnInit(): void {
    this.todoItemForm.reset(this.initialTodoItem);
  }

  /** Submit form and add todoItem to todoList */
  onSubmit(): void {
    if (this.todoItemForm.valid) {
      const newTodoItem: Partial<TodoItem> = {
        name: this.todoItemForm.value.name,
        // isComplete: this.todoItemForm.value.isComplete,
        // dateAndTime: new Date().toISOString()
      };

      this._todoListService.createTodoItem(newTodoItem).subscribe({
        next: (createdTodo) => {
          console.log('Todo created:', createdTodo);
        },
        error: (error) => {
          console.error('Error creating todo:', error);
        }
      });
    }

    this.todoItemForm.reset(this.initialTodoItem);
  }
}
