export class TodoItem {
  id?: number;
  isCompleted: boolean;
  name: string;
  dateAndTime?: string | null;
  constructor(id: number, isCompleted: boolean, name: string, dateAndTime?: string) {
    this.id = id;
    this.isCompleted = isCompleted;
    this.name = name;
    this.dateAndTime = dateAndTime;
  }
}
