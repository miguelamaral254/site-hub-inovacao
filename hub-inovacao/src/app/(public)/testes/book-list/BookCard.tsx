/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Book, Gender } from '../teste-books/Book';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-80">
      {book.urlImage && (
        <img
          src={book.urlImage}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
      <p><span className="font-bold">Gênero:</span> {book.gender ? Gender[book.gender] : 'Não especificado'}</p>
      <p><span className="font-bold">Descrição:</span> {book.description}</p>
      <p><span className="font-bold">Disponível:</span> {book.available ? 'Sim' : 'Não'}</p>
      <p><span className="font-bold">Status:</span> {book.enabled ? 'Ativo' : 'Inativo'}</p>
    </div>
  );
};

export default BookCard;
