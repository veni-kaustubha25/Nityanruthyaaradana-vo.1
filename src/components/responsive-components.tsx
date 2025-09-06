"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Image as ImageIcon, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload
} from 'lucide-react';

// Responsive Grid Container
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function ResponsiveGrid({ 
  children, 
  className = '', 
  cols = { default: 1, sm: 2, md: 3, lg: 4 } 
}: ResponsiveGridProps) {
  const gridCols = {
    default: `grid-cols-${cols.default || 1}`,
    sm: cols.sm ? `sm:grid-cols-${cols.sm}` : '',
    md: cols.md ? `md:grid-cols-${cols.md}` : '',
    lg: cols.lg ? `lg:grid-cols-${cols.lg}` : '',
    xl: cols.xl ? `xl:grid-cols-${cols.xl}` : '',
  };

  const gridClasses = [
    'grid gap-4 sm:gap-6',
    gridCols.default,
    gridCols.sm,
    gridCols.md,
    gridCols.lg,
    gridCols.xl,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

// Responsive Card Component
interface ResponsiveCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export function ResponsiveCard({ 
  title, 
  description, 
  children, 
  className = '', 
  actions,
  variant = 'default'
}: ResponsiveCardProps) {
  const cardVariants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: 'bg-white border-2 border-gray-300 shadow-none',
    elevated: 'bg-white border border-gray-200 shadow-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${cardVariants[variant]} ${className}`}>
        {(title || description || actions) && (
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                {title && (
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className="text-sm text-gray-600 mt-1">
                    {description}
                  </CardDescription>
                )}
              </div>
              {actions && (
                <div className="flex flex-wrap gap-2">
                  {actions}
                </div>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent className="p-4 sm:p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Responsive Form Component
interface ResponsiveFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function ResponsiveForm({ children, onSubmit, className = '' }: ResponsiveFormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`space-y-4 sm:space-y-6 ${className}`}
    >
      {children}
    </form>
  );
}

// Responsive Form Field
interface ResponsiveFormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export function ResponsiveFormField({ 
  label, 
  children, 
  error, 
  required = false, 
  className = '',
  layout = 'vertical'
}: ResponsiveFormFieldProps) {
  if (layout === 'horizontal') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start ${className}`}>
        <Label className="text-sm font-medium text-gray-700 sm:text-right sm:pt-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="sm:col-span-2">
          {children}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Responsive Input Component
interface ResponsiveInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ResponsiveInput({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  size = 'md'
}: ResponsiveInputProps) {
  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-3 sm:px-4',
    lg: 'h-12 text-base px-4 sm:px-6'
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full ${sizeClasses[size]} ${className}`}
    />
  );
}

// Responsive Textarea Component
interface ResponsiveTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}

export function ResponsiveTextarea({ 
  placeholder, 
  value, 
  onChange, 
  rows = 4,
  className = ''
}: ResponsiveTextareaProps) {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full resize-none text-sm sm:text-base ${className}`}
    />
  );
}

// Responsive Button Group
interface ResponsiveButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function ResponsiveButtonGroup({ 
  children, 
  className = '', 
  orientation = 'horizontal' 
}: ResponsiveButtonGroupProps) {
  const orientationClasses = orientation === 'vertical' 
    ? 'flex-col space-y-2' 
    : 'flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2';

  return (
    <div className={`flex ${orientationClasses} ${className}`}>
      {children}
    </div>
  );
}

// Responsive Stats Card
interface ResponsiveStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function ResponsiveStatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className = ''
}: ResponsiveStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-4 sm:p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {value}
            </p>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <Badge 
                  variant={trend.isPositive ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </Badge>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="h-8 w-8 sm:h-12 sm:w-12 text-[#8B0000]">
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// Responsive Image Grid
interface ResponsiveImageGridProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
  }>;
  onImageClick?: (image: any) => void;
  className?: string;
}

export function ResponsiveImageGrid({ images, onImageClick, className = '' }: ResponsiveImageGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => onImageClick?.(image)}
        >
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
          {image.title && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              {image.title}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Responsive Table Container
interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveTable({ children, className = '' }: ResponsiveTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-full">
        {children}
      </div>
    </div>
  );
}

// Responsive Modal/Dialog Content
interface ResponsiveModalContentProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function ResponsiveModalContent({ 
  children, 
  className = '', 
  size = 'md' 
}: ResponsiveModalContentProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md sm:max-w-lg',
    lg: 'max-w-lg sm:max-w-2xl',
    xl: 'max-w-xl sm:max-w-4xl',
    full: 'max-w-full mx-4 sm:mx-8'
  };

  return (
    <div className={`w-full ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
