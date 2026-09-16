import { useState, useMemo } from 'react';
import iconsData from './icons-database.json';

export default function IconPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVariant, setSelectedVariant] = useState('outline');
  
  // Customization controls
  const [iconColor, setIconColor] = useState('#000000');
  const [iconSize, setIconSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [selectedAnimation, setSelectedAnimation] = useState('none');
  
  // Feedback states
  const [copiedId, setCopiedId] = useState(null);
  const [showCssModal, setShowCssModal] = useState(false);

  // Filter categories dynamically
  const categories = useMemo(() => {
    const set = new Set(iconsData.icons.map((i) => i.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered Icons calculation
  const filteredIcons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return iconsData.icons.filter((icon) => {
      const matchesCategory =
        selectedCategory === 'all' || icon.category === selectedCategory;
      const matchesSearch =
        !query ||
        icon.name.toLowerCase().includes(query) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Construct raw SVG HTML string
  const getSvgMarkup = (icon) => {
    const innerContent =
      icon.variants[selectedVariant] || icon.variants.outline || '';
    const animClass =
      selectedAnimation !== 'none' ? ` class="icon-anim-${selectedAnimation}"` : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="${icon.defaultProps.viewBox}" fill="${icon.defaultProps.fill}" stroke="${iconColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${animClass}>${innerContent}</svg>`;
  };

  // Copy SVG string to clipboard
  const handleCopySvg = (icon) => {
    const markup = getSvgMarkup(icon);
    navigator.clipboard.writeText(markup);
    setCopiedId(icon.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Generate FontAwesome-like CSS Extension
  const generateCssBundle = () => {
    let css = `/* Icon Portal FontAwesome-style CSS Extension */\n`;
    css += `.portal-icon {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke: currentColor;\n  fill: none;\n  vertical-align: -0.125em;\n}\n\n`;
    css += `/* Animations */\n`;
    css += `@keyframes spin { 100% { transform: rotate(360deg); } }\n`;
    css += `@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }\n`;
    css += `@keyframes shake { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }\n\n`;
    css += `.icon-anim-spin { animation: spin 2s linear infinite; transform-origin: center; }\n`;
    css += `.icon-anim-bounce { animation: bounce 1s ease infinite; transform-origin: center; }\n`;
    css += `.icon-anim-shake { animation: shake 0.5s ease infinite; transform-origin: center; }\n\n`;

    iconsData.icons.forEach((icon) => {
      const svg = getSvgMarkup(icon);
      const encodedSvg = encodeURIComponent(svg)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');
      css += `.pi-${icon.id} {\n  background: url("data:image/svg+xml,${encodedSvg}") no-repeat center / contain;\n  display: inline-block;\n  width: ${iconSize}px;\n  height: ${iconSize}px;\n}\n`;
    });

    return css;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="active1" style={{ fontSize: '1.8rem' }}>
          SVG Icon Portal
        </h1>
        <p className="sdescription">
          Search, customize, copy vector code, or export CSS classes to use icons like Font Awesome.
        </p>
      </header>

      {/* Control Bar: Search & Global Filters */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search icons by name or tag (e.g. search, user, mail)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1 1 300px',
            padding: '10px 14px',
            borderRadius: 'var(--global-radius)',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: 'var(--global-radius)', border: '1px solid #ccc' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          className="contactButton summarizeButton"
          onClick={() => setShowCssModal(true)}
          style={{ padding: '10px 16px', width: 'auto', cursor: 'pointer' }}
        >
          Export index.css Bundle
        </button>
      </div>

      {/* Customization Toolbar */}
      <div className="navcenter" style={{ gap: '15px', flexWrap: 'wrap', padding: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>Color:</label>
          <input
            type="color"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '32px', height: '32px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>Size: {iconSize}px</label>
          <input
            type="range"
            min="16"
            max="64"
            value={iconSize}
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>Stroke: {strokeWidth}px</label>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.5"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>Animation:</label>
          <select
            value={selectedAnimation}
            onChange={(e) => setSelectedAnimation(e.target.value)}
            style={{ borderRadius: '6px', padding: '4px 8px' }}
          >
            <option value="none">None</option>
            <option value="spin">Spin</option>
            <option value="bounce">Bounce</option>
            <option value="shake">Shake</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>Style:</label>
          <button
            style={{ padding: '4px 10px', borderRadius: '6px', background: selectedVariant === 'outline' ? '#333' : '#eee', color: selectedVariant === 'outline' ? '#fff' : '#000' }}
            onClick={() => setSelectedVariant('outline')}
          >
            Outline
          </button>
          <button
            style={{ padding: '4px 10px', borderRadius: '6px', background: selectedVariant === 'solid' ? '#333' : '#eee', color: selectedVariant === 'solid' ? '#fff' : '#000' }}
            onClick={() => setSelectedVariant('solid')}
          >
            Solid
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '15px',
        }}
      >
        {filteredIcons.map((icon) => (
          <div
            key={icon.id}
            className="informationPill clickable childGrown"
            onClick={() => handleCopySvg(icon)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 10px',
              cursor: 'pointer',
              position: 'relative',
              textAlign: 'center',
              color: '#333',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div
              style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              dangerouslySetInnerHTML={{ __html: getSvgMarkup(icon) }}
            />
            <span style={{ fontSize: '0.75rem', marginTop: '10px', fontWeight: 500, wordBreak: 'break-word' }}>
              {icon.name}
            </span>

            {copiedId === icon.id && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,128,0,0.85)',
                  color: '#fff',
                  borderRadius: 'var(--global-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                }}
              >
                Copied SVG!
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p className="sdescription">No icons found matching "{searchQuery}".</p>
        </div>
      )}

      {/* Modal for CSS Extension Export */}
      {showCssModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="informationPill"
            style={{
              backgroundColor: '#fff',
              maxWidth: '700px',
              width: '90%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Append to index.css</h3>
            <p className="sdescription" style={{ marginBottom: '10px' }}>
              Copy this CSS snippet into your <code>index.css</code> file. You can then use icons in HTML like Font Awesome: <code>&lt;i class="pi-hero-magnifying-glass"&gt;&lt;/i&gt;</code>.
            </p>
            <textarea
              readOnly
              value={generateCssBundle()}
              style={{
                width: '100%',
                flex: 1,
                minHeight: '250px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
              <button
                className="contactButton"
                onClick={() => {
                  navigator.clipboard.writeText(generateCssBundle());
                  alert('CSS bundle copied to clipboard!');
                }}
                style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#1d4ed8' }}
              >
                Copy CSS
              </button>
              <button
                className="contactButton"
                onClick={() => setShowCssModal(false)}
                style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#666' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}