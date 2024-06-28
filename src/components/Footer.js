import React from 'react';
import '../styles/components/Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer'>
      <div className="upper row justify-content-between">
        <div className="left col"  style={{marginBottom:"20px"}}>
          <h3>We specialize in resolving your device issues with expertise and efficiency.</h3>
          <p>RepairBuddy, 2024</p>
        </div>
        {/* <div className="right col-2">
          <div className="resources">
            <h6>Resources</h6>
            <div className="links">
              <Link className='navlink' to="/chatbot">Chatbot</Link>
              <Link className='navlink' to="/vendors">Vendors</Link>
              <Link className='navlink' to="/feedback">Feedback</Link>
              <Link className='navlink' to="/report">Report</Link>
            </div>
          </div>
        </div> */}
      </div>
      <div className="bottom">
        <p>© 2024 RepairBuddy. All rights reserved.</p>
      </div>








      
    </div>
  );
}
