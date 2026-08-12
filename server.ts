import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Resume PDF direct download endpoint for mobile & desktop browsers
  app.get(['/api/download-resume', '/Kunal_Patil_Resume.pdf'], (req, res) => {
    const filePath = path.join(process.cwd(), 'public', 'Kunal_Patil_Resume.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Kunal_Patil_Resume.pdf"');
    res.sendFile(filePath);
  });

  // Direct Contact Email endpoint
  app.post('/api/send-email', async (req, res) => {
    try {
      const { name, email, subject, message, recipientEmail } = req.body;
      const targetEmail = recipientEmail || 'kunalpatil1730@gmail.com';

      console.log(`[Contact Email Notification] New message from ${name} (${email}) to ${targetEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);

      // Attempt sending via Web3Forms API relay if access key or public web submission is enabled
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: 'e010a300-8ca9-411a-8ce4-6101faee9993', // Web3Forms public access key
            name,
            email,
            subject: `[Portfolio Contact] ${subject || 'New Message from Visitor'}`,
            message: `From: ${name} (${email})\nTo: ${targetEmail}\nSubject: ${subject}\n\nMessage:\n${message}`,
            to_email: targetEmail
          })
        });
        const data = await response.json();
        if (data.success) {
          return res.json({ success: true, method: 'web3forms', message: 'Email sent directly to your inbox!' });
        }
      } catch (relayErr) {
        console.log('Public relay fallback used');
      }

      // Return success with mailto link helper
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      return res.json({ 
        success: true, 
        method: 'mailto_fallback', 
        targetEmail, 
        mailtoUrl, 
        gmailUrl 
      });
    } catch (err: any) {
      console.error('Email API Error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // AI Assistant endpoint using @google/genai
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          reply: "Hello! I am Kunal Patil's AI Portfolio Assistant. I can tell you all about Kunal's 9.93 CGPA in Computer Engineering at DYPCOEI, his C++ Internship at Thiranex, his 1st Rank in Shirpur Taluka, or his projects like the Academic Management System!"
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const systemInstruction = `
You are the personal AI Assistant representing Kunal Patil, a high-achieving Computer Engineering student, Web Developer, and UI/UX Enthusiast.

Key Background Information on Kunal Patil:
- Education: B.E. Computer Engineering student at Dr. D. Y. Patil College of Engineering & Innovation, Pune (2025–Present). Current CGPA: 9.93 (Second rank in Computer Department for First Year Engineering & Humanities).
- HSC Board Academic Achievement: Completed at R. C. Patel Junior College, Shirpur. 11th: 91%, 12th: 91.67%. Secured 1st Rank in Shirpur Taluka and 2nd Rank in Dhule District!
- Industry Experience: C++ Programming Intern at Thiranex (Jun – Jul 2026), building object-oriented programming projects, memory-optimized routines, and algorithm suites.
- Core Technical Skills:
  * Programming Languages: C, C++, Python, JavaScript, HTML5/CSS3, PHP, SQL
  * Web Development: HTML5, CSS3, PHP, JavaScript, React, Tailwind CSS, Responsive Web Design
  * UI/UX & Design: Wireframing, Figma Prototyping, UI/UX Design
  * Tools: VS Code, Git/GitHub, Notepad++, Firebase Firestore
- Key Projects:
  1. Academic Management System (Individual Full-Stack Project): Digitized academic records, built interactive student performance dashboards, PHP/SQL backend, responsive UI.
  2. C++ Enterprise Algorithmic Suite (Thiranex Internship): High-performance C++ solver, OOP architecture, custom memory benchmarking.
  3. Interactive Web Portfolio & Certificate Vault: React, TypeScript, Tailwind, Motion, Firestore, Admin Dashboard, Certificate Vault.
- Certifications:
  1. NPTEL – Python for Data Science (Elite, Score: 64/100, IITs)
  2. C & C++ Proficiency Certificate (Imarticus Learning)
  3. Business Communication Certificate (Imarticus Learning)
  4. Industrial Automation, Robotics & IIoT Training (PMS Robotics Research Center, Pune)
  5. C++ Programming Internship Certificate (Thiranex)
- Extra-Curriculars & Interests: Digital Photography & Videography, Mathematical Problem Solving, Outdoor Sports.
- Languages: English (Professional), Hindi (Fluent), Marathi (Native), Japanese.
- Contact: Email: kunalpatil1730@gmail.com | Location: Pune, Maharashtra, India.

Your Persona:
- Professional, articulate, friendly, and helpful.
- Enthusiastic about Kunal's achievements, coding skills, and passion for engineering.
- Highlight specific metrics like his 9.93 CGPA, 1st Rank Shirpur Taluka, and Thiranex internship when relevant.
- Keep responses concise (2-4 scannable paragraphs or bullet points).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ]
      });

      const reply = response.text || "I'm delighted to tell you more about Kunal's work! What specific detail would you like to explore?";
      return res.json({ reply });

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(200).json({
        reply: "Kunal Patil is a Computer Engineering student at DYPCOEI Pune with a 9.93 CGPA, 1st Rank in Shirpur Taluka, and C++ Internship experience at Thiranex. Feel free to ask about his skills, projects, or certifications!"
      });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
