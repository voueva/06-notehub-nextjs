
import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  setCurrentPage: (value: number) => void;
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ setCurrentPage, totalPages, currentPage}: PaginationProps) {

  return (
    <ReactPaginate 
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  )
}
