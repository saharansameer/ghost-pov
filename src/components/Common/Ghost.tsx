interface GhostProps {
  className?: string;
}

export function Ghost({ className = "w-9 h-9" }: GhostProps) {
  return (
    <div
      className={`${className} bg-primary rounded-xl flex items-center justify-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-foreground scale-110"
      >
        <path d="M9 10h.01" />
        <path d="M15 10h.01" />
        <path d="M12 2a8 8 0 0 0-8 8v12l4-4 2 2 2-2 2 2 4-4V10a8 8 0 0 0-8-8z" />
      </svg>
    </div>
  );
}
