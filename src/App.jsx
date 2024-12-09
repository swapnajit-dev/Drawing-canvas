import React, { useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color; // Set stroke color
    ctx.lineWidth = 2; // Set line width
    ctx.beginPath(); // Start a new path
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Set starting point
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Draw a line to the new point
    ctx.stroke(); // Make the line visible
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">🎨 Drawing Board</h1>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="border-4 border-gray-300 rounded-lg shadow-md mb-6 bg-gray-100"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <label htmlFor="colorPicker" className="text-lg font-medium text-gray-600">
              Choose Color:
            </label>
            <input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 p-1 border-2 border-gray-300 rounded-full shadow-md hover:shadow-lg"
            />
          </div>
          <button
            onClick={clearCanvas}
            className="px-8 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all"
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
