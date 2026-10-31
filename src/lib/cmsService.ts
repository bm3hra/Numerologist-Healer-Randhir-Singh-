import { CMSPage, CMSMediaItem } from '../types';

const ADMIN_TOKEN_KEY = 'dyd_admin_token';
const ADMIN_EMAIL_KEY = 'dyd_admin_email';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string, email: string): void {
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_EMAIL_KEY, email);
  } catch (err) {
    console.error('Storage error:', err);
  }
}

export function clearAdminToken(): void {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
  } catch (err) {
    console.error('Storage error:', err);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// 1. Check current admin session
export async function checkAdminSession(): Promise<{ authenticated: boolean; email?: string; role?: string }> {
  const token = getAdminToken();
  if (!token) return { authenticated: false };

  try {
    const res = await fetch('/api/admin/me', {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      clearAdminToken();
      return { authenticated: false };
    }
    const data = await res.json();
    return data;
  } catch {
    return { authenticated: false };
  }
}

// 2. Login
export async function loginAdmin(credentials: { email?: string; password?: string; fastAuthEmail?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Authentication failed' };
    }
    if (data.token) {
      setAdminToken(data.token, data.admin?.email || credentials.email || credentials.fastAuthEmail || 'admin');
      return { success: true };
    }
    return { success: false, error: 'No token received.' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error during login' };
  }
}

// 3. Logout
export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: getAuthHeaders()
    });
  } catch (err) {
    console.warn('Logout API error:', err);
  } finally {
    clearAdminToken();
  }
}

// 4. Admin Dashboard Stats
export async function getAdminStats(): Promise<{
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  totalImages: number;
  totalVideos: number;
  diskUsage?: { bytes: number; formatted: string };
  recentPages: CMSPage[];
}> {
  const res = await fetch('/api/admin/stats', { headers: getAuthHeaders() });
  if (!res.ok) {
    throw new Error('Failed to load dashboard statistics');
  }
  return res.json();
}

// Settings & Password Change
export async function changeAdminPassword(payload: {
  currentPassword?: string;
  newPassword: string;
  newEmail?: string;
  name?: string;
}): Promise<{ success: boolean; message?: string }> {
  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update admin profile');
  }
  return data;
}

// Backup & Restore
export async function exportBackupJson(): Promise<any> {
  const res = await fetch('/api/admin/backup', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to export backup');
  return res.json();
}

export async function restoreBackupJson(backupData: any): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/admin/restore', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(backupData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to restore backup');
  return data;
}

// 5. Pages
export async function getAllPages(): Promise<CMSPage[]> {
  const res = await fetch('/api/pages', { headers: getAuthHeaders() });
  if (!res.ok) {
    throw new Error('Failed to fetch pages');
  }
  return res.json();
}

export async function getPublishedPages(): Promise<CMSPage[]> {
  const res = await fetch('/api/pages');
  if (!res.ok) {
    throw new Error('Failed to fetch published pages');
  }
  return res.json();
}

export async function getPageBySlug(slug: string): Promise<CMSPage | null> {
  try {
    const res = await fetch(`/api/pages/${encodeURIComponent(slug)}`, {
      headers: getAuthHeaders()
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch page');
    }
    return res.json();
  } catch (err) {
    console.error('Error in getPageBySlug:', err);
    return null;
  }
}

export async function savePage(pageData: Partial<CMSPage> & { title: string; slug: string }): Promise<CMSPage> {
  const res = await fetch('/api/pages', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(pageData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to save page');
  }
  return data.page;
}

export async function deletePage(idOrSlug: string): Promise<void> {
  const res = await fetch(`/api/pages/${encodeURIComponent(idOrSlug)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete page');
  }
}

// 6. Media Library
export async function getAllMedia(): Promise<CMSMediaItem[]> {
  const res = await fetch('/api/media', { headers: getAuthHeaders() });
  if (!res.ok) {
    throw new Error('Failed to fetch media assets');
  }
  return res.json();
}

export async function uploadMediaItem(payload: {
  fileName: string;
  fileData: string; // base64
  type?: 'image' | 'video';
  alt?: string;
  caption?: string;
}): Promise<CMSMediaItem> {
  const res = await fetch('/api/media/upload', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload media item');
  }
  return data.media;
}

export async function deleteMediaItem(id: string): Promise<void> {
  const res = await fetch(`/api/media/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete media asset');
  }
}
