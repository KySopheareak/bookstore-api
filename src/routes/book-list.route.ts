import { Request, Response } from "express";
import BookListController from "../controllers/admin/book-list.controller";
import ResponseUtil from "../utils/ResponseUtil";
import { IBook } from "../models/book.model";

export default [
  {
    path: "/book-list",
    method: "post",
    handler: async (req: Request, res: Response) => {
      try {
        const { title, author, price, stock, category } = req.body;

        const filter: Partial<{ title: string; author: string; price: Number; stock: number; category: string;}> = {};

        if (title) filter.title = title;
        if (author) filter.author = author;
        if (price) filter.price = price;
        if (stock) filter.stock = stock;
        if (category) filter.category = category;

        const books = await BookListController.getBookList(filter);

        if (!books || books.length === 0) {
          return res.status(404).json({ message: "No books found.........!", data: {data: books} });
        }

        return res.status(200).json({ data: {data: books} });
      } catch (error) {
        console.error("===> Fetching Error: ", error);
        ResponseUtil.failwithLog(
          req,
          res,
          500,
          "Internal Server Error",
          "BOOK_LIST",
          error
        );
      }
    },
  },

  {
    path: "/book/create",
    method: "post",
    handler: async (req: Request, res: Response) => {
      try {
        let { title, author, price, stock, category, description } = req.body;
        if (!title || !author || !price || !stock || !category || !description) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        const bookData: IBook = { title, author, price, stock, category, description };
        const newBook = await BookListController.createBook(bookData);

        return res.status(201).json({ message: "Book created successfully", data: newBook });
      } catch (error) {
        console.error("===> Creating Book Error: ", error);
        ResponseUtil.failwithLog(
          req,
          res,
          500,
          "Internal Server Error",
          "CREATE_BOOK",
          error
        );
      }
    },
  },
];
