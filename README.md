<<<<<<< HEAD
# Nithyanruthyaaradana - Classical Dance Academy Website

A modern, responsive website for Nithyanruthyaaradana, a premier Bharatanatyam classical dance academy. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a comprehensive image gallery, student registration system, and professional admin panel.

![Nithyanruthyaaradana](https://placehold.co/1200x600/8B1A1A/FFFFFF?text=Nithyanruthyaaradana)

## 🎭 About

Nithyanruthyaaradana is a classical Indian dance academy dedicated to preserving and promoting the art of Bharatanatyam. This website serves as a digital showcase for the academy, featuring course information, gallery, student registration, and an admin panel for content management.

## ✨ Features

### 🌟 Public Website
- **Homepage**: Hero section with dynamic content, features showcase, testimonials, and comprehensive FAQ
- **About Us**: Academy history, founder information, and guiding principles with responsive image galleries
- **Gallery**: Interactive image gallery with full-screen viewer, zoom, pan, and navigation features
- **Registration**: Student enrollment form with comprehensive validation and responsive design
- **Contact**: Contact form with real-time validation and academy information

### 🖼️ Enhanced Image Gallery
- **Full-Screen Viewer**: Click any image to open in a professional modal viewer
- **Interactive Controls**: Zoom in/out, pan, rotate, and navigate between images
- **Keyboard Shortcuts**: Full keyboard support for navigation and controls
- **Touch Support**: Mobile-friendly gestures including pinch-to-zoom and swipe navigation
- **Local Image Integration**: All images served from local `/public/images/` folder for optimal performance
- **Fallback System**: Robust error handling with multiple fallback images

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Framer Motion powered page transitions and micro-interactions
- **Professional UI**: Shadcn/ui components with custom design system
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Next.js Image optimization and lazy loading

### 🛠️ Technical Excellence
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Next.js 15 with App Router and React 18
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks for local state management
- **Error Boundaries**: Comprehensive error handling and fallbacks

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI + Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in bundler

## 🎨 Design System

### Color Palette
- **Primary**: Maroon (`#8B1A1A`) - Classical Indian aesthetics
- **Background**: Very dark maroon for sophisticated look
- **Accent**: Vibrant red for highlights
- **Typography**: Literata serif font for elegance

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Large screens */
2xl: 1536px /* Extra large screens */
```

### Key Features
- **Mobile-First Design**: All components start with mobile layout
- **Flexible Grid Systems**: Adaptive column layouts
- **Responsive Typography**: Text scales appropriately
- **Adaptive Spacing**: Margins and padding adjust to screen size
- **Touch-Friendly**: Proper touch targets for mobile devices
- **Image Optimization**: Images scale properly on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nithyanruthyaaradana.git
   cd nithyanruthyaaradana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables:
   ```env
   # AI Integration (optional)
   GOOGLE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/              # Public pages
│   │   ├── page.tsx        # Homepage with hero section
│   │   ├── about/          # About academy page
│   │   ├── gallery/        # Interactive image gallery
│   │   ├── register/       # Student enrollment form
│   │   └── contact/        # Contact page with form
│   ├── globals.css         # Global styles and CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Header and footer components
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx     # Button component
│   │   ├── card.tsx       # Card component
│   │   ├── fallback-image.tsx  # Image component with fallbacks
│   │   ├── image-modal.tsx     # Full-screen image viewer
│   │   └── ...            # Other UI components
│   ├── register-form.tsx  # Student registration form
│   ├── contact-form.tsx   # Contact form
│   └── animated-logo.tsx  # Animated academy logo
├── lib/
│   ├── image-utils.ts     # Image handling utilities
│   └── utils.ts           # General utilities
├── hooks/
│   └── use-toast.ts       # Toast notification hook
└── public/
    └── images/            # Local image assets
        ├── 1.jpg          # Performance images
        ├── 2.JPG          # Training images
        ├── 3.jpg          # Event images
        └── ...            # Additional images
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 📝 Content Management

### Adding New Content

1. **Gallery Images**: Add images to `/public/images/` folder
2. **Gallery Data**: Update `src/app/(app)/gallery/page.tsx`
3. **About Content**: Modify `src/app/(app)/about/page.tsx`
4. **Homepage**: Update `src/app/(app)/page.tsx`
5. **Forms**: Edit form schemas in respective form components

### Image Management
- **Local Images**: All images are served from `/public/images/`
- **Image Categories**: Organized by performance, training, events, etc.
- **Fallback System**: Automatic fallback to local images if external images fail
- **Optimization**: Next.js Image component for automatic optimization

## 🎨 Customization

### Colors
Edit `src/app/globals.css` to modify the color scheme:
```css
:root {
  --primary: 352 75% 44%; /* Main Maroon */
  --accent: 352 85% 65%; /* Lighter Red */
  --background: 0 0% 100%; /* White background */
  --foreground: 0 0% 3.9%; /* Dark text */
  /* ... other colors */
}
```

### Typography
Update `tailwind.config.ts` to change fonts:
```typescript
fontFamily: {
  body: ['Literata', 'serif'],
  headline: ['Literata', 'serif'],
}
```

### Images
- **Add New Images**: Place in `/public/images/` folder
- **Update Categories**: Modify `src/lib/image-utils.ts`
- **Gallery Layout**: Adjust grid in `src/app/(app)/gallery/page.tsx`

## 🖼️ Image Gallery Features

### Interactive Viewer
- **Full-Screen Mode**: Click any image to open in modal
- **Zoom Controls**: Mouse wheel or +/- buttons for zoom
- **Pan Support**: Drag to move around when zoomed
- **Rotation**: Rotate images 90° increments
- **Navigation**: Arrow keys or buttons to navigate
- **Keyboard Shortcuts**: 
  - `← →` Navigate images
  - `+ -` Zoom in/out
  - `R` Rotate/Reset
  - `F` Fullscreen
  - `D` Download
  - `I` Toggle info
  - `ESC` Close

### Mobile Support
- **Touch Gestures**: Pinch-to-zoom, swipe navigation
- **Double Tap**: Zoom in/out on double tap
- **Responsive Controls**: Touch-friendly button sizes

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile (< 768px)**: Single column layouts, stacked navigation
- **Tablet (768px - 1024px)**: Two-column layouts, tablet navigation
- **Desktop (> 1024px)**: Multi-column layouts, full navigation

### Component Responsiveness
- **Typography**: Scales from mobile to desktop
- **Grid Systems**: Adaptive column counts
- **Spacing**: Responsive margins and padding
- **Images**: Proper aspect ratio maintenance
- **Forms**: Responsive field layouts
- **Navigation**: Collapsible mobile menu

## 🔧 Development

### Code Style
- **TypeScript**: Full type safety throughout
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Component Architecture**: Reusable, modular components

### Performance Optimizations
- **Next.js Image**: Automatic image optimization
- **Lazy Loading**: Components and images load on demand
- **Bundle Optimization**: Tree shaking and code splitting
- **SEO**: Meta tags, structured data, and semantic HTML

### Error Handling
- **Image Fallbacks**: Multiple fallback URLs for failed images
- **Form Validation**: Comprehensive client-side validation
- **Error Boundaries**: Graceful error handling
- **Loading States**: Proper loading indicators

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Firebase**: Hosting and functions
- **AWS**: Amplify or S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [nithyanruthyaaradana.art](https://nithyanruthyaaradana.art)
- **Email**: info@nithyanruthyaaradana.art
- **Phone**: +91 123 456 7890

## 🙏 Acknowledgments

- **Shadcn/ui** for the component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Next.js** team for the amazing framework
- **Lucide React** for beautiful icons

## 🆕 Recent Updates

### Version 2.0 - Enhanced Image Experience
- ✅ **Local Image Integration**: All images now served from local `/public/images/` folder
- ✅ **Enhanced Image Viewer**: Full-screen modal with zoom, pan, rotate, and navigation
- ✅ **Responsive Design**: Complete mobile-first responsive design
- ✅ **Performance Optimization**: Removed external image dependencies
- ✅ **Error Handling**: Robust fallback system for failed images
- ✅ **Touch Support**: Mobile-friendly gestures and interactions

---

Built with ❤️ for the classical dance community ("Nithyanruthyaaradana")

*Last updated: December 2024*
=======
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
hi
>>>>>>> 2af189ca3908537e4112c6573ff40731890077f6
