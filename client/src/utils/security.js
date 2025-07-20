// Security utility functions for client-side

export const sanitizeForLogging = (data) => {
  if (!data) return data;
  
  const sensitiveFields = ['password', 'token', 'secret', 'authorization', 'cookie'];
  const sanitized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
};

export const safeLogError = (error, context = '') => {
  const sanitizedError = {
    message: error.message,
    status: error.response?.status,
    context
  };
  
  console.error('Error:', sanitizedError);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  

  return input
    .replace(/[<>]/g, '') 
    .replace(/javascript:/gi, '') 
    .replace(/on\w+=/gi, '') 
    .trim();
};

export const isDevelopment = () => {
  return import.meta.env.DEV || process.env.NODE_ENV === 'development';
};

export const secureConsole = {
  log: (...args) => {
    if (isDevelopment()) {
      console.log(...args.map(arg => sanitizeForLogging(arg)));
    }
  },
  error: (...args) => {
    if (isDevelopment()) {
      console.error(...args.map(arg => sanitizeForLogging(arg)));
    }
  },
  warn: (...args) => {
    if (isDevelopment()) {
      console.warn(...args.map(arg => sanitizeForLogging(arg)));
    }
  }
};

export const secureStorage = {
  setItem: (key, value) => {
    const sensitiveKeys = ['token', 'password', 'secret', 'jwt'];
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      throw new Error(`Attempted to store sensitive data in localStorage: ${key}`);
    }
    localStorage.setItem(key, value);
  },
  
  getItem: (key) => {
    return localStorage.getItem(key);
  },
  
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};

export const clearSensitiveData = () => {
  const sensitiveKeys = ['user', 'isAdmin', 'guestCart', 'wishlist'];
  sensitiveKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};

export const validateTokenFormat = (token) => {
  if (!token) return false;

  const parts = token.split('.');
  return parts.length === 3;
}; 