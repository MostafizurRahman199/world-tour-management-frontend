interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className = "" }: HeadingProps) => {
  return (
    <h2
      className={`
        text-2xl sm:text-3xl lg:text-4xl
        font-extrabold text-center
        text-[#8F87F1]
        ${className}
      `}
    >
      {children}
    </h2>
  );
};

export default Heading;
