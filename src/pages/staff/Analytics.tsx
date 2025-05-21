
import React, { useState } from "react";
import { Calendar, BarChart3, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Types for analytics data
interface BrandPerformance {
  name: string;
  customers: number;
  messages: number;
  responses: number;
  sales: number;
}

interface CustomerSegment {
  name: string;
  value: number;
}

interface CampaignPerformance {
  name: string;
  sent: number;
  opened: number;
  responses: number;
  sales: number;
}

interface MonthlyData {
  month: string;
  customers: number;
  messages: number;
  sales: number;
}

// Mock Data
const brandPerformanceData: BrandPerformance[] = [
  { name: 'Moda Markası', customers: 3500, messages: 2800, responses: 1900, sales: 580 },
  { name: 'Teknoloji Markası', customers: 2800, messages: 2000, responses: 1500, sales: 420 },
  { name: 'Kozmetik Markası', customers: 4200, messages: 3700, responses: 2600, sales: 780 }
];

const customerSegmentData: CustomerSegment[] = [
  { name: 'Premium', value: 2350 },
  { name: 'Standard', value: 5800 },
  { name: 'Basic', value: 2900 }
];

const campaignPerformanceData: CampaignPerformance[] = [
  { name: 'Yaz İndirimi 2025', sent: 3200, opened: 1870, responses: 342, sales: 128 },
  { name: 'Premium Üyelik', sent: 2000, opened: 1560, responses: 420, sales: 215 },
  { name: 'Sadakat Programı', sent: 3500, opened: 2800, responses: 950, sales: 410 },
  { name: 'Yeni Ürün', sent: 2500, opened: 1900, responses: 560, sales: 180 },
  { name: 'Bahar Kampanyası', sent: 4500, opened: 3650, responses: 980, sales: 456 }
];

const monthlyData: MonthlyData[] = [
  { month: 'Ocak', customers: 850, messages: 720, sales: 180 },
  { month: 'Şubat', customers: 940, messages: 810, sales: 220 },
  { month: 'Mart', customers: 1250, messages: 1100, sales: 350 },
  { month: 'Nisan', customers: 1400, messages: 1250, sales: 420 },
  { month: 'Mayıs', customers: 1650, messages: 1480, sales: 510 }
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StaffAnalytics: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('last30days');
  const [brandFilter, setBrandFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">İstatistikler</h1>
        <div className="flex gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zaman Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="last7days">Son 7 Gün</SelectItem>
                <SelectItem value="last30days">Son 30 Gün</SelectItem>
                <SelectItem value="last90days">Son 90 Gün</SelectItem>
                <SelectItem value="lastYear">Son 1 Yıl</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,050</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gönderilen Mesajlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Yanıtlanan Mesajlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,050</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+22%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satışlar</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,780</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="brands">Marka Performansı</TabsTrigger>
          <TabsTrigger value="customers">Müşteri Segmentleri</TabsTrigger>
          <TabsTrigger value="campaigns">Kampanya Performansı</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aylık Performans Trendleri</CardTitle>
              <CardDescription>Son 5 aydaki müşteri, mesaj ve satış verileriniz</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" name="Müşteriler" />
                  <Area type="monotone" dataKey="messages" stroke="#82ca9d" fill="#82ca9d" name="Mesajlar" />
                  <Area type="monotone" dataKey="sales" stroke="#ffc658" fill="#ffc658" name="Satışlar" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Segmentleri</CardTitle>
                <CardDescription>Aktif müşterilerin segment dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kampanya Dönüşüm Oranları</CardTitle>
                <CardDescription>En başarılı kampanyaların dönüşüm oranları</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignPerformanceData.map(item => ({
                      name: item.name,
                      oran: (item.sales / item.sent * 100).toFixed(1)
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => [`${value}%`, "Dönüşüm Oranı"]} />
                    <Bar dataKey="oran" name="Dönüşüm Oranı" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marka Performans Karşılaştırması</CardTitle>
              <CardDescription>Tüm markaların performans metrikleri</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" name="Müşteriler" fill="#8884d8" />
                  <Bar dataKey="messages" name="Mesajlar" fill="#82ca9d" />
                  <Bar dataKey="responses" name="Yanıtlar" fill="#ffc658" />
                  <Bar dataKey="sales" name="Satışlar" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-3">
            {brandPerformanceData.map((brand, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{brand.name}</CardTitle>
                  <CardDescription>Performans göstergeleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Müşteri Sayısı:</dt>
                      <dd className="text-sm">{brand.customers}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Mesaj Gönderimi:</dt>
                      <dd className="text-sm">{brand.messages}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Yanıt Oranı:</dt>
                      <dd className="text-sm">
                        {Math.round(brand.responses / brand.messages * 100)}%
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Satış Dönüşüm Oranı:</dt>
                      <dd className="text-sm">
                        {Math.round(brand.sales / brand.responses * 100)}%
                      </dd>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <dt className="text-sm">Toplam Satış:</dt>
                      <dd className="text-sm">{brand.sales}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Segment Dağılımı</CardTitle>
                <CardDescription>Aktif müşterilerin segment dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} Müşteri`, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Performans Analizi</CardTitle>
                <CardDescription>Segment başına müşteri değeri ve etkileşim</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Premium Segment</h4>
                      <span className="text-sm font-medium text-green-500">En yüksek değer</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Yanıt Oranı:</span>
                        <span>78%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Dönüşüm Oranı:</span>
                        <span>42%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Müşteri Başına Gelir:</span>
                        <span>950₺</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Standard Segment</h4>
                      <span className="text-sm font-medium text-blue-500">En yüksek hacim</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Yanıt Oranı:</span>
                        <span>65%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Dönüşüm Oranı:</span>
                        <span>28%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Müşteri Başına Gelir:</span>
                        <span>480₺</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Basic Segment</h4>
                      <span className="text-sm font-medium text-yellow-500">Gelişim potansiyeli</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Yanıt Oranı:</span>
                        <span>42%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ortalama Dönüşüm Oranı:</span>
                        <span>15%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Müşteri Başına Gelir:</span>
                        <span>220₺</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampanya Performansı</CardTitle>
              <CardDescription>Tüm kampanyaların performans metrikleri</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sent" name="Gönderilen" fill="#8884d8" />
                  <Bar dataKey="opened" name="Açılan" fill="#82ca9d" />
                  <Bar dataKey="responses" name="Yanıtlanan" fill="#ffc658" />
                  <Bar dataKey="sales" name="Satış" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {campaignPerformanceData.map((campaign, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{campaign.name}</CardTitle>
                  <CardDescription>Kampanya performans metrikleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Gönderilen Mesaj:</dt>
                      <dd className="text-sm">{campaign.sent}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Açılma Oranı:</dt>
                      <dd className="text-sm">{Math.round(campaign.opened / campaign.sent * 100)}%</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Yanıt Oranı:</dt>
                      <dd className="text-sm">{Math.round(campaign.responses / campaign.opened * 100)}%</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium">Dönüşüm Oranı:</dt>
                      <dd className="text-sm">{Math.round(campaign.sales / campaign.responses * 100)}%</dd>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <dt className="text-sm">Toplam Satış:</dt>
                      <dd className="text-sm">{campaign.sales}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAnalytics;
