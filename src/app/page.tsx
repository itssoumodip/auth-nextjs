import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-tr from-black/60 via-zinc-900/60 to-zinc-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Modern Authentication System
              </h1>
              
              <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                Secure user authentication with email verification and password recovery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/signup"
                  className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900"
                >
                  Create Account
                </Link>
                
                <Link
                  href="/login"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="p-2 bg-zinc-800/50 rounded-lg w-fit mb-4">
                    <svg className="h-5 w-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Secure Login</h3>
                  <p className="text-zinc-400 text-sm">Protected authentication with best security practices.</p>
                </div>
                
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="p-2 bg-zinc-800/50 rounded-lg w-fit mb-4">
                    <svg className="h-5 w-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Email Verification</h3>
                  <p className="text-zinc-400 text-sm">Verify accounts with automated email verification.</p>
                </div>
                
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="p-2 bg-zinc-800/50 rounded-lg w-fit mb-4">
                    <svg className="h-5 w-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Password Recovery</h3>
                  <p className="text-zinc-400 text-sm">Easy password reset with secure recovery links.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Authentication System. All rights reserved.</p>
      </footer>
    </div>
  );
}
