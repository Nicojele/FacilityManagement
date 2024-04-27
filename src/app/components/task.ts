export class Task {
  description: string
  category: string
  processInstanzeId: string
  date: Date
  isFinished: boolean

  constructor(description: string, category: string, processInstanzeId: string, date: Date, isFinished: boolean) {
    this.description = description;
    this.category = category;
    this.date = date;
    this.processInstanzeId = processInstanzeId;
    this.isFinished = isFinished;
  }
}
