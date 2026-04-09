# Love Offering Platform - Quick Start Guide

## Getting Started

### 1. Start the Application
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### 2. Login Page
You'll see the login screen with all demo credentials listed.

**Quick Login:**
- Click on any demo account button to auto-fill credentials
- Click "Login"

---

## Test Scenarios

### Scenario 1: Send a Donation (As Donor)

**Steps:**
1. Login as `user@example.com` (password: `user123`)
2. Browse the video feed (Home page)
3. Click any video to view details
4. Enter amount (e.g., $50)
5. Click "Add Contributor" and select the creator
6. Add a comment: "Blessed by this message!"
7. Click "Send Gift"
8. See success screen with comments section
9. Add a reply to creator's response

**What You'll See:**
- Available videos from different ministries
- Donation confirmation with amount split
- Comment thread with creator replies
- Transaction recorded in your donation history

---

### Scenario 2: View Creator Earnings (As Creator)

**Steps:**
1. Login as `singer@example.com` (password: `singer123`)
2. Click "Dashboard" in bottom navigation
3. Switch to "Earnings" tab
4. See total earnings ($1,650) and list of donations
5. Click "Bank Accounts" tab to verify account is linked

**What You'll See:**
- Total earnings from all donations
- List of individual donations with amounts
- Donor comments for each donation
- Bank account verification status

---

### Scenario 3: Manage Admin Verification (As Admin)

**Steps:**
1. Login as `admin@love.offering` (password: `admin123`)
2. Click "Admin" in bottom navigation
3. Go to "Verifications" tab
4. Click on a pending request (e.g., "newpreacher@example.com")
5. View user details and submitted document
6. Either:
   - Click "Approve Verification" → Confirm
   - Enter rejection reason → Click "Reject Verification" → Confirm

**What You'll See:**
- List of pending verification requests
- User information and role
- Document preview/download option
- Approval/rejection actions
- Confirmation dialog before action

---

### Scenario 4: Manage Video Status (As Admin)

**Steps:**
1. Login as `admin@love.offering` (password: `admin123`)
2. Click "Admin" in bottom navigation
3. Go to "Videos" tab
4. Search for a video (e.g., "Hallelujah")
5. Click eye icon to toggle visibility
6. Confirm action
7. See status change to NOT_AVAILABLE or AVAILABLE

**What You'll See:**
- Searchable list of all platform videos
- Video thumbnails and creator names
- Current status (AVAILABLE/NOT_AVAILABLE)
- Toggle button to hide/show videos
- Status updates in real-time

---

### Scenario 5: Add Bank Account (As Creator)

**Steps:**
1. Login as `preacher@example.com` (password: `preacher123`)
2. Click "Dashboard" in bottom navigation
3. Switch to "Bank Accounts" tab
4. Click "Add Bank Account"
5. Fill in:
   - Bank Name: "New Bank"
   - Account Holder: "Your Name"
   - Account Number: "1234567890"
6. Click "Add Account"
7. See new account in list

**What You'll See:**
- List of existing bank accounts
- Add bank account form
- Account verification status
- Default account designation
- Security notice about encrypted storage

---

### Scenario 6: Add Contributors to Video (As Creator)

**Steps:**
1. Login as `church@example.com` (password: `church123`)
2. Click "Settings" in bottom navigation
3. Click "Manage Contributors"
4. Select a video from the list
5. Search for "John Michael"
6. Click "+" to add (if they have bank account)
7. See success message

**What You'll See:**
- List of your uploaded videos
- Search bar for finding contributors
- List of available contributors
- Bank account status indicator
- Success/error messages

---

### Scenario 7: Get Verified (As Creator)

**Steps:**
1. Login as a non-verified creator account
2. Go to Settings
3. Click "Get Verified"
4. Select role: "Preacher"
5. Upload a document (select any file)
6. Click "Submit for Verification"
7. See pending status message

**What You'll See:**
- Role selection options
- Document upload form
- Requirements checklist
- Submission confirmation
- Pending review status

---

### Scenario 8: Upload Video (As Verified Creator)

**Steps:**
1. Login as `singer@example.com` (password: `singer123`)
2. Click "Settings" → "Upload Video"
3. Enter:
   - Title: "New Worship Song"
   - Description: "Beautiful worship"
   - Select any video file
4. Click "Upload Video"
5. See success confirmation

**What You'll See:**
- Video title and description fields
- File upload area
- Content guidelines
- Upload progress
- Success screen with next steps

---

## Feature Checklist

### Donor Features
- ✅ Browse ministry videos
- ✅ Send instant gifts
- ✅ Select donation recipients
- ✅ Add comments to donations
- ✅ View creator replies
- ✅ Track donation history
- ✅ View analytics

### Creator Features
- ✅ Upload ministry videos
- ✅ Get verified (submit documents)
- ✅ Add bank accounts for payments
- ✅ Link contributors to videos
- ✅ View earnings and supporters
- ✅ Respond to donor comments
- ✅ Monitor donation details

### Admin Features
- ✅ Review verification requests
- ✅ Approve/reject creators
- ✅ Manage user roles
- ✅ Toggle video visibility
- ✅ Search users and videos
- ✅ Filter by status
- ✅ View audit logs

---

## Tips & Tricks

### 1. Comment System
- Donors can add comments when donating
- Creators see comments in donation details
- Click "Reply" to respond
- Replies appear in real-time

### 2. Multiple Recipients
- Click "Add Contributor" to split donation
- Each recipient gets their share
- Percentage calculated automatically

### 3. Admin Confirmations
- Sensitive actions require confirmation
- Rejection requires reason text
- All actions are logged

### 4. Bank Account Linking
- Must have verified bank account to receive tips
- One account marked as "Default"
- Only last 4 digits visible for security

### 5. Verification Requirement
- Creators must be verified to upload videos
- Admins can approve/reject requests
- Pending status shown on profile
- Can resubmit if rejected

---

## Common Issues

### "Not Authorized to Upload"
- Your creator account isn't verified
- Go to Settings → Get Verified
- Submit documents for admin review
- Wait for approval notification

### "Contributor has no bank account"
- Selected contributor needs bank account setup
- They must add account in Settings → Bank Accounts
- Then you can link them to your videos

### "Can't add comment to donation"
- Wait for donation to complete
- Comments available in success screen
- Refresh page if needed

---

## Browser Compatibility

- Chrome / Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized

---

## Data Persistence

- User login data stored in localStorage
- All mock data resets on browser cache clear
- No backend server required
- Perfect for testing and demo

---

## Next Steps

### Try These Flows:
1. **Flow 1:** Donor sends gift → Creator replies → Donor sees reply
2. **Flow 2:** Creator gets verified → Uploads video → Donors give gifts
3. **Flow 3:** Admin reviews verification → Approves creator → Creator uploads
4. **Flow 4:** Creator adds contributors → Contributors receive shares

---

For detailed feature documentation, see `DEMO_CREDENTIALS.md`
