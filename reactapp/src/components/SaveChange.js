import React from 'react';
import Navbar from "../components/Navbar";
const SaveChange = () => {

 return (
   <div>
     <Navbar/>
    <form>
        <div className="content">
        <div className="Back-key">
        <button class="button">&#8249; Back</button>
        </div>
              
        <label for="uname"><b>Bike Model</b></label>
        
        <div className="First-input">
          <input type="text" className="name" />
        </div>
        <label for="uname"><b>Bike Rent Price</b></label>
        <div className="Second-input">
          <input type="text" className="name"/>
        </div>
        <label for="uname"><b>Bike Type</b></label>
        <div className="fourth-input">
          <input type="text" className="name"/>
        </div>
      <div className="Third-output">
        
      <button type="submit">Save Changes</button>
      </div>
      </div>
    </form>
      
   </div>

  
 )

}
export default SaveChange;