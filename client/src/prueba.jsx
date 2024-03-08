import React, { ChangeEvent, useEffect, useRef } from 'react';
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

function Prueba() {
  const inputRef = useRef(null);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    editor?.canvas.setHeight(500);
    editor?.canvas.setWidth(500);
    fabric.Image.fromURL('./gorra-negra.png', function (oImg) {
      const canvasHeight = editor?.canvas.getHeight(); // Obtener la altura del canvas
      oImg.scaleToHeight(canvasHeight);
      oImg.set({
        selectable: false // Bloquear la imagen para que no sea editable
      });
      editor?.canvas.add(oImg);
    });
  }, [fabric, editor]);

  const handlePic = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    fabric.Image.fromURL(url, (oImg) => {
      oImg.scale(0.1).set('flipX', true);
      editor?.canvas.add(oImg);
    });
  };

  const generateImage = () => {
    const dataURL = editor?.canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'image.png';
    a.href = dataURL;
    a.click();
  };

  return (
    <article    >
      <button
        onClick={() => inputRef.current?.click()}
        className="py-2 px-6 bg-yellow-500 text-white rounded-xl m-4"
      >
        subir archivo
      </button>
      <input
        ref={inputRef}
        onChange={handlePic}
        type="file"
        className="hidden"
      />
      <div className="rounded-xl border border-4 border-yellow-500 ">
        <FabricJSCanvas onReady={onReady} />
      </div>
      <button
        onClick={generateImage}
        className="py-2 px-6 bg-indigo-500 text-white rounded-xl m-4"
      >
        Generar archivo
      </button>
    </article>
  );
}

export default Prueba;

