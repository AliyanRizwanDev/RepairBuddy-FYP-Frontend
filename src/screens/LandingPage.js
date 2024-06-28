import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Union from "../utils/union.png";
import Sec1Img from "../utils/sec-1 image.png";
import Chatbot from "../utils/chatbot.png";
import Owner from "../utils/owner.png";
import Step1 from "../utils/sec-4-s1.png";
import Step2 from "../utils/sec-4-s2.png";
import Step3 from "../utils/sec-4-s3.png";

import "../styles/screens/LandingPage.css";
import AccordionUsage from "../components/AccordionUsage";
import {Link} from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      

      <div className="landing-page">
        <div className="sec1 text-center">
          <div className="bg-grade">
            <p>
              <img src={Union} alt="Union" />
              WELCOME TO REPAIRBUDDY
            </p>

            <h1>
              SWIFTLY TROUBLESHOOT DEVICE PROBLEMS OR SUMMON A HOME FIXING
              EXPERT IN A SNAP!
            </h1>

            <Link to="/sign-Up">
            <button className="btn btn-outline-primary my-1" id="button">
              Get Started For Free
            </button>
            </Link>

            <img id="sec1-image" src={Sec1Img} alt="sec1Image" />
          </div>
        </div>

        <div className="sec2 row">
          <div className="sec2-left col">
            <h3>Self-Serve Customer Support</h3>
            <p>
              Since unleashing RepairBuddy, we've witnessed a game-changing up
              to 50% drop for users to go to an onsite visits for device issues.
            </p>
            <div className="hr"></div>
            <div className="owner">
              <img src={Owner} alt="owner" />
              <div className="owner-details">
                <p id="owner-name">MOHAMMAD ALIYAN</p>
                <p id="owner-role">Founder and CEO of RepairBuddy</p>
              </div>
            </div>
          </div>
          <div className="sec2-right col text-center">
            <img className="sec2-image" src={Chatbot} alt="chatbot" />
          </div>
        </div>

        <div className="sec3 text-center my-5">
          <h2>Device Catalog</h2>
          <div className="row row1">
            <div className="col">
              <h5 className="my-4">Personal Computer</h5>
            </div>
            <div className="col">
              <h5 className="my-4">Laptop</h5>
            </div>
            <div className="col">
              <h5 className="my-4">Smartphones</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="my-4">Air Condition</h5>
            </div>
            <div className="col">
              <h5 className="my-4">Washing Machine</h5>
            </div>
            <div className="col">
              <h5 className="my-4">Fridge</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="sec4-all">
        <h2>Solving Your Device Issues in Three Simple Steps</h2>

        <div className="sec4 row">
          <div className="sec4-img-section col d-flex justify-content-center align-items-center">
            <img className="sec4-img" src={Step1} alt="Step1" />
          </div>
          <div className="sec4-text col">
            <div className="sec4-text-step">
              <h5>Step 1</h5>
            </div>
            <div className="sec4-text-head">
              <h3 className="sec4-h3">Describe Your Issue</h3>
            </div>
            <div className="sec4-text-para">
              <p>
                Start by telling us what's wrong with your device. Our AI
                chatbot is here to listen!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec4-2 row">
        <div className="step2 col d-flex justify-content-center">
          <div className="step2-box justify-content-center align-items-center">
            <h5>Step 2</h5>
            <div className="sec4-text-head">
              <h3 className="sec4-2-h3">AI-Assisted Troubleshooting</h3>
            </div>
            <div className="sec4-2-p">
              <p>
                Our advanced AI will guide you through simple troubleshooting
                steps to try and fix the issue.
              </p>
            </div>

            <div className="sec4-2-img-section">
              <img src={Step2} alt="Step2Image" />
            </div>
          </div>
        </div>
        <div className="step3 col d-flex justify-content-center">
          <div className="step3-box justify-content-center">
            <h5>Step 3</h5>
            <div className="sec4-text-head">
              <h3 className="sec4-2-h3">Connect with a Repair Vendor</h3>
            </div>
            <div className="sec4-2-p">
              <p>
                If the issue persists, we'll connect you with a trusted, local
                repair vendor from our network.
              </p>
            </div>
            <div className="sec4-2-img-section">
              <img src={Step3} alt="Step3Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="sec5">
      <h2>FAQs</h2>
      <AccordionUsage/>
      </div>


      
    </div>
  );
}
