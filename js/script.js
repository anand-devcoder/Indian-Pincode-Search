  const input = document.getElementById('pincodeInput');
  const searchBtn = document.getElementById('searchBtn');
  const voiceBtn = document.getElementById('voiceBtn');
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const resultMessage = document.getElementById('resultMessage');
  const resultsTable = document.getElementById('resultsTable');
  const resultsBody = document.getElementById('resultsBody');
  const resetSection = document.getElementById('resetSection');
  const inputSection = document.getElementById('inputSection');
  const historyList = document.getElementById('historyList');
  const historySuggestions = document.getElementById('historySuggestions');
  const exportButtons = document.getElementById('exportButtons');
  const exportPDFBtn = document.getElementById('exportPDFBtn');
  const exportCSVBtn = document.getElementById('exportCSVBtn');
  const resetBtn = document.getElementById('resetBtn');
  const darkModeToggle = document.getElementById('darkModeToggle');

  let currentPincode = "";
  let currentData = [];

  // Dark Mode toggle
  function loadDarkModeSetting() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark');
      darkModeToggle.textContent = 'Switch to Light Mode';
    } else {
      document.body.classList.remove('dark');
      darkModeToggle.textContent = 'Switch to Dark Mode';
    }
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = 'Switch to Light Mode';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = 'Switch to Dark Mode';
    }
  });

  loadDarkModeSetting();

  // Enable Search only on valid input
  input.addEventListener('input', () => {
    searchBtn.disabled = !/^\d{6}$/.test(input.value);
  });

  // Load autocomplete from history
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('pincodeHistory')) || [];
    historySuggestions.innerHTML = '';
    historyList.innerHTML = '';
    history.forEach(code => {
      // datalist autocomplete
      const option = document.createElement('option');
      option.value = code;
      historySuggestions.appendChild(option);

      // clickable history list
      const li = document.createElement('li');
      li.textContent = code;
      li.title = `Click to search pincode ${code}`;
      li.addEventListener('click', () => {
        input.value = code;
        searchBtn.disabled = false;
        fetchPincodeData(code);
      });
      historyList.appendChild(li);
    });
  }

  function saveToHistory(pincode) {
    let history = JSON.parse(localStorage.getItem('pincodeHistory')) || [];
    if (!history.includes(pincode)) {
      history.unshift(pincode);
      if (history.length > 10) history.pop();
      localStorage.setItem('pincodeHistory', JSON.stringify(history));
    }
    loadHistory();
  }

  loadHistory();

  async function fetchPincodeData(pincode) {
    errorDiv.textContent = '';
    resultMessage.textContent = '';
    resultsBody.innerHTML = '';
    loading.classList.remove('hidden');
    resultsTable.classList.add('hidden');
    exportButtons.classList.add('hidden');

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      loading.classList.add('hidden');

      if (!data || !data[0] || data[0].Status !== "Success" || !data[0].PostOffice) {
        errorDiv.textContent = 'No data found for this pincode.';
        return;
      }

      currentPincode = pincode;
      currentData = data[0].PostOffice;

      saveToHistory(pincode);

      resultMessage.textContent = `The pincode ${pincode} belongs to below:`;
      resultsBody.innerHTML = '';

      currentData.forEach(po => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${po.Name}</td>
          <td>${po.District}</td>
          <td>${po.State}</td>
          <td><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(po.Name + ', ' + po.District + ', ' + po.State)}" target="_blank" rel="noopener">Map</a></td>
        `;
        resultsBody.appendChild(tr);
      });

      resultsTable.classList.remove('hidden');
      exportButtons.classList.remove('hidden');
      inputSection.classList.add('hidden');
      resetSection.classList.remove('hidden');
    } catch (error) {
      loading.classList.add('hidden');
      errorDiv.textContent = 'Failed to fetch data. Please try again.';
    }
  }

  searchBtn.addEventListener('click', () => {
    fetchPincodeData(input.value.trim());
  });

  resetBtn.addEventListener('click', () => {
    currentPincode = "";
    currentData = [];
    input.value = '';
    searchBtn.disabled = true;
    errorDiv.textContent = '';
    resultMessage.textContent = '';
    resultsBody.innerHTML = '';
    resultsTable.classList.add('hidden');
    exportButtons.classList.add('hidden');
    inputSection.classList.remove('hidden');
    resetSection.classList.add('hidden');
  });

  // Voice input using Web Speech API
  voiceBtn.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.replace(/\D/g, '').slice(0, 6);
      if (/^\d{6}$/.test(spoken)) {
        input.value = spoken;
        searchBtn.disabled = false;
        fetchPincodeData(spoken);
      } else {
        alert('Please speak a valid 6-digit pincode.');
      }
    };

    recognition.onerror = (event) => {
      alert('Error during speech recognition: ' + event.error);
    };
  });

  // Export to CSV
  exportCSVBtn.addEventListener('click', () => {
    if (!currentData.length) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Area,City,State\n";
    currentData.forEach(po => {
      const row = `"${po.Name}","${po.District}","${po.State}"\n`;
      csvContent += row;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pincode_${currentPincode}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Export to PDF using jsPDF
  exportPDFBtn.addEventListener('click', () => {
    if (!currentData.length) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Pincode ${currentPincode} Lookup Results`, 10, 20);
    doc.setFontSize(12);

    const colWidths = [60, 60, 60];
    let startY = 30;

    // Headers
    doc.text("Area", 10, startY);
    doc.text("City", 70, startY);
    doc.text("State", 130, startY);
    startY += 10;

    currentData.forEach(po => {
      doc.text(po.Name, 10, startY);
      doc.text(po.District, 70, startY);
      doc.text(po.State, 130, startY);
      startY += 10;
      if (startY > 280) {
        doc.addPage();
        startY = 20;
      }
    });

    doc.save(`pincode_${currentPincode}_results.pdf`);
  });