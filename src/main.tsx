import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // If the error comes from a browser extension, do not crash the app
    if (
      error?.stack?.includes('chrome-extension://') ||
      error?.message?.includes('Cannot set property fetch')
    ) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      error?.stack?.includes('chrome-extension://') ||
      error?.message?.includes('Cannot set property fetch')
    ) {
      return;
    }
    console.error('Unhandled app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-rose-400">Application Error</h2>
            <p className="text-xs text-slate-400">
              An unexpected error occurred. Please refresh the page to reload the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
