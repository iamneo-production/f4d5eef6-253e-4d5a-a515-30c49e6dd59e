import React from 'react';
import Navbar from "../components/navbar";

const Admin = () => {

    return (
      <div>
          <Navbar/>
       <form>
       <div className="superAdmin">
           <div className="superadminNavbar">
           </div>
          <div className="User details">
            <h3 className="Admin Name">{ user.name }</h3>
            <div><span className="header">admin: </span>{ user.admin.name }</div>
             <div>
            <h3 className="Company Name">Company Details: </h3>
            <div><span className="header">Company Name: </span>{ user.company.name }</div>
            <div>
            <h3 className="Company Address">Company Details: </h3>
            <div><span className="header">Company Address: </span>{ user.company.bs }</div>
            <div className="Phone Number">
              <div className="Phone NUmber"><span className="header">Phone: </span>{ user.phone }</div>
            </div>
            </div>
            </div>
            </div>
        </div>
        </form>
      </div>

      )
    }

   export default Admin;


