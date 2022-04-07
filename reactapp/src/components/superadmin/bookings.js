import React from 'react';
import Navbar from "../components/navbar";

const Bookings = () => {

    return (
      <div>
          <Navbar/>
       <form>
       <div className="superAdmin">
           <div className="superadminNavbar">
           </div>
           <nav className="navbar">
            <h4>Admin ID</h4>
            <h4>Company Name</h4>
            <h4>Rent</h4>
            <h4>Days</h4>
            <h4>Total Price</h4>
        </nav>

          <div className="details">
            <div className="Admin Id">
            <div><span className="header">admin: </span>{ admin.admin.id }</div>
             <div>
            <div className="Company Name">
            <div><span className="header">Company Name: </span>{ admin.company.name }</div>
            <div>
            <div className="Bike Model">
            <div><span className="header">Bike Model: </span>{ admin.bikemodel }</div>
            <div className="Rent">
              <div><span className="header">Rent: </span>{ admin.rent }</div>
            <div className="Days">
            <div><span className="header">Days: </span>{ admin.days }</div>
            <div className="Total price">
            <div><span className="header">totalprice: </span>{ admin.totlprice }</div>
            </div>
            </div>
            </div>
            </div>
            </div>
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
