import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(item) => onPageChange(item.selected + 1)}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousLabel="‹"
      nextLabel="›"
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
