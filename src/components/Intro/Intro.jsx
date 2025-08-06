import React from "react";
import "./intro.css";
import bg from "../../assets/image.png";
import { Link } from "react-scroll";
import btnImg from "../../assets/hireme.png";

const Intro = () => {
  return (
    <section id="intro">
      <div className="introContent">
        <span className="hello">Hello,</span>
        <span className="introText">
          I'm{" "}
          <span className="introName">
            Nitin
          </span>
          <br/>
          Web Designer
        </span>
        <p className="introPara">I am a skilled web designer with experience in creating 
        <br/>
        visually appealing and user friendly website</p>
        <Link><button className="btn"><img src={btnImg} alt="" className="btnImg"/>Hire Me</button></Link>
      </div>
      <img src={bg} alt="Profile" className="bg" />
    </section>
  );
};

export default Intro;
