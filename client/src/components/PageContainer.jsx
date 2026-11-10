// Centred 1200px column with side padding (32px, 16px on phones).
export const PageContainer = ({ children, className = '' }) => (
  <div className={`mx-auto max-w-[1200px] px-4 md:px-8 ${className}`}>{children}</div>
);
