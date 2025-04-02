
import { Link } from "react-router-dom";
import { HeartIcon, GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">AnimeMind Match</h3>
            <p className="text-sm text-muted-foreground">
              Discover anime based on your personality type and mood.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-anime-purple transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-anime-purple transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-anime-purple transition-colors" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/anime" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Anime List
                </Link>
              </li>
              <li>
                <Link to="/tests" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Personality Tests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Your Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-anime-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AnimeMind Match. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1 mt-2 md:mt-0">
            Made with <HeartIcon className="h-3 w-3 text-anime-pink" /> for anime lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
