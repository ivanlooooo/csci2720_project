// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import { Navigate, useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

import AdminPanel from './adminPanel';

function AdminControl() {
  return (
    <div className='adminHomePage'>
      <div className="featureSection">
        <AdminPanel />
      </div>
      <div className='adminHome'>
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}

export default AdminControl;
