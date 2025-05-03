import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b13] to-[#13151f] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full text-center relative">
          <div className="absolute -top-40 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full backdrop-blur-sm border border-blue-500/20 mb-8">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-sm font-medium">Secure & Modern Authentication System</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Authentication
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500"> Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-300/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              A modern, secure authentication system built with Next.js, featuring user accounts, email verification, and seamless experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
              
              <Link
                href="/login"
                className="px-8 py-4 bg-[#1a1f2f]/60 backdrop-blur-sm hover:bg-[#252a3a] text-white border border-gray-700/50 rounded-xl font-medium transition-all duration-300 text-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={`w-10 h-10 rounded-full border-2 border-[#151824] flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 text-white text-xs font-bold overflow-hidden`}>
                      <span>U{item}</span>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">100+ Users</p>
                  <p className="text-gray-400 text-sm">Joined recently</p>
                </div>
              </div>
              
              <div className="h-12 w-px bg-gray-700/50"></div>
              
              <div className="flex items-center">
                <div className="mr-4 bg-green-500/10 p-2.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">99.9% Uptime</p>
                  <p className="text-gray-400 text-sm">Reliable service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature section */}
      <section className="py-24 bg-[#151824]/70 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIyMjgiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Key Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our authentication system provides everything you need to build secure and user-friendly applications.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1f2f]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 hover:border-gray-700/50 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">Secure Authentication</h3>
              <p className="text-gray-400 leading-relaxed">Industry-standard security practices to keep user accounts safe and protected from unauthorized access.</p>
            </div>
            
            <div className="bg-[#1a1f2f]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 hover:border-gray-700/50 group">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-indigo-500/30 group-hover:to-indigo-600/30 transition-all duration-300">
                <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">Email Verification</h3>
              <p className="text-gray-400 leading-relaxed">Verify user identities with our automated email verification process for enhanced security.</p>
            </div>
            
            <div className="bg-[#1a1f2f]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 hover:border-gray-700/50 group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">User Profiles</h3>
              <p className="text-gray-400 leading-relaxed">Manage user profiles with an intuitive dashboard and customizable account settings.</p>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-[#1a1f2f]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 group">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Privacy First
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">Our authentication system prioritizes user privacy and data protection with industry-leading security practices.</p>
              <ul className="space-y-2 text-gray-400">
                {["End-to-end encryption", "GDPR compliant", "No data sharing"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#1a1f2f]/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 group">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Fast Integration
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">Easily integrate our authentication system into your existing applications with minimal setup time.</p>
              <ul className="space-y-2 text-gray-400">
                {["Simple API endpoints", "Comprehensive documentation", "Developer support"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0b13] to-[#13151f]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-4">Trusted by developers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Join thousands of developers who trust our authentication system for their applications.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </Link>
            
            <Link
              href="#"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium transition-all duration-300 text-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0d15] py-12 border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Auth NextJS</h3>
              <p className="text-gray-400 mb-4">Secure authentication made simple for modern web applications.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Security", "Team", "Enterprise", "Pricing"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "Guides", "API Reference", "Support", "Open Source"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800/30 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Auth NextJS. All rights reserved.</p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
