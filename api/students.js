// api/students.js - Bản debug với error handling tốt hơn

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Lấy biến môi trường
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';

    // Debug: Kiểm tra biến môi trường
    if (!SHEET_ID) {
      return res.status(500).json({ 
        error: 'GOOGLE_SHEET_ID is not set',
        debug: 'Please add GOOGLE_SHEET_ID in Vercel Environment Variables'
      });
    }

    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'GOOGLE_API_KEY is not set',
        debug: 'Please add GOOGLE_API_KEY in Vercel Environment Variables'
      });
    }

    // Gọi Google Sheets API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    
    console.log('Fetching from Google Sheets...');
    
    const response = await fetch(url);

    // Debug: Kiểm tra response
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', errorText);
      
      return res.status(response.status).json({ 
        error: 'Failed to fetch data from Google Sheets',
        status: response.status,
        statusText: response.statusText,
        details: errorText,
        debug: 'Check if Google Sheet is shared publicly and API Key is valid'
      });
    }

    const data = await response.json();
    
    // Debug: Kiểm tra dữ liệu
    if (!data.values || data.values.length === 0) {
      return res.status(404).json({ 
        error: 'No data found in Google Sheet',
        debug: 'Make sure your sheet has data'
      });
    }

    const rows = data.values;

    // Xử lý dữ liệu (bỏ qua header row)
    const students = rows.slice(1).map(row => ({
      id: row[0] || '',
      name: row[1] || '',
      class: row[2] || '',
      sessions: row[3] || '0',
      amount: row[4] || '0',
      transferContent: row[5] || '',
      note: row[6] || '',
      status: row[7] || 'Chưa nộp',
      qrCode: row[8] || ''
    }));

    console.log(`Successfully fetched ${students.length} students`);

    // Trả về dữ liệu JSON
    return res.status(200).json(students);

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      debug: 'Check Vercel Function Logs for more details'
    });
  }
}
