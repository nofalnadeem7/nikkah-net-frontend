import React from 'react';
import { Layout } from 'antd';
import './HeroSection.css';
import Herosection from './assets/images/Hero-Section.JPG';

const { Content } = Layout;

const HeroSection = () => {
    return (
        <>
            <Layout>
                <Content className="hero-content">
                        <div className="hero-container">
                          <img
                              src={Herosection}
                              alt="Hero Section"
                              className="hero-image"
                          />
                          <div className="hero-overlay">
                              <h1 className="welcome-message">Welcome to Our Website</h1>
                              <p className="welcome-subtext">We're glad you're here. Explore and enjoy!</p>
                          </div>
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default HeroSection;