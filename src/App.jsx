import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {

    //create asynchronous call to fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const DisplayUsers = () => {
    if (filter === '') {
      return users
    }
    return users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <>
      <input
        type="text"
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter users..."
        title="Type to filter users by name"
      />
      <ul>
        {DisplayUsers().map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

    </>
  )
}

export default App
