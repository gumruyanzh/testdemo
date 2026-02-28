import { useState } from 'react'
import Container from '../components/Container'
import Card from '../components/Card'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'web', label: 'Web' },
    { id: 'desktop', label: 'Desktop' },
  ]

  const products = [
    {
      id: 1,
      name: 'Mobile App Pro',
      category: 'mobile',
      price: '$29/mo',
      description: 'Professional mobile application with advanced features',
      features: ['iOS & Android', 'Push Notifications', 'Offline Mode'],
    },
    {
      id: 2,
      name: 'Web Platform',
      category: 'web',
      price: '$49/mo',
      description: 'Comprehensive web platform for businesses',
      features: ['Custom Domain', 'Analytics', 'API Access'],
    },
    {
      id: 3,
      name: 'Desktop Suite',
      category: 'desktop',
      price: '$79/mo',
      description: 'Full-featured desktop application suite',
      features: ['Windows & Mac', 'Cloud Sync', 'Advanced Tools'],
    },
    {
      id: 4,
      name: 'Starter Kit',
      category: 'mobile',
      price: '$9/mo',
      description: 'Perfect for getting started',
      features: ['Basic Features', 'Email Support', 'Mobile Ready'],
    },
    {
      id: 5,
      name: 'Enterprise Web',
      category: 'web',
      price: '$199/mo',
      description: 'Enterprise-grade web solution',
      features: ['Unlimited Users', 'Priority Support', 'Custom Integration'],
    },
    {
      id: 6,
      name: 'Pro Desktop',
      category: 'desktop',
      price: '$39/mo',
      description: 'Professional desktop tools',
      features: ['Multi-Platform', 'Team Collaboration', 'Cloud Storage'],
    },
  ]

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <Container>
      {/* Page Header */}
      <section className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Choose the perfect solution for your needs. All products are fully
            mobile-responsive and optimized for any device.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 md:pb-12">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-12 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                  {product.category.toUpperCase()}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {product.name}
                </h3>
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">
                  {product.price}
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm md:text-base text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Choose Plan
              </button>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  )
}
