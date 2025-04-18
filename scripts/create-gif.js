#!/usr/bin/env node

const plotly = require('plotly.js-dist');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../apps/paywall-site/public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Demo data for waterfall chart
const data = [
  {
    name: 'Previous MRR',
    y: [5100],
    type: 'bar',
    marker: {
      color: '#3B82F6',
    },
  },
  {
    name: 'New',
    y: [2400],
    type: 'bar',
    marker: {
      color: '#10B981',
    },
  },
  {
    name: 'Expansion',
    y: [800],
    type: 'bar',
    marker: {
      color: '#10B981',
    },
  },
  {
    name: 'Churn',
    y: [-600],
    type: 'bar',
    marker: {
      color: '#EF4444',
    },
  },
  {
    name: 'Contraction',
    y: [-400],
    type: 'bar',
    marker: {
      color: '#EF4444',
    },
  },
  {
    name: 'Current MRR',
    y: [7300],
    type: 'bar',
    marker: {
      color: '#3B82F6',
    },
  },
];

// Layout configuration
const layout = {
  title: 'Monthly Recurring Revenue (MRR) Waterfall',
  titlefont: {
    size: 20,
    family: 'Arial, sans-serif',
    color: '#333',
  },
  xaxis: {
    type: 'category',
    title: '',
    automargin: true,
  },
  yaxis: {
    title: 'MRR ($)',
    automargin: true,
    tickprefix: '$',
    ticksuffix: '',
  },
  waterfallgap: 0.3,
  plot_bgcolor: '#F9FAFB',
  paper_bgcolor: '#F9FAFB',
  autosize: false,
  width: 800,
  height: 500,
  margin: {
    l: 60,
    r: 60,
    b: 60,
    t: 80,
    pad: 4,
  },
  showlegend: false,
  annotations: [
    {
      x: 5,
      y: 7700,
      text: '+$2,200 (+43%)',
      showarrow: true,
      arrowhead: 2,
      arrowsize: 1,
      arrowwidth: 2,
      arrowcolor: '#10B981',
      font: {
        size: 14,
        color: '#10B981',
      },
      ax: 0,
      ay: -40,
    },
  ],
};

// Generate frames for the animation
async function generateFrames() {
  const frames = 20;
  const encodedFrames = [];
  
  // Create a canvas for rendering
  const canvas = createCanvas(800, 500);
  const ctx = canvas.getContext('2d');
  
  // Create a GIF encoder
  const encoder = new GIFEncoder(800, 500);
  encoder.start();
  encoder.setRepeat(0);  // 0 = repeat forever
  encoder.setDelay(100); // Frame delay in ms
  encoder.setQuality(10); // Image quality
  
  // Generate frames with different data to create animation
  for (let i = 0; i < frames; i++) {
    const factor = i / (frames - 1);
    
    // Animate the bars growing from 0 to their full height
    const animatedData = data.map(bar => ({
      ...bar,
      y: [bar.y[0] * factor],
    }));
    
    // Special case for final bar (should grow after others)
    if (i < frames / 2) {
      animatedData[5].y = [0];
    } else {
      const secondFactor = (i - frames / 2) / (frames / 2);
      animatedData[5].y = [data[5].y[0] * secondFactor];
    }
    
    // Generate a static image for this frame
    const figure = { data: animatedData, layout };
    const imgData = await plotly.toImage(figure, { format: 'png', width: 800, height: 500 });
    
    // Convert the image data to a buffer
    const imgBuffer = Buffer.from(imgData.split(',')[1], 'base64');
    
    // Create an Image from the buffer
    const img = new Image();
    img.src = imgBuffer;
    
    // Draw the image on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    
    // Add the frame to the GIF
    encoder.addFrame(ctx);
  }
  
  // Finalize the GIF
  encoder.finish();
  
  // Save the GIF
  const gifBuffer = encoder.out.getData();
  fs.writeFileSync(path.join(outputDir, 'demo-waterfall.gif'), gifBuffer);
  
  console.log('GIF generated successfully at:', path.join(outputDir, 'demo-waterfall.gif'));
}

// Execute the function
generateFrames().catch(err => {
  console.error('Error generating GIF:', err);
  process.exit(1);
}); 