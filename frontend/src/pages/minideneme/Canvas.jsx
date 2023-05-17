import React, { useRef, useState, useEffect } from "react";
import "./canvas.css";
import { fabric } from "fabric";

export default function Canvas({ canvasHandle }) {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();
  const [penWidth, setPenWidth] = useState(3);
  const [penColor, setPenColor] = useState("red");
  const [showWidth, setShowWidth] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [toggleEraser, setToggleEraser] = useState(false);
  const [canvasKaydet, setCanvasKaydet] = useState(false);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "rgb(247,246,241)",
      width: 800,
      height: 900,
      isDrawingMode: true,
      selectionLineWidth: 10,
    });
    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);
  
  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      changePenColor("black");
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      setPenColor(color);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  const clearCanvas = () => {
    if (fabricCanvas) {
      changePenColor("black");
      fabricCanvas.clear();
    }
  };
  const toggleErase = () => {
    if (fabricCanvas) {
      if (toggleEraser) {
        changePenColor("rgb(247,246,241)");
        setToggleEraser(false);
      } else {
        changePenColor("rgb(247,246,241)");
        setToggleEraser(true);
      }
    }
  };
  const saveCanvasToLocalStorage = () => {
    if (fabricCanvas) {
      const canvasData = JSON.stringify(fabricCanvas.toJSON());
      localStorage.setItem("canvasData", canvasData);
    }
    setCanvasKaydet(true)
  };

  const ShowWidth = () => {
    setShowWidth(!showWidth);
    const canvasData = localStorage.getItem("canvasData");
    if (canvasData) {
      fabricCanvas.loadFromJSON(canvasData, () => {
        fabricCanvas.renderAll();
      });
    }
  };
  const ShowColor = () => {
    setShowColor(!showColor);
  };

  return (
    <>
      <div className="canvasarea">
        <div className="canvastools">
          <button className="color-btn" onClick={ShowColor}></button>
          {showColor && (
            <input
              className="color-inp"
              type="color"
              onChange={(e) => changePenColor(e.target.value)}
              value={penColor}
            />
          )}
          <button className="pen-btn" onClick={ShowWidth}>
            Kalem
          </button>
          {showWidth && (
            <input
              className="width-inp"
              type="range"
              onChange={(e) => changePenWidth(e.target.value)}
              value={penWidth}
              min={1}
              max={30}
            />
          )}
          <button className="clear-btn" onClick={clearCanvas}>
            Temizle
          </button>
          <button className="erase-btn" onClick={toggleErase}>
            Sil
          </button>
          <button className="exit-btn" onClick={canvasHandle}>
            X
          </button>
          <button className="erase-btn" onClick={saveCanvasToLocalStorage}>
            Kaydet
          </button>
        </div>
        <div className="canvasboard">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
      {/* <div className="canvas-btn">
        <button onClick={getPen} className="btn-width">
          Pencil
        </button>
        <div className="btn-width">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <select
            className="btn-width"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <button onClick={clearCanvas} className="btn-width">
          Clear
        </button>
        <div>
          <button onClick={eraseCanvas} className="btn-width">
            Eras
          </button>
        </div>
      </div>
      <canvas
        style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
      /> */}
    </>
  );
}
