# Aadhaar OCR System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that performs Optical Character Recognition (OCR) on Aadhaar cards. Users can upload images of both front and back sides of an Aadhaar card to extract and display the personal information in a structured format.

## 🚀 Features

- **Dual Image Upload**: Upload front and back side images of Aadhaar cards
- **Real-time Preview**: View uploaded images before processing
- **OCR Processing**: Extract text and information from Aadhaar card images
- **Structured Display**: Present extracted information in a clean, organized format
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive validation and error management
- **File Security**: Input sanitization and file type validation

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface and component management
- **Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Document storage for OCR results
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image upload and storage
- **Tesseract.js** - OCR processing
- **Sharp** - Image processing and greyscale conversion

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (if using database features)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aswinrajeev0/id-reader.git
cd id-reader
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:3000`

**Note**: For production, the backend is hosted on AWS EC2

#### Start Frontend Application
```bash
cd frontend
npm run dev
```
The frontend application will start on `http://localhost:5173`

**Note**: For production, the frontend is hosted on Vercel

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## 📁 Project Overview

The application consists of two main parts:
- **Backend**: RESTful API built with Node.js, Express.js, and MongoDB, hosted on AWS EC2
- **Frontend**: React.js application for user interface, hosted on Vercel
- **Image Processing**: Cloudinary for image storage and Tesseract.js for OCR processing
- **Database**: MongoDB for storing OCR results and user data

## 🧪 Usage

1. **Access the Application**: Visit the deployed frontend URL on Vercel
2. **Upload Images**: Select front and back side images of an Aadhaar card
3. **Preview**: View uploaded images before processing
4. **Process OCR**: Click the process button to extract information
5. **View Results**: See the extracted Aadhaar information in organized format

## 🔒 Security Features

- **File Type Validation**: Only accepts image files (JPEG, PNG, JPG)
- **File Size Limits**: Maximum 5MB per image
- **Cloudinary Security**: Secure image upload and storage
- **CORS Protection**: Configured for Vercel frontend domain
- **Input Sanitization**: Prevents malicious file uploads
- **Error Handling**: Secure error messages without sensitive data exposure

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Various screen resolutions

## 🚀 Deployment

### Current Deployment
- **Backend**: Hosted on AWS EC2 instance
- **Frontend**: Deployed on Vercel
- **Database**: MongoDB Atlas (recommended for production)
- **Image Storage**: Cloudinary