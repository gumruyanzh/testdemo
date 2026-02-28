import { Link } from 'react-router-dom'
import Container from '../components/Container'

export default function NotFoundPage() {
  return (
    <Container>
      <div className="py-12 md:py-20 lg:py-32 text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-gray-300 mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Go Back Home
        </Link>
      </div>
    </Container>
  )
}
