'use client';
import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  // create array of page numbers to show
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    pageNumbers.push(1);
    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i < Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      if (i === 1 || i === totalPages - 1) {
        continue;
      }

      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
    return pageNumbers;
  };
  return (
    <div
      className={`flex flex-wrap justify-between items-center mt-4 ${className}`}
    >
      {/*Mobile view */}
      <div className='w-full flex justify-between sm:hidden'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Previous
        </button>
        <span className='text-sm text-gray-700'>
          page{currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }  `}
        >
          Next
        </button>
      </div>
      {/*Desktop view*/}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {' '}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {' '}
              {Math.min(currentPage * itemsPerPage, totalItems)}{' '}
            </span>{' '}
            of <span className='font-medium'>{totalItems}</span> results
          </p>
        </div>

        <div className='flex gap-2 space-x-1'>
          {/*previous button*/}

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            Previous
          </button>
          {/*showing page numbers*/}
          {getPageNumbers().map((page: number | string, index) => {
            if (page === '...') {
              return <span key={`ellipsis-${index}`}>...</span>;
            }

            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white'
                }`}
              >
                {page}
              </button>
            );
          })}
          {/*next button*/}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
