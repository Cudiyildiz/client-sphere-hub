
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowUpRight, BarChart, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for brands
const brandData = [
  { 
    id: '1',
    name: 'Akme Şirket',
    industry: 'Teknoloji',
    customers: 1245,
    campaigns: 8,
    activeUsers: 324,
    stats: {
      campaignSuccess: 92,
      customerGrowth: 15,
      responseRate: 89
    }
  },
  { 
    id: '2',
    name: 'Tech Çözümleri',
    industry: 'Yazılım',
    customers: 876,
    campaigns: 5,
    activeUsers: 215,
    stats: {
      campaignSuccess: 84,
      customerGrowth: 7,
      responseRate: 91
    }
  },
  { 
    id: '3',
    name: 'Global Yiyecek',
    industry: 'Gıda',
    customers: 3542,
    campaigns: 12,
    activeUsers: 567,
    stats: {
      campaignSuccess: 76,
      customerGrowth: 24,
      responseRate: 82
    }
  },
  { 
    id: '4',
    name: 'Şehir Modası',
    industry: 'Perakende',
    customers: 2156,
    campaigns: 10,
    activeUsers: 412,
    stats: {
      campaignSuccess: 88,
      customerGrowth: 19,
      responseRate: 86
    }
  },
];

// Chart data
const brandPerformanceData = [
  { name: 'Akme Şirket', performance: 92 },
  { name: 'Tech Çözümleri', performance: 84 },
  { name: 'Global Yiyecek', performance: 76 },
  { name: 'Şehir Modası', performance: 88 },
];

const chartConfig = {
  performance: {
    label: 'Performans',
    theme: {
      light: '#6366f1',
      dark: '#818cf8',
    },
  },
};

const StaffBrands: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Marka Yönetimi</h1>
        <Button>İstatistik Raporu İndir</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Marka</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brandData.length}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">2</span> bu ay eklendi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {brandData.reduce((sum, brand) => sum + brand.customers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Tüm markalar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kampanyalar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {brandData.reduce((sum, brand) => sum + brand.campaigns, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Bu ay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Başarı Oranı</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(brandData.reduce((sum, brand) => sum + brand.stats.campaignSuccess, 0) / brandData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Tüm kampanyalar</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-6">
        <Card className="col-span-6 md:col-span-4">
          <CardHeader>
            <CardTitle>Marka Performans İstatistikleri</CardTitle>
            <CardDescription>Tüm markaların performans karşılaştırması</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[4/3]" config={chartConfig}>
              <RechartsBarChart data={brandPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="performance" fill="var(--color-performance)" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Marka Dağılımı</CardTitle>
            <CardDescription>Sektöre göre dağılım</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(brandData.map(b => b.industry))).map((industry, i) => {
                const count = brandData.filter(b => b.industry === industry).length;
                const percentage = Math.round((count / brandData.length) * 100);
                
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{industry}</span>
                      <span className="text-sm text-muted-foreground">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="h-2 rounded-full bg-primary" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Marka Listesi</CardTitle>
          <CardDescription>Yönettiğiniz tüm markalar</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marka Adı</TableHead>
                <TableHead>Sektör</TableHead>
                <TableHead>Müşteri Sayısı</TableHead>
                <TableHead>Aktif Kampanyalar</TableHead>
                <TableHead>Başarı Oranı</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandData.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.industry}</TableCell>
                  <TableCell>{brand.customers.toLocaleString()}</TableCell>
                  <TableCell>{brand.campaigns}</TableCell>
                  <TableCell>{brand.stats.campaignSuccess}%</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/staff/brands/${brand.id}`}>
                        <span>Detayları Gör</span>
                      </Link>
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

export default StaffBrands;
