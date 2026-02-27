import { useState } from 'react';
import { ChevronDown, Settings, Eye, EyeOff, Info, ChevronLeft, ChevronRight, Lightbulb, Calculator } from 'lucide-react';

interface Lens {
  id: string;
  name: string;
  throwRatio: string;
  zoomRange: string;
}

interface Projector {
  id: string;
  name: string;
  resolution: string;
  brightness: string;
  lenses: Lens[];
}

interface Brand {
  id: string;
  name: string;
  projectors: Projector[];
}

const BRANDS_DATA: Brand[] = [
  {
    id: 'barco',
    name: 'Barco',
    projectors: [
      {
        id: 'barco-uhd',
        name: 'UDX-4K32',
        resolution: '4096 x 2160',
        brightness: '31,000 lumens',
        lenses: [
          { id: 'tld-0.38', name: 'TLD+ 0.38:1', throwRatio: '0.38:1', zoomRange: 'Fixed' },
          { id: 'tld-0.75-1.16', name: 'TLD+ 0.75-1.16:1', throwRatio: '0.75-1.16:1', zoomRange: '1.55x' },
          { id: 'tld-1.16-1.49', name: 'TLD+ 1.16-1.49:1', throwRatio: '1.16-1.49:1', zoomRange: '1.28x' }
        ]
      },
      {
        id: 'barco-wuxga',
        name: 'HDX-W20',
        resolution: '1920 x 1200',
        brightness: '20,000 lumens',
        lenses: [
          { id: 'tld-0.73-0.95', name: 'TLD 0.73-0.95:1', throwRatio: '0.73-0.95:1', zoomRange: '1.3x' },
          { id: 'tld-1.45-2.17', name: 'TLD 1.45-2.17:1', throwRatio: '1.45-2.17:1', zoomRange: '1.5x' }
        ]
      }
    ]
  },
  {
    id: 'christie',
    name: 'Christie',
    projectors: [
      {
        id: 'christie-4k',
        name: 'Boxer 4K30',
        resolution: '4096 x 2160',
        brightness: '30,000 lumens',
        lenses: [
          { id: 'chr-0.67-0.9', name: 'Wide 0.67-0.9:1', throwRatio: '0.67-0.9:1', zoomRange: '1.34x' },
          { id: 'chr-0.9-1.16', name: 'Short 0.9-1.16:1', throwRatio: '0.9-1.16:1', zoomRange: '1.29x' },
          { id: 'chr-1.16-1.49', name: 'Medium 1.16-1.49:1', throwRatio: '1.16-1.49:1', zoomRange: '1.28x' }
        ]
      },
      {
        id: 'christie-hd',
        name: 'D20HD-HS',
        resolution: '1920 x 1080',
        brightness: '20,000 lumens',
        lenses: [
          { id: 'chr-0.73-0.89', name: 'Wide 0.73-0.89:1', throwRatio: '0.73-0.89:1', zoomRange: '1.22x' },
          { id: 'chr-1.5-2.0', name: 'Standard 1.5-2.0:1', throwRatio: '1.5-2.0:1', zoomRange: '1.33x' }
        ]
      }
    ]
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    projectors: [
      {
        id: 'pana-4k',
        name: 'PT-RQ35K',
        resolution: '4096 x 2160',
        brightness: '35,000 lumens',
        lenses: [
          { id: 'pan-0.8-1.0', name: 'ET-DLE055 0.8-1.0:1', throwRatio: '0.8-1.0:1', zoomRange: '1.25x' },
          { id: 'pan-1.0-1.3', name: 'ET-DLE150 1.0-1.3:1', throwRatio: '1.0-1.3:1', zoomRange: '1.3x' },
          { id: 'pan-1.3-1.8', name: 'ET-DLE250 1.3-1.8:1', throwRatio: '1.3-1.8:1', zoomRange: '1.38x' }
        ]
      }
    ]
  },
  {
    id: 'epson',
    name: 'Epson',
    projectors: [
      {
        id: 'epson-pro',
        name: 'EB-PU1007B',
        resolution: '1920 x 1200',
        brightness: '7,000 lumens',
        lenses: [
          { id: 'eps-0.35', name: 'ELPLX02 0.35:1', throwRatio: '0.35:1', zoomRange: 'Fixed' },
          { id: 'eps-1.44-2.32', name: 'ELPLU03 1.44-2.32:1', throwRatio: '1.44-2.32:1', zoomRange: '1.61x' }
        ]
      }
    ]
  }
];

