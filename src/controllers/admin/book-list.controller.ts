import BookModel, { IBook } from '../../models/book.model';
export default class BookListController {

    public static async getBookList(req: any): Promise<any[] | null> {
        try {
            const filters = req || {};
            const books = await BookModel.find(filters).sort({_id: 1});
            if (books.length === 0) return null;
            return books;
        } catch (error) {
            console.error('Error in getBookList:', error);
            throw error;
        }
    }
    

    public static async createBook(bookData: IBook): Promise<IBook | null> {
        try {
          const newBook = new BookModel(bookData); 
          await newBook.save(); 
          return newBook;
        } catch (error) {
          console.error('Error creating book:', error);
          throw error;
        }
    }

    public static async getBooksByIds(bookIds: any[]) {
        return await BookModel.find({ _id: { $in: bookIds } }).select("price -_id");
    }
      
}
