import { useState } from 'react'
import '../css/Home.css';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(username, password)
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
                    <button id='submitButton'>Login</button>
                </div>
              </div>
          
        </form>
      </div>   
    </div>
  )
}
export default Login