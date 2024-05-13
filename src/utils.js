export default function generateUniqueObjects(numObjects, minVal, maxVal) {
  // Create an empty array to store objects
  const uniqueObjects = [];

  // Calculate the range value (degrees per object)
  const rangeValue = 360 / numObjects;

  for (let i = 0; i < numObjects; i++) {
    // Loop until a unique number is found
    while (true) {
      const number = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      if (!uniqueObjects.some((obj) => obj.number === number)) {
        // Calculate minDegree and maxDegree based on range
        const minDegree = i === 0 ? 0 : i * rangeValue; // Handle first element
        const maxDegree =
          i === numObjects - 1 ? 360 : minDegree + rangeValue - 1;

        // Create object directly without "isActive" property
        uniqueObjects.push({
          number,
          minDegree,
          maxDegree,
        });
        break; // Exit the loop after finding a unique number
      }
    }
  }

  return uniqueObjects;
}
