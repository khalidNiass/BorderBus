# 🛠️ Development Guide

## Setting Up Your Development Environment

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm 8+ or yarn 1.22+
- Git
- Code editor (VS Code recommended)

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Thunder Client (for API testing)

## Project Architecture

### Folder Structure Explanation

```
src/
├── components/
│   └── Reusable UI components
│   └── Each component has focused responsibility
│   └── Props-based configuration
├── pages/
│   └── Full page components
│   └── Combine multiple components
│   └── Handle page-level state
├── utils/
│   ├── sampleData.js (dummy data)
│   └── helpers.js (utility functions)
├── context/
│   └── For global state management (future)
├── App.jsx
│   └── Main router configuration
├── main.jsx
│   └── React DOM mount point
└── index.css
    └── Global Tailwind CSS
```

## Component Development Guidelines

### Creating a New Component

1. **Create component file**:
```bash
src/components/MyComponent.jsx
```

2. **Basic structure**:
```jsx
import React from 'react'

/**
 * MyComponent
 * Description of what this component does
 */
const MyComponent = ({ prop1, prop2, onAction }) => {
  return (
    <div>
      {/* Component content */}
    </div>
  )
}

export default MyComponent
```

3. **Component guidelines**:
- Use functional components with hooks
- Add JSDoc comments
- Keep components focused and small
- Pass data via props
- Use callbacks for actions
- Apply Tailwind classes for styling

### Component Naming Conventions

- **File names**: PascalCase (`UserProfile.jsx`)
- **Component names**: PascalCase (`export default UserProfile`)
- **Props**: camelCase (`userName`, `onSubmit`)
- **State variables**: camelCase (`isLoading`, `userData`)

## State Management

### Current Approach (useState)

```jsx
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
```

### For Global State (Future)

Create files in `src/context/`:

```jsx
// AuthContext.jsx
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Styling Guidelines

### Using Tailwind CSS

```jsx
// ✅ Good - Use Tailwind classes
<div className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
  Click me
</div>

// ❌ Avoid - Custom CSS unless necessary
<div style={{ backgroundColor: '#3b82f6', color: 'white' }}>
  Click me
</div>
```

### Common Tailwind Utilities

```
Colors: bg-blue-500, text-gray-700, border-red-300
Spacing: p-4, m-2, px-4, py-2, gap-3
Layout: flex, grid, relative, absolute
Responsive: md:grid-cols-2, lg:flex-row
Hover: hover:bg-blue-600, focus:outline-blue-500
```

### Responsive Breakpoints

- **Mobile**: `< 640px` (default)
- **Tablet**: `md: 768px` 
- **Desktop**: `lg: 1024px`
- **Large**: `xl: 1280px`

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Cards here
</div>
```

## Form Handling

### Form Validation Pattern

```jsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
})

const [errors, setErrors] = useState({})

const validateForm = () => {
  const newErrors = {}
  if (!formData.email) newErrors.email = 'Email required'
  if (formData.password.length < 6) {
    newErrors.password = 'Min 6 characters'
  }
  return newErrors
}

const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = validateForm()
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  
  // Submit form
}

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
  // Clear error for this field
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }
}
```

## Adding a New Page

1. **Create page file**:
```bash
src/pages/NewPage.jsx
```

2. **Add route in App.jsx**:
```jsx
<Route 
  path="/new-page" 
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <NewPage onLogout={handleLogout} />
    </ProtectedRoute>
  } 
/>
```

3. **Add to sidebar navigation**:
Edit `src/components/Sidebar.jsx`:
```jsx
const navItems = [
  // ... existing items
  { path: '/new-page', label: 'New Page', icon: <FaIcon /> },
]
```

## API Integration

### Example with fetch

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/buses')
      const data = await response.json()
      setBuses(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  fetchData()
}, [])
```

### Error Handling Pattern

```jsx
try {
  // API call
  const data = await updateBus(busId, busData)
  setSuccess('Bus updated successfully!')
  setTimeout(() => setSuccess(null), 3000)
} catch (error) {
  setError(error.message || 'Failed to update bus')
  console.error('Error:', error)
}
```

## Testing Best Practices

### Testing Component Rendering
```jsx
// Expected behavior test
it('should render edit button for each item', () => {
  // Component should have edit buttons
})

// Event handling test
it('should call onEdit when edit button clicked', () => {
  // Verify callback is called
})
```

## Debugging Tips

### Browser DevTools
1. Open Developer Tools (F12)
2. Use React Developer Tools extension
3. Inspect component state in DevTools
4. Network tab for API calls

### Console Logging
```jsx
const [data, setData] = useState([])

useEffect(() => {
  console.log('Component mounted')
  console.log('Current data:', data)
  
  return () => console.log('Component unmounted')
}, [data])
```

### React DevTools
- Install extension in browser
- View component tree
- Inspect props and state
- Pause on component updates

## Performance Optimization

### Code Splitting
```jsx
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'))

<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

### Memoization
```jsx
// Prevent unnecessary re-renders
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

### useCallback
```jsx
// Stable function references
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])
```

## Commit Message Guidelines

Use clear, descriptive messages:

```
✨ feat: Add bus management page
🐛 fix: Fix sidebar mobile menu toggle
📝 docs: Update README with API docs
♻️ refactor: Simplify form validation logic
🎨 style: Update button component styling
✅ test: Add test cases for helpers
🚀 perf: Optimize table rendering
```

## Deployment Checklist

- [ ] All features tested
- [ ] No console errors
- [ ] Forms validated properly
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Security checks done
- [ ] README updated
- [ ] Build completes successfully

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run lint         # Run linting
npm run build        # Build for production
npm run preview      # Preview production build

# Package management
npm install          # Install dependencies
npm update           # Update all packages
npm list             # Show installed packages
npm outdated         # Check outdated packages

# Git
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --verbose  # See detailed build info
```

## Resource Links

- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Help

1. Check the README.md first
2. Review FEATURES.md for functionality details
3. Search in component files for similar implementations
4. Check browser console for errors
5. Use React DevTools to inspect state

## Contributing

When contributing:
1. Create a new branch
2. Follow the guidelines above
3. Test your changes thoroughly
4. Create a clear pull request description
5. Wait for review and approval
