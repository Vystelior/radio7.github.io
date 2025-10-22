export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const serverTime = Date.now();
  
  // Return server time and calculated position
  res.json({
    serverTime: serverTime,
    status: 'ok'
  });
}
