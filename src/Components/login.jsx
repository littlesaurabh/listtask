import React,{useState} from 'react'
import { withRouter } from 'react-router-dom';
export default withRouter( function Login(props){
    console.log(props)

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const [state, setState] = useState(true);
    const logout = (event) => {
        event.preventDefault();
        props.history.push({
          pathname: '/login'
        });
      };
    
    const login=()=>{
        localStorage.setItem("login","foo")

        if(username=='foo'&&password=='bar')
      {
        setSuccess("Successfully logged in.")
        setError('')
        console.log(props)
        props.history.push({
            pathname: '/home',
            state
          });
      }
        else
        {
            setSuccess('')
            setError('Wrong Username or Password. Please try Again.')
        }

    }
return <div className="container-fluid">
    <div className="row">
        <div className="col-md-4 offset-md-4">
        <div className="card bg-dark text-light mt-5">
<div className="card-header text-center">
   Contact Book Login
</div>
<div className="card-body">
    <div className="form-group">
       <label htmlFor="">Username</label>
       <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
    </div>
    <div className="form-group">
       <label htmlFor="">Password</label>
       <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
</div>
<div className="card-footer">
    <button onClick={login} className="btn btn-block btn-primary">Login</button>
  <div className="mt-2 text-center text-white">
  <a>Forgot Password?</a>
  </div>
  <div className="mt-2">
      <div className="text-center">
          <span className="text-danger">{error?error:''}</span>
          <span className="text-success">{success?success:''}</span>
      </div>
  </div>
</div>

</div>
        </div>
    </div>
</div>
})