"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SecurityValidator, CSRFProtection } from '@/lib/security';

interface SecureFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
  className?: string;
  method?: 'POST' | 'PUT' | 'PATCH';
}

interface FormData {
  [key: string]: string | number;
}

export function SecureForm({ onSubmit, children, className = '', method = 'POST' }: SecureFormProps) {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Generate CSRF token
    const token = CSRFProtection.generateToken();
    setCsrfToken(token);
  }, []);

  const validateForm = (formData: FormData): { isValid: boolean; errors: Record<string, string> } => {
    const validationErrors: Record<string, string> = {};

    // Validate each field based on its name and type
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        let validationResult;

        switch (key.toLowerCase()) {
          case 'email':
            validationResult = SecurityValidator.validateEmail(value);
            break;
          case 'name':
          case 'fullname':
          case 'username':
            validationResult = SecurityValidator.validateName(value);
            break;
          case 'phone':
          case 'telephone':
            validationResult = SecurityValidator.validatePhone(value);
            break;
          case 'url':
          case 'website':
            validationResult = SecurityValidator.validateURL(value);
            break;
          case 'message':
          case 'comment':
          case 'review':
            validationResult = SecurityValidator.validateReview(value);
            break;
          case 'password':
            const passwordValidation = SecurityValidator.validatePassword(value);
            if (!passwordValidation.isValid) {
              validationErrors[key] = passwordValidation.error || 'Invalid password';
            }
            return; // Skip to next iteration
          case 'rating':
            const ratingValidation = SecurityValidator.validateRating(Number(value));
            if (!ratingValidation.isValid) {
              validationErrors[key] = ratingValidation.error || 'Invalid rating';
            }
            return; // Skip to next iteration
          default:
            validationResult = SecurityValidator.validateText(value, key);
        }

        if (validationResult && !validationResult.isValid) {
          validationErrors[key] = validationResult.error || 'Invalid input';
        }
      }
    });

    return {
      isValid: Object.keys(validationErrors).length === 0,
      errors: validationErrors,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const data: FormData = {};

      // Convert FormData to object
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      // Validate form data
      const validation = validateForm(data);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsSubmitting(false);
        return;
      }

      // Add CSRF token to form data
      data.csrfToken = csrfToken;

      // Submit form
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ general: 'An error occurred while submitting the form' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      method={method}
      className={className}
      noValidate
    >
      {/* Hidden CSRF token field */}
      <input type="hidden" name="csrfToken" value={csrfToken} />
      
      {/* Error display */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800 text-sm">
            {errors.general && <p className="mb-2">{errors.general}</p>}
            {Object.entries(errors)
              .filter(([key]) => key !== 'general')
              .map(([key, error]) => (
                <p key={key} className="mb-1">
                  <strong>{key}:</strong> {error}
                </p>
              ))}
          </div>
        </div>
      )}

      {/* Form content */}
      {children}

      {/* Submit button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

// Secure Input Component
interface SecureInputProps {
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
  label?: string;
  error?: string;
}

export function SecureInput({
  name,
  type = 'text',
  placeholder,
  required = false,
  minLength,
  maxLength,
  pattern,
  className = '',
  label,
  error,
}: SecureInputProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const validateInput = (inputValue: string) => {
    if (!inputValue && !required) {
      setIsValid(true);
      setValidationError('');
      return;
    }

    let validationResult;
    switch (type) {
      case 'email':
        validationResult = SecurityValidator.validateEmail(inputValue);
        break;
      case 'tel':
        validationResult = SecurityValidator.validatePhone(inputValue);
        break;
      case 'url':
        validationResult = SecurityValidator.validateURL(inputValue);
        break;
      default:
        if (name.toLowerCase().includes('name')) {
          validationResult = SecurityValidator.validateName(inputValue);
        } else {
          validationResult = SecurityValidator.validateText(inputValue, name);
        }
    }

    setIsValid(validationResult.isValid);
    setValidationError(validationResult.error || '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    validateInput(inputValue);
  };

  const displayError = error || validationError;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          !isValid || displayError ? 'border-red-300' : 'border-gray-300'
        } ${className}`}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
      />
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}

// Secure Textarea Component
interface SecureTextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  className?: string;
  label?: string;
  error?: string;
}

export function SecureTextarea({
  name,
  placeholder,
  required = false,
  minLength,
  maxLength,
  rows = 4,
  className = '',
  label,
  error,
}: SecureTextareaProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const validateInput = (inputValue: string) => {
    if (!inputValue && !required) {
      setIsValid(true);
      setValidationError('');
      return;
    }

    let validationResult;
    if (name.toLowerCase().includes('review') || name.toLowerCase().includes('comment')) {
      validationResult = SecurityValidator.validateReview(inputValue);
    } else {
      validationResult = SecurityValidator.validateText(inputValue, name);
    }

    setIsValid(validationResult.isValid);
    setValidationError(validationResult.error || '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    validateInput(inputValue);
  };

  const displayError = error || validationError;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          !isValid || displayError ? 'border-red-300' : 'border-gray-300'
        } ${className}`}
      />
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}
