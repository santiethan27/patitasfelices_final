import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import './EditImage.css';
import { toast } from 'sonner';

function EditImage({ options, setImgOrder }) {
  const secureUrls = options?.map(option => option.secure_url);
  const inputRef = useRef(null);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    editor?.canvas.setWidth(250);
    editor?.canvas.setHeight(300);
    if (secureUrls?.length > 0) {
      loadImage(secureUrls[0]);
      console.log(secureUrls);
    }
  }, [editor, options]);

  const resetCanvas = () => {
    editor?.canvas.clear();
    setImgOrder(null);
    loadImage(secureUrls[0]);
    toast.success('Imagen reseteado');
  }

  const loadImage = (imageUrl) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], "image.png", { type: "image/png" });
        const url = URL.createObjectURL(file);

        fabric.Image.fromURL(url, function (oImg) {
          const canvas = editor?.canvas;
          const canvasWidth = canvas?.getWidth();
          const canvasHeight = canvas?.getHeight();
          oImg.scaleToWidth(canvasWidth);
          const leftPosition = (canvasWidth - oImg.getScaledWidth()) / 2;

          oImg.set({
            left: leftPosition,
            top: (canvasHeight - oImg.getScaledHeight()) / 2,
            selectable: false
          });
          oImg.set({
            crossOrigin: 'anonymous'
          });
          editor?.canvas.clear();
          editor?.canvas.add(oImg);
        });
      })
      .catch(error => {
        console.error('Error al descargar la imagen:', error);
      });
  };



  const handlePic = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    fabric.Image.fromURL(url, (oImg) => {
      oImg.scale(0.2).set('flipX', true);
      editor?.canvas.add(oImg);
    });
  };
  const generateImage = () => {
    const canvas = editor?.canvas;

    // Aumentar la resolución del lienzo
    const originalWidth = canvas.getWidth();
    const originalHeight = canvas.getHeight();
    const scaleFactor = 2; // Factor de escala, ajusta según sea necesario
    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;

    // Establecer el fondo del lienzo como transparente
    canvas.backgroundColor = 'rgba(0, 0, 0, 0)';

    canvas.setDimensions({ width: scaledWidth, height: scaledHeight });

    // Escalar todos los objetos dentro del lienzo
    canvas.getObjects().forEach(obj => {
      obj.scaleX *= scaleFactor;
      obj.scaleY *= scaleFactor;
      obj.left *= scaleFactor;
      obj.top *= scaleFactor;
      obj.setCoords();
    });

    // Redibujar el lienzo con la nueva resolución
    canvas.renderAll();

    // Exportar la imagen con la mayor calidad posible
    const dataURL = canvas.toDataURL({ format: 'png', multiplier: scaleFactor, backgroundColor: 'rgba(0, 0, 0, 0)' });

    // Restaurar la resolución original del lienzo
    canvas.setDimensions({ width: originalWidth, height: originalHeight });

    // Restaurar los objetos a su tamaño y posición originales
    canvas.getObjects().forEach(obj => {
      obj.scaleX /= scaleFactor;
      obj.scaleY /= scaleFactor;
      obj.left /= scaleFactor;
      obj.top /= scaleFactor;
      obj.setCoords();
    });

    // Establecer la imagen exportada
    setImgOrder(dataURL);
    toast.success('Imagen guardada')
  };




  return (
    <article>
      <input
        ref={inputRef}
        onChange={handlePic}
        type="file"
        style={{ display: 'none' }}
        className="hidden"
      />
      <div className="image-list">
        {secureUrls?.map((imageUrl, index) =>
        (
          <img
            key={index}
            src={imageUrl}
            alt={`Imagen ${index}`}
            className="color-image"
            onClick={() => loadImage(imageUrl)}
          />
        ))}
      </div>
      <div className="c-fabric">
        <FabricJSCanvas onReady={onReady} />
        <div className="e-buttons">
          <button className='bg-morado2 txt-white' onClick={() => inputRef.current?.click()}>
            Subir archivo
          </button>
          <button className='bg-morado2 txt-white' onClick={() => generateImage()}>
            Guardar
          </button>
          <button className='bg-morado2 txt-white' onClick={() => resetCanvas()}>
            Resetear
          </button>
        </div>
      </div>
    </article>
  );
}

export default EditImage;