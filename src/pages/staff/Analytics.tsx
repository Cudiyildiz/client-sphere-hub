import React, { useState } from "react";
import { Calendar, BarChart3, Users, MessageSquare, ShoppingCart, CreditCard, ArrowUpRight, Truck } from "lucide-react";
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
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter
} from 'recharts';

// Types for analytics data
interface BrandPerformance {
  name: string;
  customers: number;
  messages: number;
  responses: number;
  sales: number;
  revenue: number; // Yeni: Gelir
  csat: number; // Yeni: Müşteri memnuniyet puanı (0-100)
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
  roi: number; // Yeni: Yatırım getirisi
}

interface MonthlyData {
  month: string;
  customers: number;
  messages: number;
  sales: number;
  revenue: number; // Yeni: Gelir
}

// E-Ticaret verileri için yeni tipler
interface EcommerceData {
  isApiConnected: boolean;
  revenue: {
    daily: DailyRevenue[];
    monthly: MonthlyRevenue[];
    total: number;
  };
  orders: {
    total: number;
    completed: number;
    cancelled: number;
    processing: number;
    averageValue: number;
  };
  products: {
    total: number;
    topSelling: TopSellingProduct[];
  };
}

interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
  growth: number; // Bir önceki aya göre büyüme oranı (%)
}

interface TopSellingProduct {
  name: string;
  sold: number;
  revenue: number;
}

// Markalar arası karşılaştırma için yeni tip
interface BrandComparison {
  metric: string;
  modaMarkasi: number;
  teknolojiMarkasi: number;
  kozmetikMarkasi: number;
}

// Mock Data
const brandPerformanceData: BrandPerformance[] = [
  { 
    name: 'Moda Markası', 
    customers: 3500, 
    messages: 2800, 
    responses: 1900, 
    sales: 580,
    revenue: 232000,
    csat: 87 
  },
  { 
    name: 'Teknoloji Markası', 
    customers: 2800, 
    messages: 2000, 
    responses: 1500, 
    sales: 420,
    revenue: 378000,
    csat: 82 
  },
  { 
    name: 'Kozmetik Markası', 
    customers: 4200, 
    messages: 3700, 
    responses: 2600, 
    sales: 780,
    revenue: 195000,
    csat: 91 
  }
];

// Marka listesi tanımlama
const brandList = [
  { id: 'all', name: 'Tüm Markalar' },
  { id: 'moda', name: 'Moda Markası' },
  { id: 'teknoloji', name: 'Teknoloji Markası' },
  { id: 'kozmetik', name: 'Kozmetik Markası' },
];

const customerSegmentData: CustomerSegment[] = [
  { name: 'Premium', value: 2350 },
  { name: 'Standard', value: 5800 },
  { name: 'Basic', value: 2900 }
];

const campaignPerformanceData: CampaignPerformance[] = [
  { name: 'Yaz İndirimi 2025', sent: 3200, opened: 1870, responses: 342, sales: 128, roi: 0.3 },
  { name: 'Premium Üyelik', sent: 2000, opened: 1560, responses: 420, sales: 215, roi: 0.25 },
  { name: 'Sadakat Programı', sent: 3500, opened: 2800, responses: 950, sales: 410, roi: 0.4 },
  { name: 'Yeni Ürün', sent: 2500, opened: 1900, responses: 560, sales: 180, roi: 0.2 },
  { name: 'Bahar Kampanyası', sent: 4500, opened: 3650, responses: 980, sales: 456, roi: 0.35 }
];

