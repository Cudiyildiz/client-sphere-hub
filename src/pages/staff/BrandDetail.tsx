
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  ArrowUpRight, 
  Users, 
  MessageSquare, 
  Calendar, 
  BarChart, 
  ArrowLeft,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for brands
const brandData = [
  { 
    id: '1',
    name: 'Akme Şirket',
    industry: 'Teknoloji',
    contactPerson: 'Ahmet Yılmaz',
    email: 'ahmet@akmesirket.com',
    phone: '+90 555 123 4567',
    address: 'Levent, İstanbul',
    customers: 1245,
    campaigns: 8,
    activeUsers: 324,
    revenue: 750000,
    subscription: 'Premium',
    subscriptionEnd: '2025-12-31',
    stats: {
      campaignSuccess: 92,
      customerGrowth: 15,
      responseRate: 89
    },
    monthlyStats: [
      { month: 'Ocak', customers: 1050, campaigns: 4, success: 86 },
      { month: 'Şubat', customers: 1078, campaigns: 5, success: 88 },
      { month: 'Mart', customers: 1120, campaigns: 6, success: 90 },
      { month: 'Nisan', customers: 1156, campaigns: 6, success: 87 },
      { month: 'Mayıs', customers: 1190, campaigns: 7, success: 91 },
      { month: 'Haziran', customers: 1245, campaigns: 8, success: 92 }
    ],
    campaignsList: [
      { id: 1, name: 'Yaz İndirimi 2025', status: 'Aktif', customers: 423, messages: 124, success: 94 },
      { id: 2, name: 'Yeni Ürün Lansmanı', status: 'Aktif', customers: 256, messages: 78, success: 87 },
      { id: 3, name: 'Müşteri Sadakat Programı', status: 'Aktif', customers: 198, messages: 45, success: 95 },
      { id: 4, name: 'Tatil Promosyonu', status: 'Planlandı', customers: 0, messages: 0, success: 0 }
    ],
    customerSegments: [
      { name: 'Premium', value: 30 },
      { name: 'Standard', value: 45 },
      { name: 'Basic', value: 25 }
    ]
  },
  { 
    id: '2',
    name: 'Tech Çözümleri',
    industry: 'Yazılım',
    contactPerson: 'Zeynep Kaya',
    email: 'zeynep@techcozumleri.com',
    phone: '+90 555 987 6543',
    address: 'Maslak, İstanbul',
    customers: 876,
    campaigns: 5,
    activeUsers: 215,
    revenue: 450000,
    subscription: 'Standard',
    subscriptionEnd: '2025-10-15',
    stats: {
      campaignSuccess: 84,
      customerGrowth: 7,
      responseRate: 91
    },
    monthlyStats: [
      { month: 'Ocak', customers: 820, campaigns: 3, success: 80 },
      { month: 'Şubat', customers: 835, campaigns: 4, success: 82 },
      { month: 'Mart', customers: 845, campaigns: 4, success: 83 },
      { month: 'Nisan', customers: 855, campaigns: 5, success: 84 },
      { month: 'Mayıs', customers: 865, campaigns: 5, success: 85 },
      { month: 'Haziran', customers: 876, campaigns: 5, success: 84 }
    ],
    campaignsList: [
      { id: 1, name: 'Yazılım Güncelleme Kampanyası', status: 'Aktif', customers: 320, messages: 95, success: 88 },
      { id: 2, name: 'Eğitim Webinarları', status: 'Aktif', customers: 210, messages: 65, success: 92 },
      { id: 3, name: 'Müşteri Geri Bildirim', status: 'Aktif', customers: 175, messages: 42, success: 76 },
      { id: 4, name: 'Yıllık Abonelik İndirimi', status: 'Planlandı', customers: 0, messages: 0, success: 0 }
    ],
    customerSegments: [
      { name: 'Kurumsal', value: 60 },
      { name: 'KOBİ', value: 30 },
      { name: 'Bireysel', value: 10 }
    ]
  },
  { 
    id: '3',
    name: 'Global Yiyecek',
    industry: 'Gıda',
    contactPerson: 'Mehmet Demir',
    email: 'mehmet@globalyiyecek.com',
    phone: '+90 555 456 7890',
    address: 'Kadıköy, İstanbul',
    customers: 3542,
    campaigns: 12,
    activeUsers: 567,
    revenue: 1250000,
    subscription: 'Premium',
    subscriptionEnd: '2026-03-01',
    stats: {
      campaignSuccess: 76,
      customerGrowth: 24,
      responseRate: 82
    },
    monthlyStats: [
      { month: 'Ocak', customers: 3100, campaigns: 8, success: 72 },
      { month: 'Şubat', customers: 3200, campaigns: 9, success: 73 },
      { month: 'Mart', customers: 3300, campaigns: 10, success: 75 },
      { month: 'Nisan', customers: 3400, campaigns: 11, success: 75 },
      { month: 'Mayıs', customers: 3480, campaigns: 11, success: 76 },
      { month: 'Haziran', customers: 3542, campaigns: 12, success: 76 }
    ],
    campaignsList: [
      { id: 1, name: 'Organik Ürünler', status: 'Aktif', customers: 980, messages: 340, success: 78 },
      { id: 2, name: 'Sağlıklı Beslenme Kampanyası', status: 'Aktif', customers: 720, messages: 245, success: 75 },
      { id: 3, name: 'Yaz Menüleri', status: 'Aktif', customers: 850, messages: 320, success: 80 },
      { id: 4, name: 'Catering Hizmetleri', status: 'Planlandı', customers: 0, messages: 0, success: 0 }
    ],
    customerSegments: [
      { name: 'Restoran', value: 40 },
      { name: 'Perakende', value: 35 },
      { name: 'Son Kullanıcı', value: 25 }
    ]
  },
  { 
    id: '4',
    name: 'Şehir Modası',
    industry: 'Perakende',
    contactPerson: 'Ayşe Yıldız',
    email: 'ayse@sehirmodasi.com',
    phone: '+90 555 789 0123',
    address: 'Nişantaşı, İstanbul',
    customers: 2156,
    campaigns: 10,
    activeUsers: 412,
    revenue: 875000,
    subscription: 'Premium',
    subscriptionEnd: '2025-09-15',
    stats: {
      campaignSuccess: 88,
      customerGrowth: 19,
      responseRate: 86
    },
    monthlyStats: [
      { month: 'Ocak', customers: 1900, campaigns: 6, success: 85 },
      { month: 'Şubat', customers: 1950, campaigns: 7, success: 86 },
      { month: 'Mart', customers: 2000, campaigns: 8, success: 87 },
      { month: 'Nisan', customers: 2050, campaigns: 8, success: 87 },
      { month: 'Mayıs', customers: 2100, campaigns: 9, success: 88 },
      { month: 'Haziran', customers: 2156, campaigns: 10, success: 88 }
    ],
    campaignsList: [
      { id: 1, name: 'Yaz Koleksiyonu', status: 'Aktif', customers: 780, messages: 320, success: 91 },
      { id: 2, name: 'İndirim Günleri', status: 'Aktif', customers: 650, messages: 240, success: 87 },
      { id: 3, name: 'Özel Üyelik Programı', status: 'Aktif', customers: 420, messages: 180, success: 85 },
      { id: 4, name: 'Moda Etkinliği', status: 'Planlandı', customers: 0, messages: 0, success: 0 }
    ],
    customerSegments: [
      { name: 'Kadın', value: 65 },
      { name: 'Erkek', value: 25 },
      { name: 'Çocuk', value: 10 }
    ]
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
  customers: {
    label: 'Müşteriler',
    theme: {
      light: '#8b5cf6',
      dark: '#a78bfa',
    },
  },
  success: {
    label: 'Başarı Oranı',
    theme: {
      light: '#10b981',
      dark: '#34d399',
    },
  },
  campaigns: {
    label: 'Kampanyalar',
    theme: {
      light: '#f97316',
      dark: '#fb923c',
    },
  },
};

const BrandDetail: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = brandData.find(b => b.id === brandId);
  
  if (!brand) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold">Marka bulunamadı</h2>
        <p className="mt-2 text-muted-foreground">İstenen marka bilgisi sistemde bulunmuyor.</p>
        <Button asChild className="mt-4">
          <Link to="/staff/brands">Markalar Listesine Dön</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/staff/brands">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{brand.name}</h1>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            {brand.industry}
          </span>
        </div>
        <Button>İstatistik Raporu İndir</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brand.customers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">{brand.stats.customerGrowth}%</span> artış
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kampanyalar</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brand.campaignsList.filter(c => c.status === 'Aktif').length}</div>
            <p className="text-xs text-muted-foreground">{brand.campaignsList.length} toplam kampanya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brand.stats.campaignSuccess}%</div>
            <p className="text-xs text-muted-foreground">Tüm kampanyalar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonelik</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brand.subscription}</div>
            <p className="text-xs text-muted-foreground">
              Son: {new Date(brand.subscriptionEnd).toLocaleDateString('tr-TR')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Marka Bilgileri</CardTitle>
          <CardDescription>Temel iletişim ve firma bilgileri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Şirket Adı</p>
                  <p className="text-sm text-muted-foreground">{brand.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">İletişim Kişisi</p>
                  <p className="text-sm text-muted-foreground">{brand.contactPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">E-posta</p>
                  <p className="text-sm text-muted-foreground">{brand.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Telefon</p>
                  <p className="text-sm text-muted-foreground">{brand.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Adres</p>
                  <p className="text-sm text-muted-foreground">{brand.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Yıllık Gelir</p>
                  <p className="text-sm text-muted-foreground">
                    {brand.revenue.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performans</TabsTrigger>
          <TabsTrigger value="campaigns">Kampanyalar</TabsTrigger>
          <TabsTrigger value="segments">Müşteri Segmentleri</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aylık Performans Trendi</CardTitle>
              <CardDescription>Son 6 ayın performans verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="aspect-[3/2]" config={chartConfig}>
                <RechartsLineChart data={brand.monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="customers" 
                    name="Müşteriler" 
                    stroke="var(--color-customers)" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="success" 
                    name="Başarı Oranı (%)" 
                    stroke="var(--color-success)" 
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="campaigns" 
                    name="Kampanyalar" 
                    stroke="var(--color-campaigns)" 
                  />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Kampanya Listesi</CardTitle>
              <CardDescription>Tüm aktif ve planlanan kampanyalar</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kampanya Adı</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Müşteri Sayısı</TableHead>
                    <TableHead>Mesaj Sayısı</TableHead>
                    <TableHead>Başarı Oranı</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brand.campaignsList.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          campaign.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell>{campaign.customers.toLocaleString()}</TableCell>
                      <TableCell>{campaign.messages.toLocaleString()}</TableCell>
                      <TableCell>
                        {campaign.success > 0 ? `${campaign.success}%` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6">
                <ChartContainer className="aspect-[3/2]" config={chartConfig}>
                  <RechartsBarChart 
                    data={brand.campaignsList.filter(c => c.status === 'Aktif')} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="success" name="Başarı Oranı (%)" fill="var(--color-success)" />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Segmentleri</CardTitle>
              <CardDescription>Müşteri dağılımı analizi</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-[300px] h-[300px]">
                <RechartsPieChart width={300} height={300}>
                  <Pie
                    data={brand.customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {brand.customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartsPieChart>
              </div>
              
              <div className="mt-8 w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment</TableHead>
                      <TableHead>Oran</TableHead>
                      <TableHead>Tahmini Müşteri Sayısı</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brand.customerSegments.map((segment, index) => (
                      <TableRow key={segment.name}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {segment.name}
                          </div>
                        </TableCell>
                        <TableCell>{segment.value}%</TableCell>
                        <TableCell>
                          {Math.round((segment.value / 100) * brand.customers).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandDetail;
