// Fallback storage for when Firebase is not available
// This is a temporary solution for Node.js v23 compatibility issues

interface AdmissionData {
  studentName: string;
  age: number;
  guardianName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  source: string;
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  source: string;
}

// In-memory storage (in production, you'd want to use a proper database)
let admissionsStorage: AdmissionData[] = [];
let contactStorage: ContactData[] = [];

export const fallbackStorage = {
  // Admissions
  async addAdmission(data: Omit<AdmissionData, 'createdAt' | 'updatedAt' | 'status' | 'source'>) {
    const admission: AdmissionData = {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'website_form'
    };
    
    admissionsStorage.push(admission);
    console.log('Admission stored in fallback storage:', admission);
    
    return { id: `fallback-${Date.now()}`, ...admission };
  },

  async getAdmissions() {
    return admissionsStorage;
  },

  // Contact messages
  async addContact(data: Omit<ContactData, 'createdAt' | 'updatedAt' | 'status' | 'source'>) {
    const contact: ContactData = {
      ...data,
      status: 'unread',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'website_form'
    };
    
    contactStorage.push(contact);
    console.log('Contact message stored in fallback storage:', contact);
    
    return { id: `fallback-${Date.now()}`, ...contact };
  },

  async getContacts() {
    return contactStorage;
  },

  // Get storage stats
  getStats() {
    return {
      admissions: {
        total: admissionsStorage.length,
        pending: admissionsStorage.filter(a => a.status === 'pending').length,
        reviewed: admissionsStorage.filter(a => a.status === 'reviewed').length,
        accepted: admissionsStorage.filter(a => a.status === 'accepted').length,
        rejected: admissionsStorage.filter(a => a.status === 'rejected').length,
      },
      contacts: {
        total: contactStorage.length,
        unread: contactStorage.filter(c => c.status === 'unread').length,
        read: contactStorage.filter(c => c.status === 'read').length,
        replied: contactStorage.filter(c => c.status === 'replied').length,
      }
    };
  }
};
