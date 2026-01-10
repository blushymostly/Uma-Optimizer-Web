// Skill OCR Module
// Extracts skill names, costs, and hint discount levels from screenshots

(function() {
  'use strict';

  const OCR_OPTS = { lang: "eng", psm: 6 }; // 6 = block of text

  // Hint discount mapping: percentage -> level
  const HINT_DISCOUNT_TO_LEVEL = {
    10: 1,
    20: 2,
    30: 3,
    35: 4,
    40: 5
  };

  /**
   * Extract text from an image using Tesseract OCR
   */
  async function extractTextFromImage(imageElement) {
    if (typeof Tesseract === 'undefined') {
      throw new Error('Tesseract.js is not loaded. Please ensure the library is available.');
    }
    
    try {
      // Convert image to canvas if needed
      let canvas = null;
      if (imageElement instanceof HTMLImageElement || imageElement instanceof HTMLVideoElement || imageElement instanceof ImageBitmap) {
        canvas = document.createElement('canvas');
        canvas.width = imageElement.width || imageElement.naturalWidth || imageElement.videoWidth || imageElement.width;
        canvas.height = imageElement.height || imageElement.naturalHeight || imageElement.videoHeight || imageElement.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        imageElement = canvas;
      }
      
      const result = await Tesseract.recognize(imageElement, OCR_OPTS.lang, { logger: () => {} });
      return (result?.data?.text || "").trim();
    } catch (error) {
      console.error("OCR error:", error);
      throw new Error("Failed to extract text from image: " + (error.message || String(error)));
    }
  }

  /**
   * Clean and normalize OCR text
   */
  function cleanText(text) {
    if (!text) return "";
    
    return text
      .replace(/[\u2018\u2019\u2032]/g, "'")
      .replace(/[\u201C\u201D\u2033]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\u00A0/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  /**
   * Parse hint level from discount text
   * Examples: "Hint Lvl 3 30% OFF!", "Hint Lvl 1 10% OFF!"
   */
  function parseHintLevel(text) {
    if (!text) return null;

    // Pattern: "Hint Lvl N X% OFF" or "Hint Lvl N X%"
    const patterns = [
      /hint\s*lvl\s*(\d+)\s*(\d+)%\s*off/i,
      /hint\s*level\s*(\d+)\s*(\d+)%\s*off/i,
      /hint\s*lvl\s*(\d+)\s*(\d+%)/i,
      /(\d+)%\s*off/i,
      /hint\s*lvl\s*(\d+)/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        // Try to get level from explicit match
        if (match[1]) {
          const level = parseInt(match[1], 10);
          if (!isNaN(level) && level >= 0 && level <= 5) {
            return level;
          }
        }
        // Try to get level from percentage
        if (match[2]) {
          const percent = parseInt(match[2].replace('%', ''), 10);
          if (!isNaN(percent) && HINT_DISCOUNT_TO_LEVEL[percent] !== undefined) {
            return HINT_DISCOUNT_TO_LEVEL[percent];
          }
        }
      }
    }

    return null;
  }

  /**
   * Extract cost from text
   * Looks for numbers that appear in cost context (between +/- buttons, after cost labels, etc.)
   */
  function parseCost(text) {
    if (!text) return null;

    // Remove hint discount text first
    const withoutHint = text.replace(/hint\s*lvl\s*\d+\s*\d+%\s*off/gi, '').trim();

    // Look for numbers that could be costs (typically 50-300 range, but allow wider)
    const costPatterns = [
      /cost[:\s]*(\d+)/i,
      /(\d+)\s*[+\-]/,
      /[+\-]\s*(\d+)/,
      /\b(\d{2,4})\b/ // 2-4 digit numbers
    ];

    const costs = [];
    for (const pattern of costPatterns) {
      const matches = withoutHint.matchAll(new RegExp(pattern, 'gi'));
      for (const match of matches) {
        const cost = parseInt(match[1] || match[0], 10);
        if (!isNaN(cost) && cost >= 10 && cost <= 1000) {
          costs.push(cost);
        }
      }
    }

    // Return the most likely cost (often the largest reasonable number in skill context)
    if (costs.length > 0) {
      // Prefer costs in typical skill range (50-300)
      const inRange = costs.filter(c => c >= 50 && c <= 300);
      if (inRange.length > 0) {
        return Math.max(...inRange);
      }
      return Math.max(...costs);
    }

    return null;
  }

  /**
   * Extract skill name from text
   * Skill names are typically at the top of each card, before descriptions
   */
  function extractSkillName(text) {
    if (!text) return null;

    // Split by common separators (description markers, newlines)
    const lines = text.split(/\n+|\.\s+|(?<=[A-Z])\s+(?=[A-Z][a-z])/);
    
    // First non-empty line is usually the skill name
    for (const line of lines) {
      const cleaned = cleanText(line);
      if (!cleaned) continue;
      
      // Skip hint discount lines
      if (/hint\s*lvl/i.test(cleaned)) continue;
      
      // Skip cost lines (numbers only)
      if (/^\d+$/.test(cleaned)) continue;
      
      // Skip common UI text
      if (/moderately|slightly|greatly|increase|decrease|performance/i.test(cleaned) && cleaned.length > 50) {
        continue; // Likely description
      }

      // Return the first meaningful line as skill name
      if (cleaned.length >= 3 && cleaned.length <= 100) {
        return cleaned;
      }
    }

    return null;
  }

  /**
   * Split image into skill card regions
   * This is a simplified version - assumes cards are arranged vertically
   */
  async function detectSkillCards(imageElement) {
    const cards = [];
    const img = imageElement;
    
    // For now, process the whole image and split by detecting card boundaries
    // A more sophisticated approach would use template matching or contour detection
    // This is a simplified heuristic-based approach
    
    const canvas = document.createElement('canvas');
    canvas.width = img.width || img.naturalWidth || img.videoWidth || 1920;
    canvas.height = img.height || img.naturalHeight || img.videoHeight || 1080;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Try to identify card boundaries by analyzing image regions
    // For now, we'll process sections vertically
    const sectionHeight = Math.floor(canvas.height / 4); // Assume ~4 cards visible
    const sections = [];
    
    for (let y = 0; y < canvas.height; y += sectionHeight) {
      const sectionCanvas = document.createElement('canvas');
      sectionCanvas.width = canvas.width;
      sectionCanvas.height = Math.min(sectionHeight, canvas.height - y);
      const sectionCtx = sectionCanvas.getContext('2d', { willReadFrequently: true });
      sectionCtx.drawImage(canvas, 0, y, canvas.width, sectionCanvas.height, 0, 0, canvas.width, sectionCanvas.height);
      
      sections.push({
        canvas: sectionCanvas,
        y: y,
        height: sectionCanvas.height
      });
    }

    return sections;
  }

  /**
   * Process a single skill card region and extract skill data
   */
  async function processSkillCard(canvasElement) {
    try {
      const text = await extractTextFromImage(canvasElement);
      const cleaned = cleanText(text);
      
      if (!cleaned || cleaned.length < 5) {
        return null;
      }

      const skillName = extractSkillName(cleaned);
      const cost = parseCost(cleaned);
      const hintLevel = parseHintLevel(cleaned) || 0;

      if (!skillName) {
        return null;
      }

      return {
        name: skillName,
        cost: cost,
        hintLevel: hintLevel,
        rawText: cleaned
      };
    } catch (error) {
      console.error("Error processing skill card:", error);
      return null;
    }
  }

  /**
   * Main function: Extract skills from a screenshot
   */
  async function extractSkillsFromImage(imageElement) {
    try {
      // First, try processing the whole image
      const fullText = await extractTextFromImage(imageElement);
      const cleaned = cleanText(fullText);
      
      if (!cleaned) {
        throw new Error("No text detected in image");
      }

      // Split text into potential skill blocks (by detecting skill name patterns)
      // Skills are typically separated by newlines or distinctive patterns
      const skillBlocks = [];
      
      // Try to detect multiple skills by splitting on patterns
      // Common pattern: skill name, then description, then cost/hint
      const lines = cleaned.split(/\n+/).filter(line => line.trim().length > 0);
      
      let currentBlock = [];
      const blocks = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Detect hint discount lines
        if (/hint\s*lvl/i.test(line)) {
          if (currentBlock.length > 0) {
            blocks.push(currentBlock.join('\n'));
            currentBlock = [];
          }
          // Include hint line with previous block if it exists
          if (blocks.length > 0) {
            blocks[blocks.length - 1] += '\n' + line;
          } else {
            currentBlock.push(line);
          }
        }
        // Detect cost lines (standalone numbers or with +/-)
        else if (/^\d+$/.test(line) || /[+\-]\s*\d+|^\d+\s*[+\-]/.test(line)) {
          currentBlock.push(line);
          blocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        // Detect skill name (short line, capitalized, not description)
        else if (line.length < 60 && /^[A-Z]/.test(line) && !/moderately|slightly|greatly|increase|decrease/.test(line.toLowerCase())) {
          if (currentBlock.length > 0) {
            blocks.push(currentBlock.join('\n'));
          }
          currentBlock = [line];
        }
        // Description or other text
        else {
          currentBlock.push(line);
        }
      }
      
      if (currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
      }

      // If we couldn't split effectively, process the whole text as one skill
      if (blocks.length === 0) {
        blocks.push(cleaned);
      }

      // Process each block as a potential skill
      const skills = [];
      for (const block of blocks) {
        const skillName = extractSkillName(block);
        if (!skillName) continue;
        
        const cost = parseCost(block);
        const hintLevel = parseHintLevel(block) || 0;

        skills.push({
          name: skillName,
          cost: cost,
          hintLevel: hintLevel,
          rawText: block
        });
      }

      // If we didn't find multiple skills, try alternative parsing
      if (skills.length === 0 || (skills.length === 1 && !skills[0].cost)) {
        // Fallback: process entire image as single skill
        const skillName = extractSkillName(cleaned);
        if (skillName) {
          return [{
            name: skillName,
            cost: parseCost(cleaned),
            hintLevel: parseHintLevel(cleaned) || 0,
            rawText: cleaned
          }];
        }
      }

      return skills.filter(s => s.name);
    } catch (error) {
      console.error("Error extracting skills:", error);
      throw error;
    }
  }

  // Export functions
  window.SkillOCR = {
    extractSkillsFromImage,
    parseHintLevel,
    parseCost,
    extractSkillName,
    cleanText
  };

})();

