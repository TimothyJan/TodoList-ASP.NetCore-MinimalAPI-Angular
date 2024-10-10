export class TodoItem {
  id: number;
  isComplete: boolean;
  name: string;
  dateAndTime?: string | null;
  constructor(id: number, isComplete: boolean, name: string, dateAndTime?: string) {
    this.id = id;
    this.isComplete = isComplete;
    this.name = name;
    this.dateAndTime = dateAndTime;
  }
}
