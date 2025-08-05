import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Plan<span className="text-orange-400">zee</span>
            <span className="text-4xl md:text-6xl">🧳</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Your ultimate travel companion for planning, organizing, and discovering amazing destinations around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {session ? (
              <Link
                href="/trips"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Your Trips
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Planning Today
              </Link>
            )}
            <Link
              href="/trips/new"
              className="border-2 border-purple-300 text-purple-200 hover:bg-purple-300 hover:text-purple-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200"
            >
              Create New Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Everything You Need to Plan the Perfect Trip
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trip Management */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🗂️</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Trip Management</h3>
              <p className="text-purple-200 text-sm">
                Create, organize, and manage all your trips in one place. Set dates, add descriptions, and upload beautiful trip images.
              </p>
            </div>

            {/* Location Planning */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Smart Locations</h3>
              <p className="text-purple-200 text-sm">
                Add destinations with precise coordinates, organize your itinerary, and get direct links to Google Maps for navigation.
              </p>
            </div>

            {/* Trip Dashboard */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Trip Dashboard</h3>
              <p className="text-purple-200 text-sm">
                View all your upcoming and past trips in a beautiful dashboard with status tracking and quick access to details.
              </p>
            </div>

            {/* Image Upload */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Visual Memories</h3>
              <p className="text-purple-200 text-sm">
                Upload and store beautiful images for each trip to capture and preserve your travel memories.
              </p>
            </div>

            {/* Authentication */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Secure Access</h3>
              <p className="text-purple-200 text-sm">
                Sign in securely with GitHub authentication. Your trips and data are private and protected.
              </p>
            </div>

            {/* Maps Integration */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-orange-300 mb-3">Maps Integration</h3>
              <p className="text-purple-200 text-sm">
                Seamless integration with Google Maps for viewing locations and getting directions to your destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Join Thousands of Travelers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
              <p className="text-purple-200">Trips Planned</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
              <p className="text-purple-200">Destinations Added</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
              <p className="text-purple-200">Happy Travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Next Adventure?
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Create your account and start planning your dream trips today.
          </p>
          
          {session ? (
            <div className="space-y-4">
              <p className="text-orange-300 text-lg">
                Welcome back, {session.user?.name}! 👋
              </p>
              <Link
                href="/trips"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Go to Your Trips
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">
                Plan<span className="text-orange-400">zee</span>🧳
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Your ultimate travel companion for planning amazing adventures around the world.
              </p>
              <p className="text-gray-400 text-xs">
                Built with ❤️ for travelers everywhere
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/trips" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Your Trips
                </Link>
                <Link href="/trips/new" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Create Trip
                </Link>
                <Link href="/api/auth/signin" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Developer Info */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-white mb-4">Connect with the Developer</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:ashishkumar850601@gmail.com"
                  className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  <EmailIcon />
                  ashishkumar850601@gmail.com
                </a>
                <a 
                  href="https://github.com/blazebomb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/ashish-kumar-11a03125a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a 
                  href="https://personal-portfolio-woad-chi.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  <PortfolioIcon />
                  Portfolio
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs mb-4 md:mb-0">
                © 2025 Planzee. Built by Ashish Kumar. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Made with Next.js & Tailwind CSS</span>
                <span>•</span>
                <span>Powered by Prisma & PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Footer Icons
function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}
