import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import "../styles/components/AccordionUsage.css"

export default function AccordionUsage() {
  return (
    <div className='accordion-full'>
      <Accordion className="acc-each">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="acc-name">What makes RepairBuddy unique in the electronic device repair market?</p>
        </AccordionSummary>
        <AccordionDetails className="acc-details">
          RepairBuddy stands out in the electronic device repair market due to its advanced AI-driven diagnostics, seamless user experience, and extensive network of verified repair vendors. Whether it's smartphones, laptops, or other electronic devices, RepairBuddy ensures efficient and reliable repair services tailored to individual needs.
        </AccordionDetails>
      </Accordion>
      <Accordion className="acc-each">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <p className="acc-name">How does RepairBuddy utilize AI chatbots for troubleshooting assistance?</p>
        </AccordionSummary>
        <AccordionDetails className="acc-details">
          RepairBuddy employs AI chatbots equipped with natural language processing capabilities to provide real-time troubleshooting assistance. These chatbots can accurately diagnose issues, offer step-by-step guidance for resolving common problems, and even recommend appropriate repair solutions. By leveraging AI technology, RepairBuddy ensures prompt and effective support to users, enhancing their overall experience.
        </AccordionDetails>
      </Accordion>

      <Accordion className="acc-each">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <p className="acc-name">Is RepairBuddy compatible with a broad range of electronic devices?</p>
        </AccordionSummary>
        <AccordionDetails className="acc-details">
          Yes, RepairBuddy is designed to be compatible with a wide array of electronic devices, including smartphones, tablets, laptops, gaming consoles, and more. Its versatile platform accommodates various brands, models, and types of devices, ensuring that users can seek repair assistance regardless of their device preferences. RepairBuddy's compatibility extends across different operating systems and hardware configurations, making it a comprehensive solution for device repair needs.
        </AccordionDetails>
      </Accordion>

      <Accordion className="acc-each">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <p className="acc-name">How does RepairBuddy ensure the reliability of the local repair vendors it recommends?</p>
        </AccordionSummary>
        <AccordionDetails className="acc-details">
          RepairBuddy employs a rigorous vetting process to ensure the reliability and quality of the local repair vendors it recommends. This process includes verifying vendor credentials, assessing their track record of customer satisfaction, and conducting on-site inspections of repair facilities. Additionally, RepairBuddy leverages user feedback and ratings to continuously evaluate vendor performance and maintain high standards of service quality. By partnering with trusted repair professionals, RepairBuddy ensures that users receive dependable repair solutions tailored to their needs.
        </AccordionDetails>
      </Accordion>

      <Accordion className="acc-each">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <p className="acc-name">Is RepairBuddy user-friendly for individuals with varying technical expertise?</p>
        </AccordionSummary>
        <AccordionDetails className="acc-details">
          Yes, RepairBuddy is designed with user-friendliness in mind to cater to individuals with varying technical expertise. Its intuitive interface, guided troubleshooting process, and comprehensive support resources make it accessible to both tech-savvy users and those less familiar with electronic devices. Whether you're a novice seeking basic repair guidance or an experienced user troubleshooting complex issues, RepairBuddy provides a seamless and inclusive experience for all.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
