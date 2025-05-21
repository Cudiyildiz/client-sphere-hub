
import React, { useState } from "react";
import { Server, Database, BarChart3, HardDrive, Calendar, Download, CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  LineChart,
  Line,
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
import { Progress } from "@/components/ui/progress";

// Types for analytics data
interface ResourceUsage {
  name: string;
  usage: number;
  limit: number;
  unit: string;
}

interface DatabaseMetric {
  name: string;
  reads: number;
  writes: number;
  storage: number;
}

interface MonthlyUsage {
  month: string;
  apiCalls: number;
  storage: number;
  bandwidth: number;
}

interface CostBreakdown {
  name: string;
  value: number;
}

// Mock Data
const resourceUsageData: ResourceUsage[] = [
  { name: 'Railway CPU', usage: 45, limit: 100, unit: 'vCPU' },
  { name: 'Railway RAM', usage: 2.8, limit: 4, unit: 'GB' },
  { name: 'Railway Storage', usage: 6.2, limit: 10, unit: 'GB' },
  { name: 'Cloudinary Storage', usage: 4.1, limit: 10, unit: 'GB' },
  { name: 'Cloudinary Bandwidth', usage: 18.5, limit: 25, unit: 'GB' }
];

const databaseMetricsData: DatabaseMetric[] = [
  { name: 'users', reads: 12500, writes: 450, storage: 0.8 },
  { name: 'brands', reads: 8200, writes: 320, storage: 0.5 },
  { name: 'campaigns', reads: 15400, writes: 780, storage: 1.2 },
  { name: 'customers', reads: 28700, writes: 1250, storage: 3.6 },
  { name: 'messages', reads: 32600, writes: 8900, storage: 2.1 }
];

const monthlyUsageData: MonthlyUsage[] = [
  { month: 'Ocak', apiCalls: 18500, storage: 2.1, bandwidth: 15.2 },
  { month: 'Şubat', apiCalls: 21200, storage: 2.4, bandwidth: 16.8 },
  { month: 'Mart', apiCalls: 25800, storage: 3.1, bandwidth: 18.5 },
  { month: 'Nisan', apiCalls: 32400, storage: 3.8, bandwidth: 22.3 },
  { month: 'Mayıs', apiCalls: 38900, storage: 4.1, bandwidth: 24.7 }
];

const costBreakdownData: CostBreakdown[] = [
  { name: 'Railway Server', value: 45 },
  { name: 'Database', value: 25 },
  { name: 'Cloudinary Storage', value: 15 },
  { name: 'Email Service', value: 10 },
  { name: 'API Gateways', value: 5 }
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SystemMonitoring: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('last30days');

  const renderResourceUsage = (resource: ResourceUsage) => {
    const percentage = Math.round((resource.usage / resource.limit) * 100);
    let statusColor = "text-green-500";
    
    if (percentage > 80) {
      statusColor = "text-red-500";
    } else if (percentage > 60) {
      statusColor = "text-yellow-500";
    }

    return (
      <div key={resource.name} className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{resource.name}</span>
          <span className={`text-sm ${statusColor}`}>
            {resource.usage} / {resource.limit} {resource.unit}
          </span>
        </div>
        <Progress value={percentage} className={percentage > 80 ? "bg-red-100" : percentage > 60 ? "bg-yellow-100" : "bg-green-100"} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Sistem İstatistikleri</h1>
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
            <Download className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Çağrıları</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38,900</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+20%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Veri Depolama</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.3 GB</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bant Genişliği</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.7 GB</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+11%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aylık Maliyet</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-500">+5%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="resources">Kaynak Kullanımı</TabsTrigger>
          <TabsTrigger value="database">Veritabanı İstatistikleri</TabsTrigger>
          <TabsTrigger value="costs">Maliyet Analizi</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Kullanım Trendleri</CardTitle>
              <CardDescription>Son 5 aydaki sistem kullanım verileri</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="apiCalls" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="API Çağrıları" 
                  />
                  <Area 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="storage" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Depolama (GB)" 
                    unit=" GB"
                  />
                  <Area 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="bandwidth" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    name="Bant Genişliği (GB)" 
                    unit=" GB"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Maliyet Dağılımı</CardTitle>
                <CardDescription>Hizmet bazında maliyet dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Maliyet"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Çok Kullanılan Tablolar</CardTitle>
                <CardDescription>Veritabanı okuma yazma işlemleri</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={databaseMetricsData.map(metric => ({
                      name: metric.name,
                      reads: metric.reads,
                      writes: metric.writes,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reads" name="Okuma İşlemleri" fill="#0088FE" />
                    <Bar dataKey="writes" name="Yazma İşlemleri" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Kaynak Kullanım Detayları</CardTitle>
              <CardDescription>Her hizmet için mevcut kaynak kullanım durumu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {resourceUsageData.map(resource => renderResourceUsage(resource))}
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Kullanım Geçmişi</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyUsageData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="apiCalls" 
                        name="API Çağrıları"
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="storage" 
                        name="Depolama (GB)" 
                        stroke="#82ca9d" 
                        unit=" GB"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="bandwidth" 
                        name="Bant Genişliği (GB)" 
                        stroke="#ffc658" 
                        unit=" GB"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Detaylı Rapor İndir</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Railway Sunucu İstatistikleri</CardTitle>
                <CardDescription>Sunucu performansı ve sağlık durumu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">CPU Kullanımı</span>
                    <span className="text-sm text-green-500">Normal</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>45%</span>
                    <span>Ortalama: 38%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Bellek Kullanımı</span>
                    <span className="text-sm text-green-500">Normal</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2.8 GB / 4 GB</span>
                    <span>Ortalama: 2.5 GB</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Disk Kullanımı</span>
                    <span className="text-sm text-yellow-500">Dikkat</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>6.2 GB / 10 GB</span>
                    <span>Ortalama: 6.0 GB</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tepki Süreleri</span>
                    <span className="text-sm text-green-500">İyi</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="font-medium">120ms</div>
                      <div className="text-xs text-muted-foreground">Ortalama</div>
                    </div>
                    <div>
                      <div className="font-medium">95ms</div>
                      <div className="text-xs text-muted-foreground">p90</div>
                    </div>
                    <div>
                      <div className="font-medium">250ms</div>
                      <div className="text-xs text-muted-foreground">p99</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloudinary İstatistikleri</CardTitle>
                <CardDescription>Medya depolama ve dağıtım istatistikleri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Depolama Kullanımı</span>
                    <span className="text-sm text-green-500">Normal</span>
                  </div>
                  <Progress value={41} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4.1 GB / 10 GB</span>
                    <span>Son ay: +0.3 GB</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Bant Genişliği Kullanımı</span>
                    <span className="text-sm text-yellow-500">Dikkat</span>
                  </div>
                  <Progress value={74} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>18.5 GB / 25 GB</span>
                    <span>Son ay: +2.1 GB</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Dosya Türü Dağılımı</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Görseller', value: 65 },
                            { name: 'Dokümanlar', value: 20 },
                            { name: 'Videolar', value: 10 },
                            { name: 'Diğer', value: 5 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Kullanım"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Veritabanı Performansı</CardTitle>
              <CardDescription>Tablo bazında okuma ve yazma işlemleri</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={databaseMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reads" name="Okuma İşlemleri" fill="#0088FE" />
                  <Bar dataKey="writes" name="Yazma İşlemleri" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Veritabanı Depolama Kullanımı</CardTitle>
                <CardDescription>Tablo bazında depolama alanı kullanımı</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={databaseMetricsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="storage"
                      nameKey="name"
                      label={({name, value, percent}) => `${name}: ${value.toFixed(1)} GB (${(percent * 100).toFixed(0)}%)`}
                    >
                      {databaseMetricsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(1)} GB`, "Depolama"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Veritabanı Sorgulama İstatistikleri</CardTitle>
                <CardDescription>Ortalama sorgu süreleri ve sayıları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Ortalama Sorgu Süresi</span>
                      <span className="text-sm text-green-500">42ms</span>
                    </div>
                    <Progress value={42} className="h-2" max={200} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>İyi</span>
                      <span>Limit: 200ms</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Günlük Sorgu Sayısı</div>
                      <div className="text-2xl font-bold">52,450</div>
                      <div className="text-xs text-green-500">+8% geçen haftaya göre</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Başarısız Sorgu Oranı</div>
                      <div className="text-2xl font-bold">0.05%</div>
                      <div className="text-xs text-green-500">-0.02% geçen haftaya göre</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Veritabanı Boyutu</div>
                      <div className="text-2xl font-bold">8.2 GB</div>
                      <div className="text-xs text-yellow-500">+0.4 GB son aya göre</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Yedekleme Durumu</div>
                      <div className="text-xl font-bold text-green-500">Güncel</div>
                      <div className="text-xs">Son yedekleme: Bugün 04:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>En Yavaş Sorgular</CardTitle>
              <CardDescription>Performans optimizasyonu gerektiren sorgular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Sorgu</th>
                      <th className="px-6 py-3">Avg. Süre</th>
                      <th className="px-6 py-3">Çağrı Sayısı</th>
                      <th className="px-6 py-3">Son Çalışma</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">SELECT * FROM customers WHERE segment = ?</td>
                      <td className="px-6 py-4 text-yellow-500">250ms</td>
                      <td className="px-6 py-4">4,520</td>
                      <td className="px-6 py-4">10 dk önce</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">SELECT * FROM messages WHERE campaign_id = ?</td>
                      <td className="px-6 py-4 text-red-500">320ms</td>
                      <td className="px-6 py-4">2,840</td>
                      <td className="px-6 py-4">25 dk önce</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">UPDATE customers SET last_activity = ? WHERE id = ?</td>
                      <td className="px-6 py-4 text-yellow-500">180ms</td>
                      <td className="px-6 py-4">8,950</td>
                      <td className="px-6 py-4">2 dk önce</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Costs Tab */}
        <TabsContent value="costs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maliyet Dağılımı</CardTitle>
              <CardDescription>Hizmet bazında maliyet dağılımı</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, value, percent}) => `${name}: $${value} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Maliyet"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="text-muted-foreground">Toplam Aylık Maliyet</div>
                <div className="text-xl font-bold">$250</div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Maliyet Trendleri</CardTitle>
                <CardDescription>Aylık maliyet değişimi</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Ocak', cost: 210 },
                      { month: 'Şubat', cost: 220 },
                      { month: 'Mart', cost: 230 },
                      { month: 'Nisan', cost: 240 },
                      { month: 'Mayıs', cost: 250 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Maliyet"]} />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      name="Toplam Maliyet" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Maliyet Optimizasyon Önerileri</CardTitle>
                <CardDescription>Maliyetleri azaltma önerileri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-green-50">
                    <h4 className="font-medium text-green-700">Kullanılmayan Kaynak Temizliği</h4>
                    <p className="text-sm text-green-600 mt-1">Kullanılmayan depolama alanlarını temizleyerek aylık $15 tasarruf edilebilir.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-blue-50">
                    <h4 className="font-medium text-blue-700">Abonelik Planı Değişikliği</h4>
                    <p className="text-sm text-blue-600 mt-1">Yıllık ödeme planına geçerek %10 tasarruf sağlanabilir.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-yellow-50">
                    <h4 className="font-medium text-yellow-700">API Optimizasyonu</h4>
                    <p className="text-sm text-yellow-600 mt-1">Mevcut API çağrılarını optimize ederek aylık $10 tasarruf edilebilir.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Detaylı Maliyet Analizi</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Beklenen Maliyet Projeksiyonu</CardTitle>
              <CardDescription>Önümüzdeki 6 ay için maliyet tahmini</CardDescription>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: 'Haziran', cost: 260, optimizedCost: 235 },
                    { month: 'Temmuz', cost: 275, optimizedCost: 245 },
                    { month: 'Ağustos', cost: 290, optimizedCost: 255 },
                    { month: 'Eylül', cost: 310, optimizedCost: 270 },
                    { month: 'Ekim', cost: 330, optimizedCost: 280 },
                    { month: 'Kasım', cost: 350, optimizedCost: 290 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Maliyet"]} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    name="Mevcut Eğilim" 
                    stroke="#ff7300" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="optimizedCost" 
                    name="Optimize Edilmiş" 
                    stroke="#2e7d32"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <div className="w-full text-sm text-muted-foreground">
                Optimizasyon önerileri uygulanırsa 6 ayda <span className="font-medium text-green-600">$320</span> tasarruf edilebilir.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoring;
