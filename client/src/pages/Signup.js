import { useState } from 'react'
import '../css/Home.css';

const Signup = () => {
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
          Signup
        </div>  
        <form className='signup' onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="input-data">            
              <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <div class="underline"></div>
              <label>Username</label>
            </div>
          </div>
          <div class="form-row">
            <div class="input-data">            
              <input 
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <div class="underline"></div>
              <label>Password</label>
            </div>
          </div>

          
          <div class="form-row submit-btn">
                <div class="input-data">
                    <button id='submitButton'>Signup</button>
                </div>
              </div>
          
        </form>
      </div>   
    </div>
  )
}

export default Signup