import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>TsaiLabDiary</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Diary</Link>
      </nav>
    </div>
  )
}
