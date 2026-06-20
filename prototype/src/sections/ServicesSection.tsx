import FadeIn from '../components/FadeIn';

const services = [
  {
    number: '01',
    name: 'Websites & Landing Pages',
    description: 'Modern, responsive websites built with the latest technologies. Perfect for your business or next project.',
  },
  {
    number: '02',
    name: 'E-Commerce',
    description: 'Full-featured online stores with payment solutions, inventory management, and a seamless shopping experience.',
  },
  {
    number: '03',
    name: 'Web Applications',
    description: 'Advanced web applications with real-time functionality, databases, and user management.',
  },
  {
    number: '04',
    name: 'SEO & Performance',
    description: 'Search engine optimization and lightning-fast load times — so your customers find you and stay.',
  },
  {
    number: '05',
    name: 'Maintenance & Support',
    description: 'Ongoing maintenance, updates, and technical support to keep your website secure and up to date.',
  },
];

export default function ServicesSection() {
  return (
    <section
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn y={30}>
          <h2
            className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
            style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {services.map((svc, i) => (
          <FadeIn key={svc.number} delay={i * 0.1} y={20}>
            <div
              className="flex items-start gap-4 sm:gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(12,12,12,0.15)' : 'none' }}
            >
              <span
                className="font-black shrink-0 leading-none"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {svc.number}
              </span>
              <div className="pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {svc.name}
                </h3>
                <p
                  className="font-light leading-relaxed mt-2 max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                    color: '#0C0C0C',
                  }}
                >
                  {svc.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
