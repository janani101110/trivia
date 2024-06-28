// ErrorBoundary.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught an error", error, errorInfo);
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>We are sorry for the inconvenience. Please try refreshing the page or go back to the <Link to="/">homepage</Link>.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
