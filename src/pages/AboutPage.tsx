import Container from '../components/Container'
import Card from '../components/Card'

export default function AboutPage() {
  const team = [
    { name: 'Jane Doe', role: 'CEO & Founder', initials: 'JD' },
    { name: 'John Smith', role: 'CTO', initials: 'JS' },
    { name: 'Emily Chen', role: 'Lead Designer', initials: 'EC' },
    { name: 'Michael Brown', role: 'Senior Developer', initials: 'MB' },
  ]

  return (
    <Container>
      {/* About Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            About TestDemo
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            We're dedicated to creating mobile-responsive experiences that work beautifully
            across all devices. Our mission is to make the web accessible and enjoyable for
            everyone, regardless of their device or screen size.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Card>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To build web applications that provide seamless experiences across all devices,
              ensuring that users can access content anytime, anywhere, on any screen size.
            </p>
          </Card>
          <Card>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where responsive design is the standard, not the exception. Where every
              user enjoys a consistent, high-quality experience regardless of their device.
            </p>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                {member.initials}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16">
        <div className="bg-blue-600 rounded-2xl text-white -mx-4 sm:mx-0 px-4 sm:px-8 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-sm sm:text-base opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm sm:text-base opacity-90">Countries</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-sm sm:text-base opacity-90">Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm sm:text-base opacity-90">Support</div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
