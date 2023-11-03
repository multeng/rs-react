import getPaginationItems from '../../utils';
import PageLink from '../PageLink';
import styles from './pagination.module.css';
import { PaginationProps } from '../../types';

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: PaginationProps) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PageLink disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={`${pageNum + idx}`}
          active={currentPage === pageNum}
          disabled={Number.isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {!Number.isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </PageLink>
    </nav>
  );
}
