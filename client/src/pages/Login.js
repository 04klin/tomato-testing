import { useState } from 'react'
import '../css/Home.css';
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
    
  }

  return (
    <div className='body'>
      <div className='container2'>
        <div className='text'>
          Login
        </div>  
        <form className='login' onSubmit={handleSubmit}>
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
                <button id='submitButton' disabled={isLoading}>Login</button>
            </div>
            {error && <div className='error'>{error}</div>}
          </div>          
        </form>
      </div>   
    </div>
  )
}
export default Login