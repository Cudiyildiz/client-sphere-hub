import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Building2, 
  Clock,
  Users,
  Activity,
  Lock
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';

// Mock data for system activity
const systemActivity = [
  {
    id: 1,
    action: "Yeni personel ekleme",
    details: "Sistem yeni personel eklendi",
    date: "Bugün, 10:45",
    ip: "192.168.1.105"
  },
  {
    id: 2,
    action: "Sistem ayarları güncelleme",
    details: "E-posta şablonları güncellendi",
    date: "Dün, 15:30",
    ip: "192.168.1.105"
  },
  {
    id: 3,
    action: "Abonelik planı değiştirme",
    details: "Moda Markası için plan yükseltme",
    date: "3 gün önce, 09:15",
    ip: "192.168.1.200"
  },
  {
    id: 4,
    action: "Yardım destek talebi yanıtlama",
    details: "Teknoloji Markası desteği",
    date: "5 gün önce, 11:20",
    ip: "192.168.1.105"
  },
];

// Mock data for admin permissions
const permissions = [
  { id: 1, name: "Kullanıcı Yönetimi", status: true },
  { id: 2, name: "Sistem Konfigürasyonu", status: true },
  { id: 3, name: "Ödeme İşlemleri", status: true },
  { id: 4, name: "Marka Hesapları Erişimi", status: true },
  { id: 5, name: "Raporlama & Analitik", status: true },
  { id: 6, name: "API Erişimi", status: true },
  { id: 7, name: "Güvenlik Ayarları", status: true },
  { id: 8, name: "Destek Sistemi Yönetimi", status: true },
];

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock admin data
  const adminData = {
    name: "Admin Kullanıcı",
    email: "admin@datacrux.com",
    phone: "+90 555 987 6543",
    position: "Sistem Yöneticisi",
    accessLevel: "Tam Erişim",
    lastLogin: "23 Mayıs 2023, 09:30",
    accountCreated: "15 Ocak 2022",
    staffCount: 24,
    brandCount: 56,
    securityLevel: "Yüksek",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Profili</h1>
          <p className="text-muted-foreground">
            Hesap bilgileriniz ve sistem erişim yetkileri
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/settings")}>
          Ayarları Düzenle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium">Kişisel Bilgiler</CardTitle>
            </div>
            <CardDescription>Hesabınızın temel bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">İsim</p>
                <p className="text-sm text-muted-foreground">{adminData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">E-posta</p>
                <p className="text-sm text-muted-foreground">{adminData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">{adminData.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium">Hesap Bilgileri</CardTitle>
            </div>
            <CardDescription>Erişim ve güvenlik bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Pozisyon</p>
                <p className="text-sm text-muted-foreground">{adminData.position}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Erişim Düzeyi</p>
                <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {adminData.accessLevel}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Hesap Oluşturma Tarihi</p>
                <p className="text-sm text-muted-foreground">{adminData.accountCreated}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Son Giriş</p>
                <p className="text-sm text-muted-foreground">{adminData.lastLogin}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Sistem Metrikleri</CardTitle>
          </div>
          <CardDescription>Platformdaki kullanıcı ve içerik sayısı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <Users className="h-8 w-8 text-primary mb-2" />
              <p className="text-xl font-bold">{adminData.staffCount}</p>
              <p className="text-sm text-muted-foreground">Personel Sayısı</p>
            </div>
            
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <Building2 className="h-8 w-8 text-primary mb-2" />
              <p className="text-xl font-bold">{adminData.brandCount}</p>
              <p className="text-sm text-muted-foreground">Marka Sayısı</p>
            </div>
            
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <p className="text-xl font-bold">{adminData.securityLevel}</p>
              <p className="text-sm text-muted-foreground">Güvenlik Seviyesi</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Yönetici Yetkileri</CardTitle>
          </div>
          <CardDescription>Sistemde sahip olduğunuz yetkiler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center gap-2 rounded-md border p-3">
                <div className={`h-3 w-3 rounded-full ${permission.status ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm">{permission.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Sistem Aktiviteleri</CardTitle>
          </div>
          <CardDescription>Son sistem erişim ve işlemleriniz</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşlem</TableHead>
                <TableHead>Detay</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>IP Adresi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.action}</TableCell>
                  <TableCell>{activity.details}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
