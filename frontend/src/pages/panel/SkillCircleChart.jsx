import React from 'react'


function SkillCircleChart() {
    const numSkills = 6;
    const numLevels = 5;
    const diameter = 200;
    const radius = diameter / 2;
    const center = radius + 10; // Adjust the center coordinates based on the desired position
  
    const calculatePointCoordinates = (angle, distance) => {
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      return { x, y };
    };
  
    return (
      <svg width={diameter + 20} height={diameter + 20}>
        <circle cx={center} cy={center} r={radius} fill="lightgray" stroke="black" strokeWidth={1} />
  
        {/* Render the skill points on each line */}
        {Array.from({ length: numSkills }).map((_, skillIndex) => {
          const angle = (skillIndex / numSkills) * 2 * Math.PI;
          const { x: skillX, y: skillY } = calculatePointCoordinates(angle, radius);
  
          return (
            <React.Fragment key={skillIndex}>
              {/* Render the skill points on each line */}
              {Array.from({ length: numLevels }).map((_, levelIndex) => {
                const levelDistance = radius - (levelIndex / (numLevels - 1)) * radius;
                const { x: pointX, y: pointY } = calculatePointCoordinates(angle, levelDistance);
  
                const isOnCircle = levelIndex === 0; // Check if the point is on the circle
  
                return (
                  <circle
                    key={levelIndex}
                    cx={pointX}
                    cy={pointY}
                    r={isOnCircle ? 4 : 2} // Increase the point width on the circles
                    fill="black"
                  />
                );
              })}
  
              {/* Connect the skill points with a line */}
              <line
                x1={center}
                y1={center}
                x2={skillX}
                y2={skillY}
                stroke="black"
                strokeWidth={1}
                opacity={0.5}
              />
            </React.Fragment>
          );
        })}
      </svg>
    );
  }
  
  export default SkillCircleChart;