const monthlyData: MonthlyData[] = [
  { month: 'Ocak', customers: 850, messages: 720, sales: 180, revenue: 72000 },
  { month: 'Şubat', customers: 940, messages: 810, sales: 220, revenue: 88000 },
  { month: 'Mart', customers: 1250, messages: 1100, sales: 350, revenue: 140000 },
  { month: 'Nisan', customers: 1400, messages: 1250, sales: 420, revenue: 168000 },
  { month: 'Mayıs', customers: 1650, messages: 1480, sales: 510, revenue: 204000 }
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Marka karşılaştırma verileri
const brandComparisonData: BrandComparison[] = [
  { 
    metric: 'Müşteri Memnuniyeti',
    modaMarkasi: 87,
    teknolojiMarkasi: 82, 
    kozmetikMarkasi: 91
  },
  { 
    metric: 'Yanıt Oranı (%)',
    modaMarkasi: 68,
    teknolojiMarkasi: 75,
    kozmetikMarkasi: 70
  },
  { 
    metric: 'Dönüşüm Oranı (%)',
    modaMarkasi: 21,
    teknolojiMarkasi: 28,
    kozmetikMarkasi: 30
  },
  { 
    metric: 'Müşteri Başına Gelir (₺)',
    modaMarkasi: 66,
    teknolojiMarkasi: 135, 
    kozmetikMarkasi: 46
  },
];

// E-ticaret mock verileri
const ecommerceData: EcommerceData = {
  isApiConnected: true,
  revenue: {
    daily: [
      { date: '01/05/2025', revenue: 3250, orders: 12 },
      { date: '02/05/2025', revenue: 4120, orders: 18 },
      { date: '03/05/2025', revenue: 3890, orders: 15 },
      { date: '04/05/2025', revenue: 2980, orders: 11 },
      { date: '05/05/2025', revenue: 5430, orders: 20 },
      { date: '06/05/2025', revenue: 5120, orders: 19 },
      { date: '07/05/2025', revenue: 6250, orders: 24 },
    ],
    monthly: [
      { month: 'Ocak', revenue: 85000, orders: 320, growth: 0 },
      { month: 'Şubat', revenue: 92500, orders: 380, growth: 8.8 },
      { month: 'Mart', revenue: 118000, orders: 450, growth: 27.6 },
      { month: 'Nisan', revenue: 135000, orders: 520, growth: 14.4 },
      { month: 'Mayıs', revenue: 178000, orders: 680, growth: 31.9 },
    ],
    total: 805000
  },
  orders: {
    total: 2350,
    completed: 2120,
    cancelled: 150,
    processing: 80,
    averageValue: 342
  },
  products: {
    total: 125,
    topSelling: [
      { name: 'Premium Üye Paketi', sold: 320, revenue: 128000 },
      { name: 'Yaz Koleksiyonu Kombin', sold: 280, revenue: 95200 },
      { name: 'Akıllı Ev Sistemi', sold: 150, revenue: 112500 },
      { name: 'Cilt Bakım Seti', sold: 210, revenue: 73500 },
      { name: 'Spor Ekipmanları', sold: 180, revenue: 63000 },
    ]
  }
};

const StaffAnalytics: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('last30days');
  const [brandFilter, setBrandFilter] = useState('all');

  // Seçilen markaya göre filtreleme fonksiyonu
  const getFilteredData = () => {
    if (brandFilter === 'all') return { 
      brandPerformanceData, 
      monthlyData, 
      customerSegmentData, 
      campaignPerformanceData,
      brandComparisonData,
      ecommerceData
    };
    
    // Marka seçiliyse çalışacak filtre mantığı
    const selectedBrandName = brandList.find(b => b.id === brandFilter)?.name;
    const selectedBrandData = brandPerformanceData.find(brand => brand.name === selectedBrandName);
    
    if (selectedBrandData) {
      // Sadece seçili marka için verileri filtrele
      const filteredEcommerceData = {
        ...ecommerceData,
        revenue: {
          ...ecommerceData.revenue,
          // Demo amaçlı değerler orana göre azaltıldı
          daily: ecommerceData.revenue.daily.map(day => ({
            ...day,
            revenue: Math.round(day.revenue * 0.3),
            orders: Math.round(day.orders * 0.3)
          })),
          monthly: ecommerceData.revenue.monthly.map(month => ({
            ...month,
            revenue: Math.round(month.revenue * 0.3),
            orders: Math.round(month.orders * 0.3)
          })),
          total: Math.round(ecommerceData.revenue.total * 0.3)
        },
        orders: {
          ...ecommerceData.orders,
          total: Math.round(ecommerceData.orders.total * 0.3),
          completed: Math.round(ecommerceData.orders.completed * 0.3),
          cancelled: Math.round(ecommerceData.orders.cancelled * 0.3),
          processing: Math.round(ecommerceData.orders.processing * 0.3),
        },
        products: {
          ...ecommerceData.products,
          total: Math.round(ecommerceData.products.total * 0.3),
          topSelling: ecommerceData.products.topSelling
            .filter((_, index) => index < 3) // Her markaya özel 3 ürün göster
            .map(product => ({
              ...product,
              sold: Math.round(product.sold * 0.3),
              revenue: Math.round(product.revenue * 0.3)
            }))
        }
      };
      
      // Seçili markaya göre karşılaştırma verisini özelleştir
      const filteredComparisonData = brandComparisonData.map(item => {
        // Seçilen markaya göre sadece o markanın değerlerini daha belirgin yap
        const markaProperty = brandFilter === 'moda' ? 'modaMarkasi' : 
                             brandFilter === 'teknoloji' ? 'teknolojiMarkasi' : 'kozmetikMarkasi';
        
        return {
          ...item,
          // Seçilen marka dışındaki değerleri %30 daha düşük göster
          modaMarkasi: markaProperty === 'modaMarkasi' ? item.modaMarkasi : Math.round(item.modaMarkasi * 0.7),
          teknolojiMarkasi: markaProperty === 'teknolojiMarkasi' ? item.teknolojiMarkasi : Math.round(item.teknolojiMarkasi * 0.7),
          kozmetikMarkasi: markaProperty === 'kozmetikMarkasi' ? item.kozmetikMarkasi : Math.round(item.kozmetikMarkasi * 0.7),
        };
      });
      
      return {
        brandPerformanceData: [selectedBrandData],
        monthlyData: monthlyData.map(month => ({
          ...month,
          customers: Math.round(month.customers * 0.3),
          messages: Math.round(month.messages * 0.3),
          sales: Math.round(month.sales * 0.3),
          revenue: Math.round(month.revenue * 0.3)
        })),
        customerSegmentData, // Demo için değiştirilmedi
        campaignPerformanceData: campaignPerformanceData.filter((_, index) => index < 3), // Sadece 3 kampanya göster
        brandComparisonData: filteredComparisonData,
        ecommerceData: filteredEcommerceData
      };
    }
    
    return { 
      brandPerformanceData, 
      monthlyData, 
      customerSegmentData, 
      campaignPerformanceData,
      brandComparisonData,
      ecommerceData 
    };
  };
  
  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">İstatistikler</h1>
          <div className="w-[220px]">
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Marka Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brandList.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
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
            <div className="text-2xl font-bold">
              {brandFilter !== 'all' 
                ? Math.round(10050 * 0.3).toLocaleString() // Demo için
                : '10,050'
              }
            </div>
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
            <div className="text-2xl font-bold">
              {brandFilter !== 'all' 
                ? Math.round(8500 * 0.3).toLocaleString() // Demo için
                : '8,500'
              }
            </div>
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
            <div className="text-2xl font-bold">
              {brandFilter !== 'all' 
                ? Math.round(5050 * 0.3).toLocaleString() // Demo için
                : '5,050'
              }
            </div>
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
            <div className="text-2xl font-bold">
              {brandFilter !== 'all' 
                ? Math.round(1780 * 0.3).toLocaleString() // Demo için
                : '1,780'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="brands">Marka Performansı</TabsTrigger>
          <TabsTrigger value="comparison">Marka Karşılaştırması</TabsTrigger>
          <TabsTrigger value="customers">Müşteri Segmentleri</TabsTrigger>
          <TabsTrigger value="campaigns">Kampanya Performansı</TabsTrigger>
          <TabsTrigger value="ecommerce">E-Ticaret</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aylık Performans Trendleri</CardTitle>
              <CardDescription>
                {brandFilter === 'all' 
                  ? 'Son 5 aydaki müşteri, mesaj ve satış verileriniz' 
                  : `Son 5 aydaki ${brandList.find(b => b.id === brandFilter)?.name} markasının verileri`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" name="Müşteriler" />
                  <Area type="monotone" dataKey="messages" stroke="#82ca9d" fill="#82ca9d" name="Mesajlar" />
                  <Area type="monotone" dataKey="sales" stroke="#ffc658" fill="#ffc658" name="Satışlar" />
                  <Area type="monotone" dataKey="revenue" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} name="Gelir (₺100)" />
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
                      data={filteredData.customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {filteredData.customerSegmentData.map((entry, index) => (
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
                    data={filteredData.campaignPerformanceData.map(item => ({
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
              <CardDescription>
                {brandFilter === 'all' 
                  ? 'Tüm markaların performans metrikleri'
                  : `${brandList.find(b => b.id === brandFilter)?.name} performans metrikleri`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.brandPerformanceData}>
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
            {filteredData.brandPerformanceData.map((brand, index) => (
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
                    <div className="flex items-center justify-between font-medium">
                      <dt className="text-sm">Toplam Gelir:</dt>
                      <dd className="text-sm">{brand.revenue.toLocaleString()}₺</dd>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <dt className="text-sm">Müşteri Memnuniyeti:</dt>
                      <dd className="text-sm">{brand.csat}/100</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Brand Comparison Tab - YENİ */}
        <TabsContent value="comparison" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marka Karşılaştırma Analizi</CardTitle>
              <CardDescription>
                Farklı markaların performans göstergelerinin detaylı karşılaştırması
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={filteredData.brandComparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                  <Radar name="Moda Markası" dataKey="modaMarkasi" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Teknoloji Markası" dataKey="teknolojiMarkasi" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="Kozmetik Markası" dataKey="kozmetikMarkasi" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Detaylı Marka Karşılaştırması</CardTitle>
                <CardDescription>
                  Tüm markaların kritik performans göstergelerinin karşılaştırmalı değerlendirmesi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left pb-2 font-medium">Metrik</th>
                        <th className="text-center pb-2 font-medium">Moda Markası</th>
                        <th className="text-center pb-2 font-medium">Teknoloji Markası</th>
                        <th className="text-center pb-2 font-medium">Kozmetik Markası</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.brandComparisonData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                          <td className="py-2">{item.metric}</td>
                          <td className="text-center py-2">{item.modaMarkasi}</td>
                          <td className="text-center py-2">{item.teknolojiMarkasi}</td>
                          <td className="text-center py-2">{item.kozmetikMarkasi}</td>
                        </tr>
                      ))}
                      <tr className="bg-muted/50">
                        <td className="py-2">Toplam Müşteri</td>
                        <td className="text-center py-2">3,500</td>
                        <td className="text-center py-2">2,800</td>
                        <td className="text-center py-2">4,200</td>
                      </tr>
                      <tr>
                        <td className="py-2">Toplam Gelir (₺)</td>
                        <td className="text-center py-2">232,000</td>
                        <td className="text-center py-2">378,000</td>
                        <td className="text-center py-2">195,000</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="py-2">Satış Adedi</td>
                        <td className="text-center py-2">580</td>
                        <td className="text-center py-2">420</td>
                        <td className="text-center py-2">780</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Segment Dağılımı</CardTitle>
                <CardDescription>
                  {brandFilter === 'all' 
                    ? 'Aktif müşterilerin segment dağılımı' 
                    : `${brandList.find(b => b.id === brandFilter)?.name} müşteri segmentleri`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredData.customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {filteredData.customerSegmentData.map((entry, index) => (
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
                <CardDescription>
                  {brandFilter === 'all' 
                    ? 'Segment başına müşteri değeri ve etkileşim' 
                    : `${brandList.find(b => b.id === brandFilter)?.name} segment performansı`
                  }
                </CardDescription>
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
              <CardDescription>
                {brandFilter === 'all' 
                  ? 'Tüm kampanyaların performans metrikleri' 
                  : `${brandList.find(b => b.id === brandFilter)?.name} kampanya metrikleri`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.campaignPerformanceData}>
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
            {filteredData.campaignPerformanceData.map((campaign, index) => (
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

        {/* E-Ticaret Tab */}
        <TabsContent value="ecommerce" className="space-y-4 mt-4">
          {filteredData.ecommerceData.isApiConnected ? (
            <>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {filteredData.ecommerceData.revenue.total.toLocaleString()}₺
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {filteredData.ecommerceData.revenue.monthly.length > 1 ? 
                          filteredData.ecommerceData.revenue.monthly[filteredData.ecommerceData.revenue.monthly.length - 1].growth : 0}% 
                      </span>
                      son aya göre artış
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {filteredData.ecommerceData.orders.total}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {filteredData.ecommerceData.orders.completed} tamamlandı
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">İşlemdeki Siparişler</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {filteredData.ecommerceData.orders.processing}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {filteredData.ecommerceData.orders.cancelled} iptal edildi
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Sipariş Değeri</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {filteredData.ecommerceData.orders.averageValue}₺
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {filteredData.ecommerceData.products.total} farklı ürün
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Aylık Gelir Trendi</CardTitle>
                    <CardDescription>
                      {brandFilter === 'all' 
                        ? 'Son 5 aylık gelir trendi' 
                        : `${brandList.find(b => b.id === brandFilter)?.name} son 5 ay gelir trendi`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={filteredData.ecommerceData.revenue.monthly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" name="Gelir (₺)" fill="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="orders" name="Sipariş Sayısı" stroke="#ff7300" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>En Çok Satan Ürünler</CardTitle>
                    <CardDescription>
                      {brandFilter === 'all' 
                        ? 'En çok gelir getiren 5 ürün' 
                        : `${brandList.find(b => b.id === brandFilter)?.name} en çok satılan ürünleri`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredData.ecommerceData.products.topSelling.map((product, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-grow">
                            <div className="text-sm font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.sold} adet satış</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{product.revenue.toLocaleString()}₺</div>
                            <div className="text-xs text-muted-foreground">{Math.round(product.revenue / product.sold)}₺/adet</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Günlük Gelir Detayı</CardTitle>
                  <CardDescription>
                    Son 7 günün detaylı gelir ve sipariş analizi
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left pb-2 font-medium">Tarih</th>
                        <th className="text-center pb-2 font-medium">Sipariş Sayısı</th>
                        <th className="text-center pb-2 font-medium">Toplam Gelir</th>
                        <th className="text-center pb-2 font-medium">Ortalama Sipariş Değeri</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.ecommerceData.revenue.daily.map((day, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                          <td className="py-2">{day.date}</td>
                          <td className="text-center py-2">{day.orders}</td>
                          <td className="text-center py-2">{day.revenue.toLocaleString()}₺</td>
                          <td className="text-center py-2">{Math.round(day.revenue / (day.orders || 1)).toLocaleString()}₺</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>E-Ticaret API Bağlantısı Gerekiyor</CardTitle>
                <CardDescription>
                  Detaylı e-ticaret verilerini görüntülemek için bir e-ticaret platformuna bağlantı kurmanız gerekmektedir.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center max-w-md text-muted-foreground mb-6">
                  Müşterilerinizin sipariş davranışlarını analiz etmek, satış performansını ölçmek ve 
                  e-ticaret stratejinizi optimize etmek için API entegrasyonunu tamamlayın.
                </p>
                <Button>
                  API Entegrasyonlarına Git
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAnalytics;
