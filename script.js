let pincodeData = [];

function loadExcelData(callback) {
  fetch('pincodes.xlsx')
    .then(res => res.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      pincodeData = XLSX.utils.sheet_to_json(sheet, { defval: "" }).map(row => {
        const normalized = {};
        for (const key in row) {
          normalized[key.toLowerCase()] = row[key];
        }
        return normalized;
      });
      if (callback) callback();
    })
    .catch(err => console.error("Failed to load Excel:", err));
}

function handleKey(e) {
  if (e.key === "Enter") {
    searchPincode();
  }
}

let matches = [];
let currentPage = 1;
const recordsPerPage = 10;

function searchPincode() {
  const inputField = document.getElementById('pincodeInput');
  const input = inputField.value.trim();
  const modal = document.getElementById('resultModal');
  const loader = document.getElementById('loader');

  if (!input) {
    showModalMessage("⚠️ Please enter a pincode.");
    return;
  }

  loader.style.display = 'flex'; // Show loader

  // Simulate delay for UX (e.g., 300ms)
  setTimeout(() => {
    matches = pincodeData.filter(item =>
      String(item.pincode).replace(/,/g, '').trim() === input
    );

    currentPage = 1;

    if (matches.length > 0) {
      renderPage();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      inputField.value = ''; // Clear input
      loader.style.display = 'none'; // Hide loader
    } else {
      showModalMessage("❌ Invalid Pincode! Or Pincode Not Found.");
      // loader will be hidden inside showModalMessage()
    }
  }, 300);
}

function renderPage() {
  const content = document.getElementById('resultContent');
  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const pageData = matches.slice(start, end);

  const fields = [
    { key: 'pincode', label: 'Pincode' },
    { key: 'officename', label: 'Office Name' },
    { key: 'divisionname', label: 'Division Name' },
    { key: 'regionname', label: 'Region Name' },
    { key: 'taluk', label: 'Taluk' },
    { key: 'districtname', label: 'District Name' },
    { key: 'statename', label: 'State Name' },
    { key: 'telephone', label: 'Telephone' },
  ];

  let html = `<h3>Found ${matches.length} result(s)</h3>`;

  pageData.forEach(result => {
    html += `<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>`;
    fields.forEach(field => {
      html += `
        <tr>
          <td data-label="Field">${field.label}</td>
          <td data-label="Value"><span>${result[field.key] || '-'}</span></td>
        </tr>`;
    });
    html += `</tbody></table><br/>`;
  });

  html += `<div class="pagination-controls">`;
  if (currentPage > 1) {
    html += `<button onclick="prevPage()">Previous</button>`;
  }
  if (end < matches.length) {
    html += `<button onclick="nextPage()">Next</button>`;
  }
  html += `</div>`;

  html += `<button class="back-to-top" onclick="scrollToTop()">↑ Back to Top</button>`;

  content.innerHTML = html;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
}

function nextPage() {
  if ((currentPage * recordsPerPage) < matches.length) {
    currentPage++;
    renderPage();
  }
}

function scrollToTop() {
  const modalContent = document.querySelector('.modal-content');
  modalContent.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ✅ Show message inside modal and hide loader
function showModalMessage(message) {
  const modal = document.getElementById('resultModal');
  const content = document.getElementById('resultContent');
  const loader = document.getElementById('loader');

  loader.style.display = 'none'; // ✅ Hide loader on error

  content.innerHTML = `
    <div style="text-align: center; padding: 30px 20px;">
      <h2 style="color: red;">${message}</h2>
    </div>
  `;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Load Excel on page load
window.onload = () => {
  loadExcelData();
};

// Keyboard navigation in modal
document.addEventListener('keydown', function (e) {
  const modal = document.getElementById('resultModal');
  const modalContent = document.querySelector('.modal-content');

  if (modal.style.display === 'block') {
    if (e.key === 'ArrowDown') {
      modalContent.scrollBy({ top: 50, behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp') {
      modalContent.scrollBy({ top: -50, behavior: 'smooth' });
    }
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
