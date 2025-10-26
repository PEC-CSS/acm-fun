import React, { useState, useRef, useEffect } from 'react';
import '../../styles/pages/games/MemeCaptionMaker.css';

const MemeCaptionMaker = () => {
  const [image, setImage] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const fonts = ['Impact', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Verdana'];
  const sampleImages = [
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/1bij.jpg',
    'https://i.imgflip.com/1g8my4.jpg',
    'https://i.imgflip.com/26am.jpg'
  ];

  useEffect(() => {
    if (image) {
      drawMeme();
    }
  }, [image, captions]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setCaptions([]);
          setSelectedCaption(null);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleImage = (url) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      setCaptions([]);
      setSelectedCaption(null);
    };
    img.src = url;
  };

  const addCaption = () => {
    const newCaption = {
      id: Date.now(),
      text: 'Your Caption Here',
      x: 50,
      y: captions.length === 0 ? 10 : 90,
      fontSize: 40,
      fontFamily: 'Impact',
      color: '#FFFFFF',
      outlineColor: '#000000',
      outlineWidth: 3
    };
    setCaptions([...captions, newCaption]);
    setSelectedCaption(newCaption.id);
  };

  const updateCaption = (id, updates) => {
    setCaptions(captions.map(cap => 
      cap.id === id ? { ...cap, ...updates } : cap
    ));
  };

  const deleteCaption = (id) => {
    setCaptions(captions.filter(cap => cap.id !== id));
    if (selectedCaption === id) {
      setSelectedCaption(null);
    }
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    captions.forEach(caption => {
      ctx.font = `${caption.fontSize}px ${caption.fontFamily}`;
      ctx.fillStyle = caption.color;
      ctx.strokeStyle = caption.outlineColor;
      ctx.lineWidth = caption.outlineWidth;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const maxWidth = canvas.width * 0.9;
      const words = caption.text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      const x = (canvas.width * caption.x) / 100;
      const y = (canvas.height * caption.y) / 100;
      const lineHeight = caption.fontSize * 1.2;

      lines.forEach((line, index) => {
        const lineY = y + (index * lineHeight);
        ctx.strokeText(line, x, lineY);
        ctx.fillText(line, x, lineY);
      });
    });
  };

  const handleMouseDown = (e, captionId) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const caption = captions.find(c => c.id === captionId);
    
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setDragOffset({
      x: mouseX - caption.x,
      y: mouseY - caption.y
    });
    setSelectedCaption(captionId);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedCaption) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    updateCaption(selectedCaption, {
      x: Math.max(0, Math.min(100, mouseX - dragOffset.x)),
      y: Math.max(0, Math.min(100, mouseY - dragOffset.y))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e, captionId) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const caption = captions.find(c => c.id === captionId);
    
    const touchX = ((touch.clientX - rect.left) / rect.width) * 100;
    const touchY = ((touch.clientY - rect.top) / rect.height) * 100;

    setDragOffset({
      x: touchX - caption.x,
      y: touchY - caption.y
    });
    setSelectedCaption(captionId);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !selectedCaption) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    
    const touchX = ((touch.clientX - rect.left) / rect.width) * 100;
    const touchY = ((touch.clientY - rect.top) / rect.height) * 100;

    updateCaption(selectedCaption, {
      x: Math.max(0, Math.min(100, touchX - dragOffset.x)),
      y: Math.max(0, Math.min(100, touchY - dragOffset.y))
    });
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const selectedCaptionData = captions.find(c => c.id === selectedCaption);

  return (
    <div className="meme-maker-container">
      <h1 className="meme-title">🎭 Meme Caption Maker</h1>
      
      <div className="meme-content">
        <div className="meme-canvas-section">
          {!image ? (
            <div className="upload-section">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button 
                className="upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="icon">📷</span>
                Upload Image
              </button>
              
              <div className="sample-images">
                <p>Or choose a sample:</p>
                <div className="sample-grid">
                  {sampleImages.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Sample ${index + 1}`}
                      onClick={() => handleSampleImage(url)}
                      className="sample-image"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="canvas-wrapper"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <canvas 
                ref={canvasRef}
                className="meme-canvas"
              />
              {captions.map(caption => (
                <div
                  key={caption.id}
                  className={`caption-handle ${selectedCaption === caption.id ? 'selected' : ''}`}
                  style={{
                    left: `${caption.x}%`,
                    top: `${caption.y}%`
                  }}
                  onMouseDown={(e) => handleMouseDown(e, caption.id)}
                  onTouchStart={(e) => handleTouchStart(e, caption.id)}
                >
                  <span className="icon">✋</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="controls-section">
            <div className="action-buttons">
              <button className="control-btn add-btn" onClick={addCaption}>
                <span className="icon">➕</span>
                Add Caption
              </button>
              <button className="control-btn download-btn" onClick={downloadMeme}>
                <span className="icon">💾</span>
                Download
              </button>
              <button 
                className="control-btn change-btn" 
                onClick={() => fileInputRef.current.click()}
              >
                <span className="icon">🖼️</span>
                Change Image
              </button>
            </div>

            {selectedCaptionData && (
              <div className="caption-editor">
                <h3>Edit Caption</h3>
                
                <div className="editor-group">
                  <label>
                    <span className="icon">✏️</span>
                    Text
                  </label>
                  <textarea
                    value={selectedCaptionData.text}
                    onChange={(e) => updateCaption(selectedCaption, { text: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="editor-group">
                  <label>Font Family</label>
                  <select
                    value={selectedCaptionData.fontFamily}
                    onChange={(e) => updateCaption(selectedCaption, { fontFamily: e.target.value })}
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div className="editor-group">
                  <label>Font Size: {selectedCaptionData.fontSize}px</label>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={selectedCaptionData.fontSize}
                    onChange={(e) => updateCaption(selectedCaption, { fontSize: parseInt(e.target.value) })}
                  />
                </div>

                <div className="editor-row">
                  <div className="editor-group">
                    <label>
                      <span className="icon">🎨</span>
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={selectedCaptionData.color}
                      onChange={(e) => updateCaption(selectedCaption, { color: e.target.value })}
                    />
                  </div>

                  <div className="editor-group">
                    <label>Outline Color</label>
                    <input
                      type="color"
                      value={selectedCaptionData.outlineColor}
                      onChange={(e) => updateCaption(selectedCaption, { outlineColor: e.target.value })}
                    />
                  </div>
                </div>

                <div className="editor-group">
                  <label>Outline Width: {selectedCaptionData.outlineWidth}px</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={selectedCaptionData.outlineWidth}
                    onChange={(e) => updateCaption(selectedCaption, { outlineWidth: parseInt(e.target.value) })}
                  />
                </div>

                <button 
                  className="control-btn delete-btn"
                  onClick={() => deleteCaption(selectedCaption)}
                >
                  <span className="icon">🗑️</span>
                  Delete Caption
                </button>
              </div>
            )}

            {captions.length === 0 && (
              <div className="empty-state">
                <p>👆 Click "Add Caption" to start creating your meme!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeCaptionMaker;