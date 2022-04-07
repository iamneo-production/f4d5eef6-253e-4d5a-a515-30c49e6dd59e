import React from 'react';

const Login = () => {

 return (
   <div>
    <form>
    <div className="Login">
    
      
        <h1>Super Admin</h1>
        <div className="email">
          
          <input type="email" placeholder="Enter Email" className="name"/>
        </div>
        <div className="password">
          <input type="password" placeholder="Enter Password" className="password"/>
        </div>
        <div className="SubmitButton">
          <button>Submit</button>
        </div>

      </div>
    </form>
      
   </div>

  
 )

}
export default Login;