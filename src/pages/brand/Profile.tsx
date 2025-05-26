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
  Building, 
  Globe, 
  CreditCard, 
  Download, 
  ExternalLink 
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

// Mock data for payment history
const paymentHistory = [
  {
    id: "INV-001",
    date: "10 Mayıs 2023",
    amount: "₺599,99",
    status: "Ödendi",
    plan: "Premium Plan",
    invoice: "#"
  },
  {
    id: "INV-002",
    date: "10 Haziran 2023",
    amount: "₺599,99",
    status: "Ödendi",
    plan: "Premium Plan",
    invoice: "#"
  },
  {
    id: "INV-003",
    date: "10 Temmuz 2023",
    amount: "₺599,99",
    status: "Ödendi",
    plan: "Premium Plan",
    invoice: "#"
  },
  {
    id: "INV-004",
    date: "10 Ağustos 2023",
    amount: "₺799,99",
    status: "Ödendi",
    plan: "Enterprise Plan",
    invoice: "#"
  },
  {
    id: "INV-005",
    date: "10 Eylül 2023",
    amount: "₺799,99",
    status: "Ödendi",
    plan: "Enterprise Plan",
    invoice: "#"
  },
];

const BrandProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock brand data (in a real app, this would come from API/context)
  const brandData = {
    name: "Örnek Marka",
    email: "info@ornek.com",
    phone: "08502123456",
    website: "https://www.ornek.com",
    address: "Örnek Mahallesi, Örnek Caddesi No:123 İstanbul/Türkiye",
    contactPerson: "Marka Operatörü",
    contactEmail: "operator@ornek.com",
    contactPhone: "05551234567",
    position: "Marka Yöneticisi",
    subscription: {
      plan: "Enterprise Plan",
      status: "Aktif",
      nextBillingDate: "10 Ekim 2023",
      amount: "₺799,99"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Hesap bilgileriniz ve ödeme geçmişiniz
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/brand/settings")}>
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
                <p className="text-sm text-muted-foreground">{brandData.contactPerson}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">E-posta</p>
                <p className="text-sm text-muted-foreground">{brandData.contactEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">{brandData.contactPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Pozisyon</p>
                <p className="text-sm text-muted-foreground">{brandData.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Marka Bilgileri</CardTitle>
            <CardDescription>Markanızın temel bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Marka Adı</p>
                <p className="text-sm text-muted-foreground">{brandData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">E-posta</p>
                <p className="text-sm text-muted-foreground">{brandData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">{brandData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Web Sitesi</p>
                <a href={brandData.website} target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-primary hover:underline flex items-center gap-1">
                  {brandData.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Abonelik Bilgileri</CardTitle>
          <CardDescription>Mevcut abonelik planı ve durumu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm font-medium">Mevcut Plan</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-primary bg-primary/10 hover:bg-primary/20">
                  {brandData.subscription.plan}
                </Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium">Durum</p>
              <div className="mt-1">
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {brandData.subscription.status}
                </Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium">Sonraki Ödeme Tarihi</p>
              <p className="text-sm text-muted-foreground mt-1">{brandData.subscription.nextBillingDate}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Ödeme Miktarı</p>
              <p className="text-sm text-muted-foreground mt-1">{brandData.subscription.amount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Ödeme Geçmişi</CardTitle>
          <CardDescription>Son ödeme işlemleriniz ve faturalar</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura No</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Fatura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.plan}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandProfile;
