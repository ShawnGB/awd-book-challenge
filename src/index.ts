//types

interface Book {
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  numPages: number;
  author: string;
  publisher: string;
  price: string;
  cover: string;
}

type Books = Book[];

type UpdateBook = Partial<Book>;

interface ValidationErrorDetail {
  msg: string;
  param: string;
  location: string;
}

interface ResponseError {
  errors: Record<string, ValidationErrorDetail>;
}
