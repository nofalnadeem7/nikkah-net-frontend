import React from "react";
import { footerContent } from "../Constant/Const.js";
import { Layout, Typography, Row, Col, Space, Button } from "antd";
import {
  FacebookOutlined,
  MailOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const CustomFooter = () => {
  return (
    <AntFooter className="custom-footer">
      <Row gutter={16} justify="center" align="middle">
        <Col xs={24} sm={12} md={6} className="footer-column">
          <img
            src={footerContent.logoSrc}
            alt="Company Logo"
            className="footer-logo"
          />
          <div>
            <Text className="footer-text">
              Guaranteed Satisfaction. Everytime!
            </Text>
          </div>
          <div>
            <Space>
              <Button
                icon={<FacebookOutlined style={{ fontSize: "24px" }} />}
                href="https://www.facebook.com/nikkahnet"
                className="footer-icon-button"
              />
              <Button
                icon={<MailOutlined style={{ fontSize: "24px" }} />}
                href="mailto:admin@nikkahnet.com"
                className="footer-icon-button"
              />
              <Button
                icon={<LinkedinOutlined style={{ fontSize: "24px" }} />}
                href="https://www.linkedin.com/company/nikkahnet"
                className="footer-icon-button"
              />
            </Space>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-column">
          <Text
            strong
            style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}
          >
            {/* Services
          </Text>
          {footerContent.services.map((service, index) => (
            <div key={index}>
              <a href={service.href}>{service.text}</a>
            </div>
          ))}
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-column">
          <Text
            strong
            style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}
          > */}
            Company
          </Text>
          {footerContent.company.map((company, index) => (
            <div key={index}>
              <a style={{ fontSize: "16px" }} href={company.href}>
                {company.text}
              </a>
            </div>
          ))}
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-column">
          <Text
            style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}
          >
            Contact Us
          </Text>
          <div className="footer-contact">
            <Text className="footer-contact-text">
              Adress: {footerContent.contact.address}
            </Text>
            <br />
            <Text className="footer-contact-text">
              Email: {footerContent.contact.email}
            </Text>
            <br />
            <Text className="footer-contact-text">
              Phone: {footerContent.contact.phone}
            </Text>
          </div>
        </Col>
      </Row>
      <div>
        <Text className="footer-copyright-text">{footerContent.copyright}</Text>
      </div>
    </AntFooter>
  );
};

export default CustomFooter;