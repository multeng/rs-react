import React from 'react';
import ErrorComponent from '../Error';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorComponent error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
