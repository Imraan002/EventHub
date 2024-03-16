import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { IoIosBrush, IoIosMusicalNotes, IoMdMusicalNote, IoIosHappy, IoIosHelpCircle, IoIosGlasses, IoIosSchool, IoIosPeople, IoLogoJavascript } from "react-icons/io";
import Navbar from "./Navbar";

function CategoryPage() {
  const categories = [
    { name: "Art", icon: <IoIosBrush /> },
    { name: "Music", icon: <IoIosMusicalNotes /> },
    { name: "Dance", icon: <IoMdMusicalNote /> },
    { name: "Drama", icon: <IoIosHappy /> },
    { name: "Quiz", icon: <IoIosHelpCircle /> },
    { name: "Fashion", icon: <IoIosGlasses /> },
    { name: "Workshop", icon: <IoIosSchool /> },
    { name: "Social Events", icon: <IoIosPeople /> },
    { name: "Coding", icon: <IoLogoJavascript /> },
  ];

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryHover = (index) => {
    setHoveredCategory(index);
  };

  const handleCategoryClick = (categoryName) => {
    // Store the selected category in localStorage
    localStorage.setItem("selectedCategory", categoryName);
    
    // Redirect to the EventList component
    window.location.href = "/EventList";
  };

  // Function to navigate to the AddEvent page
  const handleAddEvent = () => {
    window.location.href = "/AddEvents";
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#000", minHeight: "100vh", paddingTop: "150px", padding: "130px" }}>
        <h3 className="text-center mb-4" style={{ color: "#fff", fontWeight: "bold", fontSize: "24px" }}>Categories</h3>
        <Container>
          <Row className="justify-content-center">
            {categories.map((category, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2} className="text-center mb-3">
                <div className="d-flex flex-column align-items-center"
                  onMouseEnter={() => handleCategoryHover(index)}
                  onMouseLeave={() => handleCategoryHover(null)}
                >
                  <div
                    className="rounded-circle mb-2 category-button d-flex justify-content-center align-items-center"
                    style={{
                      width: "90px",
                      height: "90px",
                      overflow: "hidden",
                      backgroundColor: "#1f1f1f",
                      border: "1px solid #333",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "50%",
                      cursor: "pointer",
                      borderColor: hoveredCategory === index ? "#007bff" : "#333",
                      transition: "border-color 0.3s ease-in-out", // Add transition for smooth effect
                    }}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div style={{ fontSize: "48px", color: "#fff" }}>{category.icon}</div>
                  </div>
                  <div className="text-white" style={{ fontSize: "16px", fontWeight: "bold" }}>{category.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <div className="text-center mt-4" style={{ color: "#ccc", fontSize: "14px" }}>
          Explore events in your favorite categories and discover new experiences.
        </div>
        
        {/* Button to navigate to the AddEvent page */}
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleAddEvent}>Add Event</Button>
          <p style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}>Click the button above to add a new event. Your event will be displayed once approved by the admin.</p>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
