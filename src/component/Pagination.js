import { useMemo, useState } from "react";
import PropTypes from "prop-types";

Pagination.prototype = {
  data: PropTypes.func,
  totalCount: PropTypes.number,
  dataPerPage: PropTypes.number,
};

export default function Pagination({ data, totalCount, dataPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const siblingCount = 1;

  const DOTS = "...";
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / dataPerPage);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, dataPerPage, siblingCount, currentPage]);

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
    data(page);
  };

  const onNext = () => {
    if (currentPage < Math.ceil(totalCount / dataPerPage)) {
      setCurrentPage(currentPage + 1);
      data((page) => {
        return page + 1;
      });
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => {
        return page - 1;
      });
      data((page) => {
        return page - 1;
      });
    }
  };

  return (
    <>
      <div class="pagination">
        <ul>
          <li onClick={() => onPrevious()}>&lt;</li>
          {paginationRange?.map((range) => {
            if (range === DOTS) {
              return <li>&#8230;</li>;
            }

            return (
              <>
                <li
                  onClick={() => onPageChange(range)}
                  className={currentPage === range ? "is-active" : ""}
                >
                  {range}
                </li>
              </>
            );
          })}
          <li
            onClick={() => onNext()}
            disabled={
              currentPage === Math.ceil(totalCount / dataPerPage) ? true : false
            }
          >
            &gt;
          </li>
        </ul>
      </div>
    </>
  );
}
