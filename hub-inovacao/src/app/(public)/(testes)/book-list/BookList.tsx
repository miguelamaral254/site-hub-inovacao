import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { Book } from '../teste-books/Book';
import { searchBooks } from '../teste-books/BookService';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); 
      setError('');  

      try {
        const response = await searchBooks({}, 0, 10); 
        if (response.data && Array.isArray(response.data.content)) {
          setBooks(response.data.content);  
        } else {
          setError('Resposta da API não contém um array válido de livros');
        }
      } catch (err) {
        setError('Erro ao buscar livros');
        console.error(err);
      } finally {
        setLoading(false);  
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Livros</h1>
      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="text-center">Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
