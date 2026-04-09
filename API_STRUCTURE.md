# Love Offering Platform - API Structure Guide

This document outlines the recommended API structure for when you integrate a real backend.

## Authentication Endpoints

### POST /api/auth/login
Login user with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "user": { /* User object */ },
  "token": "jwt_token_here"
}
```

### POST /api/auth/logout
Logout current user
**Response:**
```json
{ "success": true }
```

### GET /api/auth/me
Get current logged-in user
**Response:**
```json
{
  "user": { /* Full user object */ }
}
```

---

## User Endpoints

### GET /api/users/:id
Get user profile
**Response:**
```json
{
  "id": "user-1",
  "name": "John Mensah",
  "email": "john@example.com",
  "role": "preacher",
  "verificationStatus": "approved",
  "totalEarnings": 2150,
  "supporterCount": 24,
  "bankAccounts": [ /* array */ ]
}
```

### PUT /api/users/:id
Update user profile
```json
{
  "name": "New Name",
  "bankAccounts": [ /* updated accounts */ ]
}
```

### POST /api/users/:id/bank-accounts
Add bank account to user
```json
{
  "bankName": "First National Bank",
  "accountNumber": "1234567890",
  "accountHolderName": "John Mensah",
  "isDefault": true
}
```

### PUT /api/users/:id/bank-accounts/:accountId
Update bank account
```json
{
  "isDefault": true,
  "verificationStatus": "verified"
}
```

### DELETE /api/users/:id/bank-accounts/:accountId
Delete bank account

---

## Video Endpoints

### GET /api/videos
Get all available videos (with pagination)
**Query params:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `creatorId`: Filter by creator
- `status`: AVAILABLE or NOT_AVAILABLE

**Response:**
```json
{
  "videos": [ /* array of videos */ ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

### GET /api/videos/:id
Get specific video details
**Response:**
```json
{
  "id": "vid-1",
  "title": "Sunday Service",
  "creatorId": "user-2",
  "creatorName": "Grace Church",
  "thumbnail": "url",
  "status": "AVAILABLE",
  "description": "Full service...",
  "contributors": [ /* array */ ]
}
```

### POST /api/videos
Create new video (creator only)
```json
{
  "title": "New Video",
  "description": "Description...",
  "videoUrl": "uploaded_file_url",
  "thumbnailUrl": "thumbnail_url"
}
```

### PUT /api/videos/:id
Update video details (creator only)
```json
{
  "title": "Updated Title",
  "status": "AVAILABLE"
}
```

### DELETE /api/videos/:id
Delete video (creator only, admin only)

---

## Donation Endpoints

### POST /api/donations
Create new donation
```json
{
  "videoId": "vid-1",
  "amount": 50.00,
  "recipients": {
    "user-2": 50.00
  },
  "comment": "Great sermon!",
  "paymentMethodId": "stripe_pm_123"
}
```

**Response:**
```json
{
  "id": "don-1",
  "status": "completed",
  "donorId": "user-6",
  "amount": 50.00,
  "timestamp": "2024-04-05T10:30:00Z"
}
```

### GET /api/donations
Get donations (filtered by user)
**Query params:**
- `donorId`: Get donor's donations
- `creatorId`: Get donations received by creator
- `videoId`: Donations for specific video

**Response:**
```json
{
  "donations": [ /* array */ ],
  "total": 15
}
```

### GET /api/donations/:id
Get donation details with comments
**Response:**
```json
{
  "id": "don-1",
  "donorId": "user-6",
  "videoId": "vid-1",
  "amount": 50.00,
  "recipients": { /* split */ },
  "comment": "Great sermon!",
  "timestamp": "2024-04-05T10:30:00Z",
  "comments": [ /* comment thread */ ]
}
```

---

## Comment Endpoints

### POST /api/donations/:donationId/comments
Add comment to donation
```json
{
  "text": "Thank you for your message!",
  "authorId": "user-2"
}
```

### POST /api/donations/:donationId/comments/:commentId/replies
Add reply to comment
```json
{
  "text": "You are welcome!",
  "authorId": "user-6"
}
```

### GET /api/donations/:donationId/comments
Get all comments for donation
**Response:**
```json
{
  "comments": [
    {
      "id": "com-1",
      "authorId": "user-6",
      "authorName": "Donor Name",
      "text": "Great sermon!",
      "timestamp": "2024-04-05T10:30:00Z",
      "replies": [
        {
          "id": "reply-1",
          "authorId": "user-2",
          "authorName": "Creator Name",
          "text": "Thank you!",
          "timestamp": "2024-04-05T11:00:00Z"
        }
      ]
    }
  ]
}
```

---

## Verification Endpoints

### POST /api/verification/request
Submit verification request (creator only)
```json
{
  "role": "preacher",
  "documentUrl": "uploaded_doc_url"
}
```

### GET /api/verification/requests
Get all verification requests (admin only)
**Query params:**
- `status`: pending, under_review, approved, rejected
- `role`: Filter by role

**Response:**
```json
{
  "requests": [
    {
      "id": "ver-1",
      "userId": "user-4",
      "userName": "John Mensah",
      "selectedRole": "preacher",
      "documentUrl": "url",
      "submissionDate": "2024-04-01",
      "status": "pending"
    }
  ]
}
```

### POST /api/verification/requests/:id/approve
Approve verification (admin only)
**Response:**
```json
{ "success": true, "message": "Verification approved" }
```

### POST /api/verification/requests/:id/reject
Reject verification (admin only)
```json
{
  "reason": "Document not clear"
}
```

---

## Contributor Endpoints

### POST /api/videos/:videoId/contributors
Add contributor to video (creator only)
```json
{
  "userId": "user-3",
  "role": "singer"
}
```

**Requirements:**
- Contributor must have verified bank account
- Contributor must be approved user

### GET /api/videos/:videoId/contributors
Get contributors for video
**Response:**
```json
{
  "contributors": [
    {
      "userId": "user-3",
      "userName": "Maria Santos",
      "displayName": "Maria Santos",
      "role": "singer",
      "bankAccountLinked": true
    }
  ]
}
```

### DELETE /api/videos/:videoId/contributors/:userId
Remove contributor from video (creator only)

---

## Admin Endpoints

### GET /api/admin/verification-requests
Get all pending verifications (admin only)
```json
{
  "requests": [ /* pending requests */ ]
}
```

### GET /api/admin/videos
Get all videos (admin only)
**Query params:**
- `status`: AVAILABLE, NOT_AVAILABLE
- `creatorId`: Filter by creator
- `search`: Search by title

### PUT /api/admin/videos/:id/status
Toggle video status (admin only)
```json
{
  "status": "AVAILABLE"
}
```

### PUT /api/admin/users/:id/status
Change user account status (admin only)
```json
{
  "status": "active"
}
```

### PUT /api/admin/users/:id/role
Change user role (admin only)
```json
{
  "role": "preacher"
}
```

### GET /api/admin/logs
Get admin action logs (admin only)
**Query params:**
- `adminId`: Filter by admin
- `action`: Filter by action type
- `days`: Last N days (default: 30)

**Response:**
```json
{
  "logs": [
    {
      "id": "log-1",
      "adminId": "user-1",
      "action": "verify_user",
      "targetUserId": "user-4",
      "details": { /* action details */ },
      "timestamp": "2024-04-05T10:30:00Z"
    }
  ],
  "total": 25
}
```

---

## Payment Endpoints

### POST /api/payments/create-intent
Create payment intent (for Stripe/Telegram Stars integration)
```json
{
  "amount": 50.00,
  "currency": "USD",
  "recipientIds": ["user-2", "user-3"],
  "recipientShares": [30.00, 20.00]
}
```

### POST /api/payments/webhook
Webhook for payment provider (Stripe, etc)
```json
{
  "type": "charge.succeeded",
  "data": { /* provider data */ }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { /* additional info */ }
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Server Error

### Common Error Codes
- `INVALID_CREDENTIALS`: Login failed
- `NOT_AUTHENTICATED`: User not logged in
- `NOT_AUTHORIZED`: User not allowed for this action
- `RESOURCE_NOT_FOUND`: Item doesn't exist
- `VALIDATION_ERROR`: Input validation failed
- `BANK_ACCOUNT_REQUIRED`: Contributor missing bank account
- `NOT_VERIFIED`: Creator not verified
- `PAYMENT_FAILED`: Payment processing failed

---

## Rate Limiting

Recommended rate limits:
- Auth endpoints: 10 requests/minute per IP
- Video endpoints: 100 requests/minute per user
- Donation endpoints: 30 requests/minute per user
- Admin endpoints: 50 requests/minute per admin
- General: 1000 requests/hour per authenticated user

---

## Pagination

Standard pagination format:
```json
{
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

## Database Schema Recommendations

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'church', 'ministry', 'preacher', 'singer', 'worship_group', 'donor'),
  verification_status ENUM('pending', 'approved', 'rejected', 'under_review'),
  account_status ENUM('active', 'disabled'),
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  supporter_count INT DEFAULT 0,
  document_url VARCHAR(255),
  submission_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bank Accounts Table
```sql
CREATE TABLE bank_accounts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  bank_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL (encrypted),
  account_holder_name VARCHAR(255) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  verification_status ENUM('verified', 'pending', 'failed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Videos Table
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(255),
  video_url VARCHAR(255),
  duration VARCHAR(20),
  status ENUM('AVAILABLE', 'NOT_AVAILABLE') DEFAULT 'AVAILABLE',
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Donations Table
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY,
  donor_id UUID NOT NULL REFERENCES users(id),
  video_id UUID NOT NULL REFERENCES videos(id),
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('completed', 'pending', 'failed') DEFAULT 'pending',
  comment TEXT,
  payment_method_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Migration Path from Mock to Real Backend

1. **Keep current mock context structure** - No changes needed to UI
2. **Create API service layer** - `/lib/api-client.ts`
3. **Replace context data fetches** - Update DataContext to call API
4. **Add authentication flow** - Real JWT tokens instead of localStorage
5. **Implement payment processing** - Add Stripe/Telegram Stars integration
6. **Set up database** - Deploy PostgreSQL/similar
7. **Deploy backend** - Node.js/Python/Go server

The current architecture is designed to make this transition seamless!

---

For questions about API implementation, refer to the main `PROJECT_SUMMARY.md`
