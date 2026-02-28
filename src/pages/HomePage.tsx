import Card from '../components/Card'
import Container from '../components/Container'

export default function HomePage() {
  const features = [
    {
      title: 'Mobile First',
      description: 'Designed with mobile devices as the primary focus, ensuring optimal experience on all screen sizes.',
    },
    {
      title: 'Responsive Grid',
      description: 'Flexible grid layouts that adapt seamlessly from mobile to tablet to desktop.',
    },
    {
      title: 'Touch Optimized',
      description: 'Large touch targets and intuitive gestures for better mobile interaction.',
    },
    {
      title: 'Performance',
      description: 'Optimized assets and lazy loading for fast performance on mobile networks.',
    },
    {
      title: 'Accessibility',
      description: 'WCAG compliant with proper ARIA labels and semantic HTML.',
    },
    {
      title: 'Modern Stack',
      description: 'Built with React 19, TypeScript, and Tailwind CSS for maintainability.',
    },
  ]

  return (
    <Container>
      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Welcome to TestDemo
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 px-4">
            Experience a fully mobile-responsive application built with modern web technologies.
            Seamless on every device, from phone to desktop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white -mx-4 sm:mx-0 px-4 sm:px-8 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Join thousands of users who trust our mobile-responsive platform.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Sign Up Now
          </button>
        </div>
      </section>
    </Container>
  )
}