export function ProjectorManager() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProjector, setSelectedProjector] = useState<Projector | null>(null);
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  
  const [shiftVertical, setShiftVertical] = useState(0);
  const [shiftHorizontal, setShiftHorizontal] = useState(0);
  const [zoom, setZoom] = useState(100);
  
  const [imageWidth, setImageWidth] = useState(1920);
  const [imageHeight, setImageHeight] = useState(1080);
  const [distance, setDistance] = useState(5000);
  
  // Light parameters
  const [lightIntensity, setLightIntensity] = useState(100);
  const [lightColor, setLightColor] = useState('#ffffff');
  const [lightTemperature, setLightTemperature] = useState(6500);
  
  // Texture
  const [texturePath, setTexturePath] = useState('');
  
  // Projector name
  const [projectorName, setProjectorName] = useState('Projecteur 1');
  
  // Calculation fields
  const [calcMode, setCalcMode] = useState<'LW' | 'L' | 'PS' | 'Lux'>('LW');
  const [projectionWidth, setProjectionWidth] = useState(3000); // LW
  const [throwDistance, setThrowDistance] = useState(5000); // L
  const [pixelSize, setPixelSize] = useState(0); // PS
  const [luxValue, setLuxValue] = useState(0); // Lux
  
  // Display options
  const [showCone, setShowCone] = useState(true);
  const [showZoomRange, setShowZoomRange] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(true);
  
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showCalculations, setShowCalculations] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [showFormulas, setShowFormulas] = useState(false);

  const handleBrandChange = (brandId: string) => {
    const brand = BRANDS_DATA.find(b => b.id === brandId) || null;
    setSelectedBrand(brand);
    setSelectedProjector(null);
    setSelectedLens(null);
  };

  const handleProjectorChange = (projectorId: string) => {
    const projector = selectedBrand?.projectors.find(p => p.id === projectorId) || null;
    setSelectedProjector(projector);
    setSelectedLens(null);
  };

  const handleLensChange = (lensId: string) => {
    const lens = selectedProjector?.lenses.find(l => l.id === lensId) || null;
    setSelectedLens(lens);
  };

  const calculateProjectionSize = () => {
    if (!selectedLens || !distance) return null;
    
    const throwRatioMatch = selectedLens.throwRatio.match(/(\d+\.?\d*)/);
    if (!throwRatioMatch) return null;
    
    const throwRatio = parseFloat(throwRatioMatch[1]);
    const projectedWidth = distance / (throwRatio * (zoom / 100));
    const aspectRatio = imageWidth / imageHeight;
    const projectedHeight = projectedWidth / aspectRatio;
    
    return {
      width: Math.round(projectedWidth),
      height: Math.round(projectedHeight)
    };
  };

  const projectionSize = calculateProjectionSize();
  const aspectRatio = (imageWidth / imageHeight).toFixed(2);

  return (
    <div className="h-screen flex flex-col bg-[#2a2a2a] max-w-md mx-auto">
      {/* Header */}
      <header className="bg-[#1e1e1e] border-b border-[#3a3a3a] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-white">Projection Mapping</h1>
            <p className="text-xs text-gray-400">Cinema 4D Plugin</p>
          </div>
          <Settings className="text-gray-400" size={20} />
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="space-y-3 p-4">
          
          {/* Projector Selection */}
          <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
            <h2 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-blue-500 rounded"></span>
              Projecteur
            </h2>
            
            <div className="space-y-3">
              {/* Projector Name */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nom</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={projectorName}
                    onChange={(e) => setProjectorName(e.target.value)}
                    className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 hover:bg-[#3a3a3a] transition-colors">
                    <ChevronLeft className="text-gray-400" size={16} />
                  </button>
                  <button className="bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 hover:bg-[#3a3a3a] transition-colors">
                    <ChevronRight className="text-gray-400" size={16} />
                  </button>
                </div>
              </div>

              {/* Brand Selection */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Marque</label>
                <div className="relative">
                  <select
                    value={selectedBrand?.id || ''}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choisir...</option>
                    {BRANDS_DATA.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Projector Model Selection */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Modèle</label>
                <div className="relative">
                  <select
                    value={selectedProjector?.id || ''}
                    onChange={(e) => handleProjectorChange(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Choisir...</option>
                    {selectedBrand?.projectors.map(projector => (
                      <option key={projector.id} value={projector.id}>{projector.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Lens Selection */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Lentille</label>
                <div className="relative">
                  <select
                    value={selectedLens?.id || ''}
                    onChange={(e) => handleLensChange(e.target.value)}
                    disabled={!selectedProjector}
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Choisir...</option>
                    {selectedProjector?.lenses.map(lens => (
                      <option key={lens.id} value={lens.id}>{lens.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* Projector Specs */}
          {showSpecs && selectedProjector && (
            <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="w-0.5 h-4 bg-green-500 rounded"></span>
                  Spécifications
                </h2>
                <button
                  onClick={() => setShowSpecs(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <EyeOff size={14} />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs py-1.5">
                  <span className="text-gray-400">Résolution</span>
                  <span className="text-white font-medium">{selectedProjector.resolution}</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1.5">
                  <span className="text-gray-400">Luminosité</span>
                  <span className="text-white font-medium">{selectedProjector.brightness}</span>
                </div>
                {selectedLens && (
                  <>
                    <div className="flex justify-between items-center text-xs py-1.5">
                      <span className="text-gray-400">Throw Ratio</span>
                      <span className="text-white font-medium">{selectedLens.throwRatio}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1.5">
                      <span className="text-gray-400">Zoom</span>
                      <span className="text-white font-medium">{selectedLens.zoomRange}</span>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Image Parameters */}
          <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
            <h2 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-purple-500 rounded"></span>
              Paramètres
            </h2>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Largeur (mm)</label>
                  <input
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(Number(e.target.value))}
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Hauteur (mm)</label>
                  <input
                    type="number"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(Number(e.target.value))}
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Distance (mm)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Texture</label>
                <input
                  type="text"
                  value={texturePath}
                  onChange={(e) => setTexturePath(e.target.value)}
                  placeholder="Chemin de la texture..."
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <Info size={12} />
              <span>Ratio: {aspectRatio}:1</span>
            </div>
          </section>

          {/* Light Parameters */}
          <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
            <h2 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-amber-500 rounded"></span>
              <Lightbulb size={12} className="text-amber-400" />
              Lumière
            </h2>
            
            <div className="space-y-3">
              {/* Light Intensity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400">Intensité</label>
                  <span className="text-xs text-white font-mono">{lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(Number(e.target.value))}
                  className="w-full h-1.5 accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Light Color */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Couleur</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-10 h-9 bg-[#2a2a2a] border border-[#3a3a3a] rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Color Temperature */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Temp. (K)</label>
                  <input
                    type="number"
                    value={lightTemperature}
                    onChange={(e) => setLightTemperature(Number(e.target.value))}
                    step="100"
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Lens Adjustments */}
          {showAdvanced && selectedLens && (
            <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="w-0.5 h-4 bg-orange-500 rounded"></span>
                  Réglages
                </h2>
                <button
                  onClick={() => setShowAdvanced(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <EyeOff size={14} />
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Shift Vertical */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400">Shift Vertical</label>
                    <span className="text-xs text-white font-mono">{shiftVertical}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={shiftVertical}
                    onChange={(e) => setShiftVertical(Number(e.target.value))}
                    className="w-full h-1.5 accent-blue-500"
                  />
                </div>

                {/* Shift Horizontal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400">Shift Horizontal</label>
                    <span className="text-xs text-white font-mono">{shiftHorizontal}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={shiftHorizontal}
                    onChange={(e) => setShiftHorizontal(Number(e.target.value))}
                    className="w-full h-1.5 accent-blue-500"
                  />
                </div>

                {/* Zoom */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400">Zoom</label>
                    <span className="text-xs text-white font-mono">{zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1.5 accent-blue-500"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Calculations & Feasibility */}
          {showCalculations && projectionSize && (
            <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="w-0.5 h-4 bg-cyan-500 rounded"></span>
                  <Calculator size={12} className="text-cyan-400" />
                  Calculs Avancés
                </h2>
                <button
                  onClick={() => setShowCalculations(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <EyeOff size={14} />
                </button>
              </div>
              
              {/* Calculation Mode Selector */}
              <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-2">Calculer:</label>
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={() => setCalcMode('LW')}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      calcMode === 'LW'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                    }`}
                  >
                    LW
                  </button>
                  <button
                    onClick={() => setCalcMode('L')}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      calcMode === 'L'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                    }`}
                  >
                    L
                  </button>
                  <button
                    onClick={() => setCalcMode('PS')}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      calcMode === 'PS'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                    }`}
                  >
                    PS
                  </button>
                  <button
                    onClick={() => setCalcMode('Lux')}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      calcMode === 'Lux'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                    }`}
                  >
                    Lux
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* LW - Largeur Projection */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    LW - Largeur Projection (mm)
                    {calcMode === 'LW' && <span className="ml-1 text-cyan-400">→ Calculé</span>}
                  </label>
                  <input
                    type="number"
                    value={projectionWidth}
                    onChange={(e) => setProjectionWidth(Number(e.target.value))}
                    readOnly={calcMode === 'LW'}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
                      calcMode === 'LW'
                        ? 'bg-[#1a1a1a] border-cyan-500/50 text-cyan-400 font-mono'
                        : 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
                    }`}
                  />
                </div>

                {/* L - Distance Throw */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    L - Distance Throw (mm)
                    {calcMode === 'L' && <span className="ml-1 text-cyan-400">→ Calculé</span>}
                  </label>
                  <input
                    type="number"
                    value={throwDistance}
                    onChange={(e) => setThrowDistance(Number(e.target.value))}
                    readOnly={calcMode === 'L'}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
                      calcMode === 'L'
                        ? 'bg-[#1a1a1a] border-cyan-500/50 text-cyan-400 font-mono'
                        : 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
                    }`}
                  />
                </div>

                {/* PS - Pixel Size */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    PS - Pixel Size (mm)
                    {calcMode === 'PS' && <span className="ml-1 text-cyan-400">→ Calculé</span>}
                  </label>
                  <input
                    type="number"
                    value={pixelSize.toFixed(3)}
                    onChange={(e) => setPixelSize(Number(e.target.value))}
                    readOnly={calcMode === 'PS'}
                    step="0.001"
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
                      calcMode === 'PS'
                        ? 'bg-[#1a1a1a] border-cyan-500/50 text-cyan-400 font-mono'
                        : 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
                    }`}
                  />
                </div>

                {/* Lux - Luminosité */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Lux - Luminosité sur surface (lux)
                    {calcMode === 'Lux' && <span className="ml-1 text-cyan-400">→ Calculé</span>}
                  </label>
                  <input
                    type="number"
                    value={luxValue.toFixed(2)}
                    onChange={(e) => setLuxValue(Number(e.target.value))}
                    readOnly={calcMode === 'Lux'}
                    step="0.01"
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
                      calcMode === 'Lux'
                        ? 'bg-[#1a1a1a] border-cyan-500/50 text-cyan-400 font-mono'
                        : 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="mt-3 p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                <p className="text-[10px] text-cyan-300">
                  <strong>Mode:</strong> Les champs en lecture seule sont calculés automatiquement selon le mode sélectionné.
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between bg-[#2a2a2a] rounded p-2.5">
                <span className="text-xs text-gray-300">Status:</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Faisable
                </span>
              </div>
            </section>
          )}

          {/* Display Options */}
          <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
            <h2 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-yellow-500 rounded"></span>
              Affichage Viewport
            </h2>
            
            <div className="space-y-2">
              <label className="flex items-center justify-between px-3 py-2 bg-[#2a2a2a] rounded cursor-pointer hover:bg-[#333333] transition-colors">
                <span className="text-xs text-gray-300">Cône de Projection</span>
                <input
                  type="checkbox"
                  checked={showCone}
                  onChange={(e) => setShowCone(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between px-3 py-2 bg-[#2a2a2a] rounded cursor-pointer hover:bg-[#333333] transition-colors">
                <span className="text-xs text-gray-300">Range de Zoom</span>
                <input
                  type="checkbox"
                  checked={showZoomRange}
                  onChange={(e) => setShowZoomRange(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between px-3 py-2 bg-[#2a2a2a] rounded cursor-pointer hover:bg-[#333333] transition-colors">
                <span className="text-xs text-gray-300">Visibilité Caméra</span>
                <input
                  type="checkbox"
                  checked={cameraVisible}
                  onChange={(e) => setCameraVisible(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>
            </div>
          </section>

          {/* Formula Info */}
          {showFormulas && selectedLens && (
            <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="w-0.5 h-4 bg-pink-500 rounded"></span>
                  Formules
                </h2>
                <button
                  onClick={() => setShowFormulas(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <EyeOff size={14} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[#2a2a2a] rounded p-3">
                  <p className="text-xs text-gray-400 mb-2">Throw Distance</p>
                  <code className="text-xs text-cyan-400 font-mono block">
                    D = W × TR × (Z / 100)
                  </code>
                  <p className="text-[10px] text-gray-500 mt-2">
                    D: Distance, W: Largeur, TR: Throw Ratio, Z: Zoom
                  </p>
                </div>

                <div className="bg-[#2a2a2a] rounded p-3">
                  <p className="text-xs text-gray-400 mb-2">Largeur Projetée</p>
                  <code className="text-xs text-cyan-400 font-mono block">
                    W = D / (TR × (Z / 100))
                  </code>
                </div>

                <div className="bg-[#2a2a2a] rounded p-3">
                  <p className="text-xs text-gray-400 mb-2">Hauteur Projetée</p>
                  <code className="text-xs text-cyan-400 font-mono block">
                    H = W / AspectRatio
                  </code>
                </div>
              </div>
            </section>
          )}

          {/* Sections Toggle */}
          <section className="bg-[#1e1e1e] border border-[#3a3a3a] rounded p-3">
            <h2 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-gray-500 rounded"></span>
              Sections
            </h2>
            
            <div className="space-y-2">
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  showSpecs 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                }`}
              >
                <span>Spécifications</span>
                {showSpecs ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  showAdvanced 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                }`}
              >
                <span>Réglages Avancés</span>
                {showAdvanced ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              
              <button
                onClick={() => setShowCalculations(!showCalculations)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  showCalculations 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                }`}
              >
                <span>Calculs</span>
                {showCalculations ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              
              <button
                onClick={() => setShowFormulas(!showFormulas)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  showFormulas 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                }`}
              >
                <span>Formules</span>
                {showFormulas ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e1e1e] border-t border-[#3a3a3a] px-4 py-2.5">
        <div className="text-center">
          <span className="text-xs text-gray-400 block truncate">
            {selectedProjector ? `${selectedBrand?.name} ${selectedProjector.name}` : 'Aucun projecteur'}
          </span>
        </div>
      </footer>
    </div>
  );
}