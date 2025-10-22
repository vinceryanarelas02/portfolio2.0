import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import profileImage from './assets/564912673_825597843285873_6906556200763701776_n.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
              VRA
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'work', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === section ? 'text-cyan-400 scale-110' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
              {['home', 'about', 'work', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 px-4 rounded-lg transition-all ${
                    activeSection === section
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6 animate-slideInLeft">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Vince Ryan Arelas
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Back End Developer
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Building robust and scalable server-side solutions with a passion for clean code and efficient architectures.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105">
                  View My Work
                </button>
                <button className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg font-medium hover:bg-cyan-400/10 transition-all hover:scale-105">
                  Contact Me
                </button>
              </div>
            </div>

            <div className="order-1 md:order-2 animate-slideInRight">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Vince Ryan Arelas"
                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[3/4] border-2 border-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="space-y-8 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a passionate back end developer specializing in building scalable, secure, and efficient server-side applications. With expertise in modern frameworks and databases, I transform complex requirements into elegant solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                My approach combines technical excellence with a deep understanding of business needs, ensuring that every project delivers real value. I thrive on solving challenging problems and continuously learning new technologies.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Technical Skills</h3>
                  <div className="space-y-2">
                    {['Node.js & Express', 'Python & Django', 'Database Design', 'API Development', 'Cloud Services', 'System Architecture'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Core Competencies</h3>
                  <div className="space-y-2">
                    {['RESTful APIs', 'Microservices', 'Performance Optimization', 'Security Best Practices', 'DevOps & CI/CD', 'Agile Development'].map((competency) => (
                      <div key={competency} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{competency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                My Work
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-Commerce API',
                  description: 'Scalable RESTful API handling 10K+ daily transactions with advanced caching and optimization.',
                  tech: ['Node.js', 'PostgreSQL', 'Redis']
                },
                {
                  title: 'Real-time Analytics Platform',
                  description: 'High-performance data processing system with WebSocket integration for live dashboards.',
                  tech: ['Python', 'MongoDB', 'WebSockets']
                },
                {
                  title: 'Authentication Service',
                  description: 'Secure microservice architecture with JWT, OAuth, and multi-factor authentication.',
                  tech: ['Express', 'JWT', 'OAuth2']
                },
                {
                  title: 'Payment Gateway Integration',
                  description: 'Robust payment processing system with multiple provider integrations and fraud detection.',
                  tech: ['Stripe', 'Node.js', 'MySQL']
                },
                {
                  title: 'Content Management System',
                  description: 'Headless CMS with GraphQL API supporting multi-tenant architecture and role-based access.',
                  tech: ['GraphQL', 'PostgreSQL', 'Docker']
                },
                {
                  title: 'Notification Service',
                  description: 'Distributed message queue system handling millions of notifications across multiple channels.',
                  tech: ['RabbitMQ', 'Redis', 'AWS']
                }
              ].map((project, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="space-y-8 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
              <p className="text-gray-300 text-lg text-center mb-12">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a
                  href="mailto:vinceryan@example.com"
                  className="flex flex-col items-center p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all hover:scale-105 group"
                >
                  <Mail className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 text-sm">Email Me</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all hover:scale-105 group"
                >
                  <Github className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all hover:scale-105 group"
                >
                  <Linkedin className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 text-sm">LinkedIn</span>
                </a>
              </div>

              <div className="text-center">
                <a
                  href="mailto:vinceryan@example.com"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Send Me a Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vince Ryan Arelas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
