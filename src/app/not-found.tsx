"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Phone, 
  Mail,
  Users,
  Image,
  Star
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main 404 Content */}
        <div className="mb-8">
          {/* Animated 404 Number */}
          <div className="relative mb-6">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-red-700/20 to-red-800/20 blur-3xl rounded-full"></div>
          </div>
          
          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have danced away. Don't worry, 
            let's get you back to the rhythm of our beautiful dance academy.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            className="border-2 border-border hover:bg-accent transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Our Classes
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore our classical dance programs and training sessions
              </p>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Image className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Gallery
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                View our stunning performances and student showcases
              </p>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/gallery">
                  View Gallery
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Contact Us
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get in touch for enrollment and inquiries
              </p>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/contact">
                  Contact Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm max-w-md mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Looking for something specific?
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search our website..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need immediate assistance? Contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>info@nityanruthya.com</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Bangalore, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>
    </div>
  );
} 