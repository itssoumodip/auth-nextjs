# NextAuth - Modern Authentication System

A modern, secure authentication system built with Next.js, TypeScript, and MongoDB. This project provides a complete solution for user authentication, profile management, and secure user operations.

## Features

- 🔐 Secure user authentication with JWT
- 📧 Email verification system
- 🔑 Password reset functionality
- 👤 User profiles with customizable bio and profile images
- 🖼️ Image upload with Cloudinary integration
- 🌐 Public profile pages
- 🛡️ Protected routes with middleware
- 🎨 Modern UI with Tailwind CSS

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **Image Storage**: Cloudinary
- **Password Encryption**: bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account (for image uploads)
- SMTP server or email service (for verification emails)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/auth-nextjs.git
   cd auth-nextjs
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret_key
   DOMAIN=http://localhost:3000
   
   # Email configuration
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   
   # Cloudinary configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Alternative: Run with Network Access

To access the app from other devices on your network:

```bash
npm run dev:network
```

## Project Structure

- `src/app`: Main application code and pages
- `src/app/api`: API routes for authentication and user operations
- `src/dbConfig`: Database configuration
- `src/helpers`: Helper functions for tokens, email, etc.
- `src/models`: Mongoose models
- `src/middleware.ts`: Middleware for protected routes

## Key Features Explained

### Authentication Flow

1. **Signup**: User creates an account with username, email, and password
2. **Verification**: A verification email is sent to the user's email address
3. **Login**: User logs in with email and password, receiving a JWT token
4. **Protected Routes**: Middleware ensures only authenticated users can access certain routes

### Password Reset

1. User requests password reset with their email
2. A reset token is sent to their email
3. User follows the link and sets a new password

### Profile Management

- Users can update their profile information (username, email, bio)
- Upload profile pictures that are stored on Cloudinary
- View their public profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
