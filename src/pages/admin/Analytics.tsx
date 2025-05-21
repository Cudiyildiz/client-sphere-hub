
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, HardDrive, Server, Database, CloudCog, ArrowDownload } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Mock data for system usage statistics
const systemUsageData = [
  { name: 'Ocak', railway: 85, cloudinary: 65, supabase: 75 },
  { name: 'Şubat', railway: 88, cloudinary: 70, supabase: 78 },
  { name: 'Mart', railway: 92, cloudinary: 75, supabase: 80 },
  { name: 'Nisan', railway: 96, cloudinary: 85, supabase: 86 },
  { name: 'Mayıs', railway: 102, cloudinary: 90, supabase: 95 },
  { name: 'Haziran', railway: 110, cloudinary: 95, supabase: 100 },
];

const storageUsageData = [
  { name: 'Medya Dosyaları', value: 65 },
  { name: 'Veritabanı', value: 25 },
  { name: 'Log Dosyaları', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const serverMetricsData = [
  { name: 'Pazartesi', cpu: 65, bellek: 72, disk: 45 },
  { name: 'Salı', cpu: 68, bellek: 75, disk: 48 },
  { name: 'Çarşamba', cpu: 73, bellek: 80, disk: 52 },
  { name: 'Perşembe', cpu: 80, bellek: 85, disk: 55 },
  { name: 'Cuma', cpu: 85, bellek: 82, disk: 58 },
  { name: 'Cumartesi', cpu: 60, bellek: 70, disk: 50 },
  { name: 'Pazar', cpu: 55, bellek: 65, disk: 42 },
];

const apiCallsData = [
  { name: 'Kullanıcı İşlemleri', value: 40 },
  { name: 'Marka İşlemleri', value: 25 },
  { name: 'Kampanyalar', value: 20 },
  { name: 'Diğer', value: 15 },
];

const bandwidthDataByMonth = [
  { name: 'Ocak', gelen: 125, giden: 85 },
  { name: 'Şubat', gelen: 145, giden: 95 },
  { name: 'Mart', gelen: 160, giden: 110 },
  { name: 'Nisan', gelen: 180, giden: 125 },
  { name: 'Mayıs', gelen: 200, giden: 140 },
  { name: 'Haziran', gelen: 230, giden: 160 },
];

// Custom tooltip for charts that need numeric formatting
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Sistem İstatistikleri</h1>
        <div className="flex gap-2">
          <Select 
            defaultValue={timeframe} 
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zaman Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Günlük</SelectItem>
              <SelectItem value="weekly">Haftalık</SelectItem>
              <SelectItem value="monthly">Aylık</SelectItem>
              <SelectItem value="yearly">Yıllık</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <ArrowDownload className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Railway Kullanımı</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110 GB</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">8%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cloudinary Kullanımı</CardTitle>
            <CloudCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95 GB</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">5%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SupaBase Kullanımı</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100 GB</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">5%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Depolama</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">305 GB</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">6.2%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="system-usage" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="system-usage">Sistem Kullanımı</TabsTrigger>
          <TabsTrigger value="server-metrics">Sunucu Metrikleri</TabsTrigger>
          <TabsTrigger value="storage">Depolama Analizi</TabsTrigger>
          <TabsTrigger value="api-calls">API Kullanımı</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system-usage">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Kullanım Trendi</CardTitle>
              <CardDescription>
                Aylık platform servis kullanım değerleri (GB olarak)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={systemUsageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="railway" stroke="#8884d8" activeDot={{ r: 8 }} name="Railway" />
                    <Line type="monotone" dataKey="cloudinary" stroke="#82ca9d" name="Cloudinary" />
                    <Line type="monotone" dataKey="supabase" stroke="#ffc658" name="Supabase" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Railway Kullanım Detayı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CPU Kullanımı</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Bellek Kullanımı</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Disk Kullanımı</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Cloudinary Kullanım Detayı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Resim Dosyaları</span>
                        <span className="text-sm font-medium">60 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Video Dosyaları</span>
                        <span className="text-sm font-medium">30 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Diğer Medya</span>
                        <span className="text-sm font-medium">5 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Supabase Kullanım Detayı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Veritabanı</span>
                        <span className="text-sm font-medium">75 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dosya Depolama</span>
                        <span className="text-sm font-medium">20 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Edge Fonksiyonları</span>
                        <span className="text-sm font-medium">5 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="server-metrics">
          <Card>
            <CardHeader>
              <CardTitle>Sunucu Performans Metrikleri</CardTitle>
              <CardDescription>
                Haftalık sunucu kaynak kullanım değerleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={serverMetricsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="cpu" fill="#8884d8" name="CPU (%)" />
                    <Bar dataKey="bellek" fill="#82ca9d" name="Bellek (%)" />
                    <Bar dataKey="disk" fill="#ffc658" name="Disk I/O (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Bant Genişliği Kullanımı</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={bandwidthDataByMonth}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="gelen" stroke="#8884d8" name="Gelen Trafik (GB)" />
                      <Line type="monotone" dataKey="giden" stroke="#82ca9d" name="Giden Trafik (GB)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Depolama Alanı Analizi</CardTitle>
              <CardDescription>
                Depolama alanı dağılımı ve kullanım detayları
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[350px] h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={storageUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {storageUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Medya Dosyaları (65%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Resimler</span>
                        <span className="text-sm font-medium">120 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Videolar</span>
                        <span className="text-sm font-medium">70 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dokümanlar</span>
                        <span className="text-sm font-medium">8.5 GB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Veritabanı (25%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Kullanıcı Verileri</span>
                        <span className="text-sm font-medium">12 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Kampanya Verileri</span>
                        <span className="text-sm font-medium">35 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Diğer Veriler</span>
                        <span className="text-sm font-medium">29.5 GB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Log Dosyaları (10%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sistem Logları</span>
                        <span className="text-sm font-medium">15 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Kullanıcı Aktivitesi</span>
                        <span className="text-sm font-medium">12 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Hata Logları</span>
                        <span className="text-sm font-medium">3 GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-calls">
          <Card>
            <CardHeader>
              <CardTitle>API Çağrıları Analizi</CardTitle>
              <CardDescription>
                Sistem API'lerinin kullanım dağılımı ve performans metrikleri
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[350px] h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={apiCallsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {apiCallsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">API Performans Özeti</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ortalama Yanıt Süresi</span>
                        <span className="text-sm font-medium">120 ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">99. Yüzdelik Yanıt Süresi</span>
                        <span className="text-sm font-medium">450 ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Hata Oranı</span>
                        <span className="text-sm font-medium">0.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Toplam API İsteği (Bu ay)</span>
                        <span className="text-sm font-medium">2.4M</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">En Yoğun API Endpoint'leri</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">/api/messages</span>
                        <span className="text-sm font-medium">750K istek</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">/api/users/auth</span>
                        <span className="text-sm font-medium">520K istek</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">/api/campaigns</span>
                        <span className="text-sm font-medium">320K istek</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">/api/analytics</span>
                        <span className="text-sm font-medium">290K istek</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
