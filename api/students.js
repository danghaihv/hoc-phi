// api/students.js - Serverless function cho Vercel

export default async function handler(req, res) {
  // Chỉ cho phép GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Lấy biến môi trường từ Vercel
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';

    // Kiểm tra biến môi trường
    if (!SHEET_ID || !API_KEY) {
