import React from "react";
import ReactPaginateLib from "react-paginate";

interface ReactPaginateProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel: string;
  previousLabel: string;
}

const ReactPaginate: React.FC<ReactPaginateProps> = (props) => {
  return <ReactPaginateLib {...props} />;
};

export default ReactPaginate;
