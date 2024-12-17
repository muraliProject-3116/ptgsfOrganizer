// Helper function to convert YouTube links into embed format
function convertToEmbedURL(youtubeURL) {
  try {
    const url = new URL(youtubeURL);

    // Convert "youtu.be" short URLs to embed format
    if (url.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${url.pathname}`;
    }

    // Convert "youtube.com/watch" URLs to embed format
    if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
      return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
    }

    // If URL is already in embed format or not recognized, return as is
    return youtubeURL;
  } catch (error) {
    console.error('Invalid YouTube URL:', youtubeURL);
    return '';
  }
}

// Fetch the data from Google Sheets (Google Apps Script URL)
fetch('https://script.google.com/macros/s/AKfycbyoLXZhG8gERRXpZq0vZSWv3X0OGcLKm2UthfI8mIwZwk8vbq5kebxxFYLXRn3A6FLqdw/exec', {
    method: 'GET',  // Using GET method
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    const tableBody = document.getElementById('organizer-table-body');

    // Check if the response status is 200
    if (data.status === 200) {
      const records = data.responseData; // Access the responseData array

      // Loop through the records and create table rows
      records.forEach(item => {
        const row = document.createElement('tr');
        
        // Create table cells for each column
        row.innerHTML = `
          <td>${item.date || 'N/A'}</td>
          <td>${item.time || 'N/A'}</td>
          <td>${item.session || 'N/A'}</td>
          <td>${item.worship_by || 'N/A'}</td>
          <td>${item.sermon_by || 'N/A'}</td>
          <td>${item.topic || 'N/A'}</td>
          <td>
            ${item.youtube_link ? `
              <iframe 
                width="200" 
                height="100" 
                src="${convertToEmbedURL(item.youtube_link)}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>` : 'N/A'}
          </td>
        `;
        
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    } else {
      // Handle cases where the API returns a non-200 status
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `<td colspan="7" class="text-center text-danger">${data.message || 'Error fetching data.'}</td>`;
      tableBody.appendChild(errorRow);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);

    // Handle any network or parsing errors
    const tableBody = document.getElementById('organizer-table-body');
    const errorRow = document.createElement('tr');
    errorRow.innerHTML = '<td colspan="7" class="text-center text-danger">Error loading data.</td>';
    tableBody.appendChild(errorRow);
  });

  fetch('./../components/header.html') // Relative path
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
  });

fetch('./../components/footer.html') // Relative path
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  });