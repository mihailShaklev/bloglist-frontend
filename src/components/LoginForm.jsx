import PropTypes from 'prop-types'
import { useState} from "react"

const LoginForm = ({handleSubmit}) => {

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const submitLoginForm = (event) => {
        event.preventDefault()
        handleSubmit(username, password)
        setUsername('')
        setPassword('')
    }

    return(
    <form onSubmit={submitLoginForm}>
      <div>
        username
          <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
          <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm