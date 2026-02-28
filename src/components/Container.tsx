interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container-responsive py-4 md:py-6 ${className}`}>
      {children}
    </div>
  )
}
