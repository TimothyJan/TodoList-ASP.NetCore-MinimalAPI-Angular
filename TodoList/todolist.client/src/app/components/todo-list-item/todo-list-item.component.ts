import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent implements OnInit{

  @Input() id: number = 0;

  editMode: boolean = false;
  todo: TodoItem | null = null;
  editingTodo: TodoItem | null = null;

  constructor(
    private _todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this.loadTodoItem(this.id);
  }

  /** Load TodoItem */
  loadTodoItem(id:number) {
    this._todoListService.getTodoItem(id).subscribe({
      next: (response) => {
        this.todo = response;
      },
      error: (error) => {
        console.error('Error fetching Todo:', error);
      }
    });
  }

  /** Complete todoItem */
  onComplete(id: number) {
    this.todo!.isComplete = true;
    this._todoListService.updateTodoItem(id, this.todo!).subscribe({
      next: () => {
        if (this.todo) {
          this.todo.isComplete = true;
          this._todoListService.getTodoList().subscribe();
        }
      },
      error: (error) => {
        console.error('Error completing Todo:', error);
      }
    });
  }

  /** Complete todoItem */
  onUncomplete(id: number) {
    this.todo!.isComplete = false;
    this._todoListService.updateTodoItem(id, this.todo!).subscribe({
      next: () => {
        if (this.todo) {
          this.todo.isComplete = false;
          this._todoListService.getTodoList().subscribe();
        }
      },
      error: (error) => {
        console.error('Error uncompleting Todo:', error);
      }
    });
  }

  /** Edit todoItem */
  onEdit(id: number) {
    this.editMode = !this.editMode;
    if (this.editMode && this.todo) {
      this.editingTodo = { ...this.todo };
    }
  }

  /** Submit Edit */
  onSubmitEdit(): void {
    if (this.editingTodo && this.todo) {
      this._todoListService.updateTodoItem(this.todo.id, this.editingTodo).subscribe({
        next: (updatedTodo) => {
          if (this.todo) {
            this.todo.name = this.editingTodo?.name ?? "";
          }
          this.editMode = false;
        },
        error: (error) => {
          console.error('Error updating Todo:', error);
        }
      });
    }
  }

  /** Delete todoItem */
  onDelete(id: number) {
    this._todoListService.deleteTodoItem(id).subscribe({
      next: () => {
        // console.log("Deleted: " + id);
        this._todoListService.getTodoList().subscribe();
      },
      error: (error) => {
        console.error('Error deleting Todo:', error);
      }
    });
  }
}

