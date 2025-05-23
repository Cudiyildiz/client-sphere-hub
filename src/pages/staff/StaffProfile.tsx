
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
  Briefcase, 
  Calendar, 
  Building2, 
  Clock 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for assigned brands
const assignedBrands = [
  {
    id: 1,
    name: "Teknoloji Markası",
    type: "Teknoloji",
    status: "Aktif",
    assignedDate: "15 Ocak 2023"
  },
  {
    id: 2,
    name: "Moda Markası",
    type: "Tekstil",
    status: "Aktif",
    assignedDate: "03 Şubat 2023"
  },
  {
    id: 3,
    name: "Gıda Markası",
    type: "Gıda",
    status: "Aktif",
    assignedDate: "22 Mart 2023"
  },
  {
    id: 4,
    name: "Kozmetik Markası",
    type: "Kozmetik",
    status: "Beklemede",
    assignedDate: "10 Nisan 2023"
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    action: "Kampanya oluşturma",
    description: "Teknoloji Markası için yeni kampanya",
    date: "1 gün önce"
  },
  {
    id: 2,
    action: "Müşteri mesajı yanıtlama",
    description: "Moda Markası müşterisine yanıt",
    date: "2 gün önce"
  },
  {
    id: 3,
    action: "Rapor indirme",
    description: "Gıda Markası aylık performans raporu",
    date: "3 gün önce"
  },
  {
    id: 4,
    action: "API entegrasyonu",
    description: "Kozmetik Markası için Shopify entegrasyonu",
    date: "5 gün önce"
  },
];

const StaffProfile: React.FC = () => {
  const { user } = useAuth();

  // Mock staff data
  const staffData = {
    name: "Ali Yılmaz",
    email: "ali.yilmaz@example.com",
    phone: "+90 555 123 4567",
    position: "Kıdemli Marka Yöneticisi",
    department: "Marka Yönetimi",
    startDate: "15 Mart 2022",
    manager: "Murat Can",
    assignedBrandsCount: 12,
    performanceRating: "Çok İyi",
    weeklyHours: 40,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Hesap bilgileriniz ve çalışma performansınız
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = "/staff/settings"}>
          Ayarları Düzenle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Kişisel Bilgiler</CardTitle>
            <CardDescription>Hesabınızın temel bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">İsim</p>
                <p className="text-sm text-muted-foreground">{staffData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">E-posta</p>
                <p className="text-sm text-muted-foreground">{staffData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">{staffData.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Çalışma Bilgileri</CardTitle>
            <CardDescription>Pozisyon ve departman bilgileriniz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Pozisyon</p>
                <p className="text-sm text-muted-foreground">{staffData.position}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Departman</p>
                <p className="text-sm text-muted-foreground">{staffData.department}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">İşe Başlama Tarihi</p>
                <p className="text-sm text-muted-foreground">{staffData.startDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Yönetici</p>
                <p className="text-sm text-muted-foreground">{staffData.manager}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Performans Metrikleri</CardTitle>
          <CardDescription>Çalışma performansı ve sorumluluk alanları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm font-medium">Sorumlu Olduğu Marka Sayısı</p>
              <p className="mt-1 text-2xl font-bold">{staffData.assignedBrandsCount}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Performans Değerlendirmesi</p>
              <div className="mt-1">
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {staffData.performanceRating}
                </Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium">Haftalık Çalışma Saati</p>
              <div className="mt-1 flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.weeklyHours} saat</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Sorumlu Olduğu Markalar</CardTitle>
          <CardDescription>Yönettiğiniz marka hesapları</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marka Adı</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Atanma Tarihi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedBrands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={brand.status === "Aktif" ? 
                      "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {brand.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{brand.assignedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Son Aktiviteler</CardTitle>
          <CardDescription>Platform üzerindeki son işlemleriniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProfile;
