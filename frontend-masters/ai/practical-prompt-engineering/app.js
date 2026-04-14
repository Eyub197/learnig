document.addEventListener('DOMContentLoaded', () => {
  const promptForm = document.getElementById('prompt-form');
  const titleInput = document.getElementById('prompt-title');
  const contentInput = document.getElementById('prompt-content');
  const modelInput = document.getElementById('prompt-model');
  const promptsContainer = document.getElementById('prompts-container');
  const ratingFilter = document.getElementById('rating-filter');

  const btnExport = document.getElementById('btn-export');
  const btnImport = document.getElementById('btn-import');
  const importFile = document.getElementById('import-file');

  // --- METADATA TRACKING SYSTEM ---
  function estimateTokens(text, isCode) {
    if (typeof text !== 'string') throw new Error('Text must be a string');
    if (typeof isCode !== 'boolean') throw new Error('isCode must be a boolean');

    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = text.length;

    let min = 0.75 * wordCount;
    let max = 0.25 * charCount;

    if (isCode) {
      min *= 1.3;
      max *= 1.3;
    }

    min = Math.round(min);
    max = Math.round(max);

    let confidence = 'high';
    if (max > 5000) {
      confidence = 'low';
    } else if (max >= 1000) {
      confidence = 'medium';
    }

    return { min, max, confidence };
  }

  function trackModel(modelName, content) {
    if (typeof modelName !== 'string' || modelName.trim() === '') {
      throw new Error('Model name must be a non-empty string');
    }
    if (modelName.length > 100) {
      throw new Error('Model name must not exceed 100 characters');
    }
    if (typeof content !== 'string') {
      throw new Error('Content must be a string');
    }

    const now = new Date().toISOString();
    const isCode = /```|function|const|let|var|class/.test(content);

    return {
      model: modelName,
      createdAt: now,
      updatedAt: now,
      tokenEstimate: estimateTokens(content, isCode)
    };
  }

  function updateTimestamps(metadata) {
    if (!metadata || !metadata.createdAt) {
      throw new Error('Invalid metadata object');
    }

    const now = new Date();
    const createdAtDate = new Date(metadata.createdAt);

    if (now < createdAtDate) {
      throw new Error('updatedAt cannot be earlier than createdAt');
    }

    return {
      ...metadata,
      updatedAt: now.toISOString()
    };
  }

  // Load prompts from localStorage
  let prompts = JSON.parse(localStorage.getItem('prompts')) || [];

  // Initialize old prompts with userRating and metadata if they don't have it
  prompts = prompts.map(p => {
    const defaultDate = new Date(p.id).toISOString();
    return {
      ...p,
      userRating: p.userRating || 0,
      metadata: p.metadata || {
        model: 'Unknown',
        createdAt: defaultDate,
        updatedAt: defaultDate,
        tokenEstimate: { min: 0, max: 0, confidence: 'high' }
      }
    };
  });

  // Function to render all prompts
  function renderPrompts() {
    promptsContainer.innerHTML = '';

    const filterValue = ratingFilter.value;
    let filteredPrompts = prompts;

    if (filterValue !== 'all') {
      if (filterValue === 'unrated') {
        filteredPrompts = prompts.filter(p => p.userRating === 0);
      } else {
        const minRating = parseInt(filterValue, 10);
        filteredPrompts = prompts.filter(p => p.userRating >= minRating);
      }
    }

    // Sort by createdAt descending
    filteredPrompts.sort((a, b) => {
      const dateA = new Date(a.metadata.createdAt).getTime();
      const dateB = new Date(b.metadata.createdAt).getTime();
      return dateB - dateA;
    });

    if (filteredPrompts.length === 0) {
      promptsContainer.innerHTML = '<p>No prompts match the criteria.</p>';
      return;
    }

    filteredPrompts.forEach((prompt) => {
      const card = document.createElement('div');
      card.className = 'prompt-card';

      // Generate preview (approx 15 words)
      const words = prompt.content.split(/\s+/);
      const previewText = words.length > 15 ? words.slice(0, 15).join(' ') + '...' : prompt.content;

      // Generate star rating HTML
      let starsHtml = '<div class="star-rating" data-id="' + prompt.id + '">';
      for (let i = 5; i >= 1; i--) {
        const filledClass = i <= prompt.userRating ? ' filled' : '';
        starsHtml += `<span class="star${filledClass}" data-value="${i}">&#9733;</span>`;
      }
      starsHtml += '</div>';

      // Generate metadata HTML
      const md = prompt.metadata;
      const createdAtHuman = new Date(md.createdAt).toLocaleString();
      const updatedAtHuman = new Date(md.updatedAt).toLocaleString();
      const confClass = 'confidence-' + md.tokenEstimate.confidence;

      const metadataHtml = `
        <div class="metadata-section">
          <div class="metadata-item">
            <span class="metadata-label">Model:</span> <span>${escapeHTML(md.model)}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Created:</span> <span>${createdAtHuman}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Updated:</span> <span class="metadata-updated-${prompt.id}">${updatedAtHuman}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Tokens:</span>
            <span class="${confClass}">${md.tokenEstimate.min} - ${md.tokenEstimate.max} (${md.tokenEstimate.confidence})</span>
          </div>
        </div>
      `;

      card.innerHTML = `
                <h3>${escapeHTML(prompt.title)}</h3>
                ${starsHtml}
                ${metadataHtml}
                <div class="prompt-content-preview">${escapeHTML(previewText)}</div>
                <div class="notes-section">
                    <textarea class="note-input" id="note-${prompt.id}" placeholder="Add a note..." rows="2">${escapeHTML(prompt.note || '')}</textarea>
                    <div class="note-controls">
                        <button class="btn-save-note" data-id="${prompt.id}">Save</button>
                        <button class="btn-delete-note" data-id="${prompt.id}">Clear</button>
                        <span class="note-feedback" id="feedback-${prompt.id}"></span>
                    </div>
                </div>
                <button class="btn-delete" data-id="${prompt.id}">Delete</button>
            `;

      promptsContainer.appendChild(card);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', deletePrompt);
    });

    // Add event listeners to notes buttons
    document.querySelectorAll('.btn-save-note').forEach(button => {
      button.addEventListener('click', saveNote);
    });

    document.querySelectorAll('.btn-delete-note').forEach(button => {
      button.addEventListener('click', deleteNote);
    });

    // Add event listeners to stars
    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', setRating);
    });
  }

  function setRating(e) {
    const star = e.target;
    const ratingValue = parseInt(star.getAttribute('data-value'), 10);
    const promptId = star.parentElement.getAttribute('data-id');

    const promptIndex = prompts.findIndex(p => String(p.id) === promptId);
    if (promptIndex > -1) {
      prompts[promptIndex].userRating = ratingValue;
      try {
        prompts[promptIndex].metadata = updateTimestamps(prompts[promptIndex].metadata);
      } catch (err) {
        console.error("Error updating timestamp:", err);
      }
      localStorage.setItem('prompts', JSON.stringify(prompts));
      renderPrompts();
    }
  }

  // Function to handle form submission
  function savePrompt(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const modelName = modelInput ? modelInput.value.trim() : 'Unknown';

    if (title && content && modelName) {
      try {
        const metadata = trackModel(modelName, content);
        const newPrompt = { title, content, id: Date.now(), userRating: 0, metadata };
        prompts.push(newPrompt);

        localStorage.setItem('prompts', JSON.stringify(prompts));

        // Reset form
        promptForm.reset();

        // Re-render
        renderPrompts();
      } catch (err) {
        alert("Error saving prompt: " + err.message);
      }
    } else {
      alert("Please fill out all required fields.");
    }
  }

  // Function to handle prompt deletion
  function deletePrompt(e) {
    const id = e.target.getAttribute('data-id');
    const index = prompts.findIndex(p => String(p.id) === id);
    if (index > -1) {
      prompts.splice(index, 1);
      localStorage.setItem('prompts', JSON.stringify(prompts));
      renderPrompts();
    }
  }

  // Function to handle saving a note
  function saveNote(e) {
    const id = e.target.getAttribute('data-id');
    const noteInput = document.getElementById(`note-${id}`);
    const feedback = document.getElementById(`feedback-${id}`);
    const noteContent = noteInput.value.trim();

    if (!noteContent) return; // Prevent saving entirely empty notes

    const index = prompts.findIndex(p => String(p.id) === id);
    if (index > -1) {
      prompts[index].note = noteContent;
      try {
        prompts[index].metadata = updateTimestamps(prompts[index].metadata);
      } catch (err) {
        console.error("Error updating timestamp:", err);
      }
      localStorage.setItem('prompts', JSON.stringify(prompts));

      feedback.textContent = 'Saved!';
      feedback.style.color = '#a6e3a1';
      feedback.style.opacity = 1;

      const updatedSpan = document.querySelector(`.metadata-updated-${id}`);
      if (updatedSpan) {
        updatedSpan.textContent = new Date(prompts[index].metadata.updatedAt).toLocaleString();
      }

      setTimeout(() => {
        feedback.style.opacity = 0;
      }, 2000);
    }
  }

  // Function to handle deleting a note
  function deleteNote(e) {
    const id = e.target.getAttribute('data-id');
    const noteInput = document.getElementById(`note-${id}`);
    const feedback = document.getElementById(`feedback-${id}`);

    const index = prompts.findIndex(p => String(p.id) === id);
    if (index > -1) {
      prompts[index].note = '';
      try {
        prompts[index].metadata = updateTimestamps(prompts[index].metadata);
      } catch (err) {
        console.error("Error updating timestamp:", err);
      }
      localStorage.setItem('prompts', JSON.stringify(prompts));

      noteInput.value = '';
      feedback.textContent = 'Deleted!';
      feedback.style.color = '#f38ba8';
      feedback.style.opacity = 1;

      const updatedSpan = document.querySelector(`.metadata-updated-${id}`);
      if (updatedSpan) {
        updatedSpan.textContent = new Date(prompts[index].metadata.updatedAt).toLocaleString();
      }

      setTimeout(() => {
        feedback.style.opacity = 0;
      }, 2000);
    }
  }

  // Utility function to escape HTML to prevent XSS
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- EXPORT/IMPORT SYSTEM ---
  function exportData() {
    try {
      const totalPrompts = prompts.length;
      const avgRating = totalPrompts > 0
        ? (prompts.reduce((sum, p) => sum + p.userRating, 0) / totalPrompts).toFixed(1)
        : 0;

      const modelCounts = {};
      prompts.forEach(p => {
        const model = p.metadata?.model || 'Unknown';
        modelCounts[model] = (modelCounts[model] || 0) + 1;
      });
      let mostUsedModel = 'None';
      let maxCount = 0;
      for (const [model, count] of Object.entries(modelCounts)) {
        if (count > maxCount) {
          mostUsedModel = model;
          maxCount = count;
        }
      }

      const exportObj = {
        version: "1.0",
        exportTimestamp: new Date().toISOString(),
        statistics: {
          totalPrompts,
          averageRating: parseFloat(avgRating),
          mostUsedModel
        },
        prompts: prompts
      };

      const dataStr = JSON.stringify(exportObj, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `prompts-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error exporting data: " + err.message);
    }
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // Error recovery: backup existing data
      const backupData = JSON.stringify(prompts);

      try {
        const importedData = JSON.parse(event.target.result);

        // Validate JSON structure and version
        if (!importedData.version || !importedData.prompts || !Array.isArray(importedData.prompts)) {
          throw new Error("Invalid file format. Ensure it's a valid prompts export JSON.");
        }

        // Merge conflict resolution
        let mergeOption = 'replace';
        if (prompts.length > 0) {
          const userChoice = confirm("Do you want to REPLACE all existing prompts?\n\nClick OK to REPLACE ALL.\nClick Cancel to MERGE (skip duplicates).");
          mergeOption = userChoice ? 'replace' : 'merge';
        }

        if (mergeOption === 'replace') {
          prompts = importedData.prompts;
          alert("Import successful! All existing prompts were replaced.");
        } else {
          const existingIds = new Set(prompts.map(p => String(p.id)));
          const newPrompts = importedData.prompts.filter(p => !existingIds.has(String(p.id)));
          const duplicateCount = importedData.prompts.length - newPrompts.length;

          prompts = [...prompts, ...newPrompts];

          if (duplicateCount > 0) {
            alert(`Merged successfully. Skipped ${duplicateCount} duplicate prompts.`);
          } else {
            alert("Merged successfully. All imported prompts were new.");
          }
        }

        localStorage.setItem('prompts', JSON.stringify(prompts));
        renderPrompts();

      } catch (err) {
        // Rollback on failure
        prompts = JSON.parse(backupData);
        localStorage.setItem('prompts', backupData);
        renderPrompts();
        alert("Import failed: " + err.message + "\n\nChanges have been rolled back.");
      }

      // Reset input so the same file can be selected again
      e.target.value = '';
    };
    reader.onerror = function() {
      alert("Error reading file.");
    };
    reader.readAsText(file);
  }

  // Event Listeners
  promptForm.addEventListener('submit', savePrompt);
  ratingFilter.addEventListener('change', renderPrompts);

  if (btnExport) btnExport.addEventListener('click', exportData);
  if (btnImport) btnImport.addEventListener('click', () => importFile.click());
  if (importFile) importFile.addEventListener('change', handleImport);

  // Initial render
  renderPrompts();
});
