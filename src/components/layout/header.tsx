// src/components/layout/header.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Lightbulb, Bookmark, Github, Database, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { getSubscriptionProduct } = useSubscription();
  const navigate = useNavigate();

  const subscriptionProduct = getSubscriptionProduct();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SkillsHub</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Subscription Badge - Shows current plan */}
          {user && subscriptionProduct && (
            <Badge variant="secondary" className="hidden md:flex">
              {subscriptionProduct.name}
            </Badge>
          )}

          {/* Data Sourcing - Premium Feature */}
          {user && subscriptionProduct && (
            <Button asChild variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <Link to="/data-sourcing">
                <Database className="h-4 w-4" />
                <span>Data Sourcing</span>
              </Link>
            </Button>
          )}

          {/* Bookmarks - Premium Feature */}
          {user && subscriptionProduct && (
            <Link to="/bookmarks">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Bookmarks</span>
              </Button>
            </Link>
          )}
          
          <ThemeToggle />
          
          {/* GitHub Link */}
          <a 
            href="https://github.com/wgrea/SkillsHub" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </a>

          {/* Authentication & Subscription Access */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {/* Upgrade/Pricing Link for non-subscribers */}
              {!subscriptionProduct && (
                <Button size="sm" asChild>
                  <Link to="/pricing">Upgrade</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to="/account">Account</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-red-50 hover:text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold">SkillsHub</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                
                {/* Subscription Badge - Mobile */}
                {user && subscriptionProduct && (
                  <Badge variant="secondary" className="w-fit">
                    {subscriptionProduct.name}
                  </Badge>
                )}
                
                <div className="flex flex-col gap-3 pt-4">
                  {/* Premium Features - Only show if subscribed */}
                  {user && subscriptionProduct && (
                    <>
                      {/* Data Sourcing - Mobile */}
                      <Button 
                        asChild
                        variant="outline" 
                        className="flex items-center justify-center gap-2 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/data-sourcing">
                          <Database className="h-4 w-4" />
                          <span>Data Sourcing</span>
                        </Link>
                      </Button>

                      {/* Bookmarks - Mobile */}
                      <Button 
                        asChild 
                        variant="outline" 
                        className="flex items-center justify-center gap-2 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/bookmarks">
                          <Bookmark className="h-4 w-4" />
                          <span>Bookmarks</span>
                        </Link>
                      </Button>
                    </>
                  )}
                  
                  {/* GitHub - Mobile */}
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center gap-2 w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Button>

                  {/* Upgrade prompt for non-subscribers */}
                  {user && !subscriptionProduct && (
                    <Button 
                      size="sm" 
                      className="w-full"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/pricing">Upgrade to Premium</Link>
                    </Button>
                  )}

                  {/* Authentication Buttons - Mobile */}
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/account">Account</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full hover:bg-red-50 hover:text-red-600"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button 
                        className="w-full" 
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}