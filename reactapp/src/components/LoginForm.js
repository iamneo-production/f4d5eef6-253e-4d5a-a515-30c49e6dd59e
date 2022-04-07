import React from 'react';

const LoginForm = () => {

 return (
   <div>
    <form>
    <div className="Loginform">
    
      
        <h1>LOGIN</h1>
        <div className="Loginmail-input">
          
          <input type="email" placeholder="Enter Email" className="name"/>
        </div>
        <div className="Loginpass-input">
          <input type="password" placeholder="Enter Password" className="password"/>
        </div>
        <div className="Submit-output">
          <button>Submit</button>
        </div>
        <div type="text" className="signup">
          <p style={{color: "black"}}>New Booking?</p>
          <a href="./create"style={{color: "blue"}}>Click Here</a>
        </div>
        

      </div>
    </form>
      
   </div>

  
 )

}
export default LoginForm;