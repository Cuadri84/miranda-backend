export interface IContact {
  id: number;
  date: number;
  user: {
    name: string;
    email: string;
    phone: number;
  };
  message: {
    subject: string;
    body: string;
  };
  archived: boolean;
}
