# Love Offering Platform - Demo Credentials

## Overview
This is a Telegram Mini App for a digital giving system that transforms spiritual moments into meaningful support.

## Test Accounts

### Admin Account
- **Email:** admin@love.offering
- **Password:** admin123
- **Access:** Full admin dashboard with verification management, video moderation, and user controls

### Creator Accounts (Verified)

#### Church
- **Email:** church@example.com
- **Password:** church123
- **Earnings:** $5,200
- **Bank Account:** Already linked (verified)
- **Capabilities:** Upload videos, add contributors, manage donations, view earnings

#### Ministry
- **Email:** ministry@example.com
- **Password:** ministry123
- **Earnings:** $3,800
- **Bank Account:** Already linked (verified)
- **Capabilities:** Same as Church

#### Preacher
- **Email:** preacher@example.com
- **Password:** preacher123
- **Earnings:** $2,150
- **Bank Account:** Already linked (verified)
- **Capabilities:** Same as Church

#### Singer
- **Email:** singer@example.com
- **Password:** singer123
- **Earnings:** $1,650
- **Bank Account:** Already linked (verified)
- **Capabilities:** Same as Church

### Donor Account
- **Email:** user@example.com
- **Password:** user123
- **Role:** Regular Donor
- **Capabilities:** Browse videos, send gifts, add comments with replies, view donation history

---

## Key Features

### For Donors
✅ Browse ministry videos  
✅ Send instant gifts with optional comments  
✅ Reply to creator responses  
✅ View donation history and analytics  
✅ Like and favorite videos  

### For Creators (Churches, Ministries, Preachers, Singers)
✅ Upload ministry content  
✅ Add bank accounts for receiving payments  
✅ Link multiple contributors to videos  
✅ View supporter list and earnings  
✅ Receive and reply to donor comments  
✅ Get verified to start earning  

### For Admins
✅ **Verification Management**
  - Review verification requests
  - Approve/reject applications
  - Manage user roles
  
✅ **Video Management**
  - Toggle video visibility
  - Moderate content
  - Search and filter videos
  
✅ **User Management**
  - View all platform users
  - Enable/disable accounts
  - Change user roles
  - View audit logs

---

## How to Use

### As a Donor
1. Login with donor credentials
2. Browse available ministry videos on the Home feed
3. Click on a video to donate
4. Select amount and contributors
5. Add a comment (optional)
6. Confirm donation
7. View creator replies to your comment
8. Check donation history in Dashboard

### As a Creator
1. Login with creator credentials
2. Go to Dashboard → Bank Accounts
3. Add your bank account for receiving payments
4. Go to Settings → Upload Video (if verified)
5. Upload your ministry content
6. Go to Dashboard → Manage Contributors
7. Add co-creators who have bank accounts linked
8. Monitor earnings and supporters

### As an Admin
1. Login with admin credentials
2. Go to Admin Dashboard
3. **Verifications Tab:**
   - Review pending verification requests
   - Click to view documents
   - Approve or reject with reason
4. **Videos Tab:**
   - Search videos by title or creator
   - Toggle availability (AVAILABLE/NOT_AVAILABLE)

---

## Mock Data

### Sample Videos
- **ናብይደ (ወሓሳዋት) - Zenebe Girma** - Worship song
- **Hallelujah | ሃለልዩያ - ASTER ABEBE** - Classic hymn
- **በእናንተ ፈር ሙሩ - Gospel Message** - Sermon by Rev. John Mensah
- **Sunday Service - Grace Community Church** - Full service
- **Worship Night - Hope Ministry** - International ministry event

### Sample Donations
- Users have made test donations visible in creator earnings
- Comments include replies from creators
- Transaction history shows donation splits among contributors

---

## Bank Account System

### How It Works
1. **Add Account:** Creators add their bank details (bank name, account number, holder name)
2. **Set Default:** One account is marked as the default receiving account
3. **Verification:** System verifies account details (mock: auto-verified)
4. **Smart Routing:** Donations are routed to minimize transfer fees
5. **Contributors:** Contributors must have bank accounts linked before being added to videos

### Available Test Bank Accounts (Pre-added)
- Church: First National Bank ****4321
- Ministry: Global Bank ****5678
- Preacher: Heritage Bank ****7890
- Singer: Metropolitan Bank ****1234

---

## Donor Comments & Interaction

### Comment System
- Donors add comments when making donations
- Creators receive notification and can reply
- Full conversation thread visible to both parties
- Replies appear in real-time in donation success screen

### Example Flow
1. Donor sends $50 gift with comment: "Amazing performance!"
2. Creator sees comment in earnings/donation view
3. Creator replies: "Thank you for your support!"
4. Donor sees reply in their donation history

---

## Admin Dashboard Details

### Verification Requests Panel
- Shows all pending and under-review verification requests
- Display: User name, role, submission date, document link
- Actions: Approve (enable upload permissions, show badge) or Reject (require reason)

### Video Management Panel
- Search videos by title or creator name
- Filter by status (AVAILABLE / NOT_AVAILABLE)
- Toggle visibility with confirmation
- Shows creator name and thumbnail

### User Management Panel
- View all users with their roles and verification status
- Enable/disable accounts
- Change user roles manually
- Filter by role or verification status

---

## Color Scheme

- **Primary:** Teal/Green (#1b5e5e) - Main brand color, buttons, badges
- **Secondary:** Light green - Alternative highlights
- **Accent:** Gold/Yellow - CTAs and important elements
- **Neutral:** White, grays - Backgrounds and text

---

## Technical Stack

- **Frontend:** Next.js 16 with React 19
- **UI:** shadcn/ui components with Tailwind CSS
- **State Management:** React Context API
- **Authentication:** Mock auth with localStorage persistence
- **Data:** Mock data with in-memory state management
- **Integration:** Telegram Web App API

---

## Notes

- All data is stored in localStorage and resets on browser clear
- Bank account numbers are masked (only last 4 digits shown)
- Admin actions require confirmation for sensitive operations
- All actions are logged in audit trail (visible to admin)
- Verification status drives feature access

---

## Telegram Mini App

The app is optimized for Telegram Mini Apps with:
- Responsive mobile-first design
- Telegram Web App API integration
- Bottom navigation for easy access
- Minimal data usage for Telegram users

---

For more information or support, contact: support@loveoffering.app
