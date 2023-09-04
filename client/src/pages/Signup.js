import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import '../css/Home.css';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, password)
  }

  return (
    <div className='body'>
      <div className='container2'>
        <div className='text'>
          Signup
        </div>  
        <form className='signup' onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">            
              <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <div className="underline"></div>
              <label>Username</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">            
              <input 
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <div className="underline"></div>
              <label>Password</label>
            </div>
          </div>

          
          <div className="form-row submit-btn">
            <div className="input-data">
                <button id='submitButton' disabled={isLoading}>Signup</button>
            </div>
            {error && <div className='error'>{error}</div>}
          </div>
          
        </form>
      </div>   
    </div>
  )
}

export default Signup