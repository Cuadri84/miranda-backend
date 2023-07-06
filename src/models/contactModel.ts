export interface IContact {
  id: number;
  date: Date;
  userName: string;
  userEmail: string;
  userPhone: number;
  messageSubject: string;
  messageBody: string;
  archived: boolean;
}
