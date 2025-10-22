import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Terminal, Code, Database, Server } from 'lucide-react';
import profileImage from './assets/564912673_825597843285873_6906556200763701776_n.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff0000';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-green-400 overflow-x-hidden">
      {/* Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-20"
      />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-700 rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-4000"></div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.02)_50%)] bg-[length:100%_4px] animate-scanline"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold text-red-500 hover:text-red-400 transition-all hover:scale-105 flex items-center space-x-2 font-mono glitch-text">
              <Terminal className="w-6 h-6" />
              <span>&gt; VRA_</span>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'work', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm font-medium transition-all duration-300 font-mono ${
                    activeSection === section
                      ? 'text-red-500 scale-110 glow-text'
                      : 'text-green-400 hover:text-red-400'
                  }`}
                >
                  {`[${section}]`}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/30"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
              {['home', 'about', 'work', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 px-4 rounded-lg transition-all font-mono border ${
                    activeSection === section
                      ? 'bg-red-500/20 text-red-500 border-red-500/50'
                      : 'text-green-400 hover:bg-red-500/10 border-red-500/20'
                  }`}
                >
                  {`[${section}]`}
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
              <div className="text-xs font-mono text-red-500 mb-4 typing-effect">
                {'> SYSTEM BOOT SEQUENCE INITIATED...'}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight font-mono">
                <span className="text-red-500 glitch-text inline-block">
                  Vince Ryan Arelas
                </span>
              </h1>
              <div className="flex items-center space-x-2">
                <Terminal className="w-6 h-6 text-red-500 animate-pulse" />
                <p className="text-xl md:text-2xl text-green-400 font-mono">
                  {'> Back End Developer'}
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-500/5">
                <p className="text-green-300 text-lg leading-relaxed font-mono">
                  Building robust and scalable server-side solutions. Architecting the digital infrastructure of tomorrow.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('work')}
                  className="px-8 py-3 bg-red-500 text-black rounded-none font-bold font-mono hover:bg-red-600 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] relative overflow-hidden group"
                >
                  <span className="relative z-10">{'[VIEW_PROJECTS]'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-none font-bold font-mono hover:bg-red-500 hover:text-black transition-all hover:scale-105"
                >
                  {'[CONTACT]'}
                </button>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Code className="w-5 h-5 text-red-500 animate-pulse" />
                <Database className="w-5 h-5 text-red-500 animate-pulse animation-delay-1000" />
                <Server className="w-5 h-5 text-red-500 animate-pulse animation-delay-2000" />
              </div>
            </div>

            <div className="order-1 md:order-2 animate-slideInRight">
              <div className="relative group">
                <div className="absolute -inset-1 bg-red-500 blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
                <div className="absolute -inset-2 border-2 border-red-500 animate-border-spin"></div>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent z-10 pointer-events-none"></div>
                  <img
                    src={profileImage}
                    alt="Vince Ryan Arelas"
                    className="relative w-full h-auto object-cover aspect-[3/4] border-4 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,0,0.1)_25%,rgba(255,0,0,0.1)_26%,transparent_27%,transparent_74%,rgba(255,0,0,0.1)_75%,rgba(255,0,0,0.1)_76%,transparent_77%,transparent)] bg-[length:100%_8px] animate-scanline-slow pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-red-500 hover:text-red-400 transition-colors"
        >
          <ChevronDown size={32} className="animate-pulse" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="text-xs font-mono text-red-500 mb-2">{'> LOADING_PROFILE.exe'}</div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono inline-block">
                <span className="text-red-500 glitch-text">
                  {'[ABOUT_ME]'}
                </span>
              </h2>
            </div>

            <div className="bg-black/80 backdrop-blur-sm rounded-none p-8 md:p-12 border-2 border-red-500/50 hover:border-red-500 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,0,0.2)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-scan-horizontal"></div>

              <p className="text-green-300 text-lg leading-relaxed mb-6 font-mono">
                {'> '} I'm a passionate back end developer specializing in building scalable, secure, and efficient server-side applications. With expertise in modern frameworks and databases, I transform complex requirements into elegant solutions.
              </p>
              <p className="text-green-300 text-lg leading-relaxed mb-6 font-mono">
                {'> '} My approach combines technical excellence with a deep understanding of business needs, ensuring that every project delivers real value. I thrive on solving challenging problems and continuously learning new technologies.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4 border-2 border-red-500/30 p-6 bg-red-500/5">
                  <h3 className="text-xl font-semibold text-red-500 mb-4 font-mono flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    {'[TECHNICAL_STACK]'}
                  </h3>
                  <div className="space-y-2">
                    {['Node.js & Express', 'Python & Django', 'Database Design', 'API Development', 'Cloud Services', 'System Architecture'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2 group/item">
                        <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
                        <span className="text-green-400 font-mono text-sm group-hover/item:text-red-400 transition-colors">{'> '}{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-2 border-red-500/30 p-6 bg-red-500/5">
                  <h3 className="text-xl font-semibold text-red-500 mb-4 font-mono flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    {'[CORE_SYSTEMS]'}
                  </h3>
                  <div className="space-y-2">
                    {['RESTful APIs', 'Microservices', 'Performance Optimization', 'Security Protocols', 'DevOps & CI/CD', 'Agile Development'].map((competency) => (
                      <div key={competency} className="flex items-center space-x-2 group/item">
                        <div className="w-2 h-2 bg-red-500 animate-pulse animation-delay-500"></div>
                        <span className="text-green-400 font-mono text-sm group-hover/item:text-red-400 transition-colors">{'> '}{competency}</span>
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
            <div className="text-center mb-12">
              <div className="text-xs font-mono text-red-500 mb-2">{'> ACCESSING_DATABASE...'}</div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono">
                <span className="text-red-500 glitch-text">
                  {'[PROJECTS]'}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-Commerce API',
                  description: 'Scalable RESTful API handling 10K+ daily transactions with advanced caching and optimization.',
                  tech: ['Node.js', 'PostgreSQL', 'Redis'],
                  status: 'ACTIVE'
                },
                {
                  title: 'Real-time Analytics Platform',
                  description: 'High-performance data processing system with WebSocket integration for live dashboards.',
                  tech: ['Python', 'MongoDB', 'WebSockets'],
                  status: 'DEPLOYED'
                },
                {
                  title: 'Authentication Service',
                  description: 'Secure microservice architecture with JWT, OAuth, and multi-factor authentication.',
                  tech: ['Express', 'JWT', 'OAuth2'],
                  status: 'SECURE'
                },
                {
                  title: 'Payment Gateway Integration',
                  description: 'Robust payment processing system with multiple provider integrations and fraud detection.',
                  tech: ['Stripe', 'Node.js', 'MySQL'],
                  status: 'LIVE'
                },
                {
                  title: 'Content Management System',
                  description: 'Headless CMS with GraphQL API supporting multi-tenant architecture and role-based access.',
                  tech: ['GraphQL', 'PostgreSQL', 'Docker'],
                  status: 'RUNNING'
                },
                {
                  title: 'Notification Service',
                  description: 'Distributed message queue system handling millions of notifications across multiple channels.',
                  tech: ['RabbitMQ', 'Redis', 'AWS'],
                  status: 'ONLINE'
                }
              ].map((project, index) => (
                <div
                  key={index}
                  className="group bg-black/80 backdrop-blur-sm rounded-none p-6 border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:scale-105 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-black text-xs font-mono font-bold">
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <h3 className="text-xl font-semibold text-red-500 mb-3 group-hover:text-red-400 transition-colors font-mono mt-6">
                    {'> '}{project.title}
                  </h3>
                  <p className="text-green-400 text-sm leading-relaxed mb-4 font-mono">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-none border border-red-500/30 font-mono hover:bg-red-500/20 transition-colors"
                      >
                        {`[${tech}]`}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center space-x-2 text-green-500 text-xs font-mono">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>SYSTEM_OK</span>
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
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="text-xs font-mono text-red-500 mb-2">{'> ESTABLISHING_CONNECTION...'}</div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono">
                <span className="text-red-500 glitch-text">
                  {'[CONTACT]'}
                </span>
              </h2>
            </div>

            <div className="bg-black/80 backdrop-blur-sm rounded-none p-8 md:p-12 border-2 border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.2)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-transparent to-red-500 animate-scan-horizontal"></div>

              <p className="text-green-300 text-lg text-center mb-12 font-mono">
                {'> '} I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a
                  href="mailto:vinceryan@example.com"
                  className="flex flex-col items-center p-6 bg-red-500/5 rounded-none border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Mail className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="text-green-400 text-sm font-mono relative z-10">{'[EMAIL]'}</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-red-500/5 rounded-none border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Github className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="text-green-400 text-sm font-mono relative z-10">{'[GITHUB]'}</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-red-500/5 rounded-none border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Linkedin className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="text-green-400 text-sm font-mono relative z-10">{'[LINKEDIN]'}</span>
                </a>
              </div>

              <div className="text-center">
                <a
                  href="mailto:vinceryan@example.com"
                  className="inline-block px-10 py-4 bg-red-500 text-black rounded-none font-bold text-lg font-mono hover:bg-red-600 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] relative overflow-hidden group"
                >
                  <span className="relative z-10">{'[SEND_MESSAGE]'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
              </div>

              <div className="mt-8 text-center text-green-500 text-xs font-mono flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>CONNECTION_READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-red-500/30 py-8 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-green-400 font-mono text-sm">
            {'> '}&copy; {new Date().getFullYear()} Vince Ryan Arelas {'// ALL_SYSTEMS_GO'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
