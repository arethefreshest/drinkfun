import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Find the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Initial render: Render the App component to the root
root.render(<App />);