import styles from './pagelink.module.css';
import { PageLinkProps } from '../../types';

export default function PageLink({ active, disabled, children, onClick }: PageLinkProps) {
  if (disabled) {
    return <span className={`${styles.pageLink} ${styles.disabled}`}>{children}</span>;
  }

  return (
    <button
      className={`${styles.pageLink}  ${active ? styles.active : ''} ${
        disabled ? styles.disabled : ''
      }`}
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
