import React from 'react';
import { Building2, MessageSquare, CheckCircle, Clock, Link2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// API entegrasyonu için örnek veri
const apiIntegrations = [
  { id: 1, brand: 'Akme Şirket', api: 'Shopify', status: 'active', icon: '🛒', lastSync: '2 saat önce' },
  { id: 2, brand: 'Tech Çözümleri', api: 'HubSpot', status: 'active', icon: '🔄', lastSync: '5 saat önce' },
  { id: 3, brand: 'Global Yiyecek', api: 'Mailchimp', status: 'error', icon: '📧', lastSync: '1 gün önce' }
];

const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToApiIntegrations = () => {
    navigate('/staff/api-integrations');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Personel Paneli</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atanmış Markalar</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Bu ay 4 yeni</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açık Talepler</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">6 tanesi ilgi bekliyor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Çözülen Vakalar</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">129</div>
            <p className="text-xs text-muted-foreground">Bu hafta 32</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Yanıt</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4s</div>
            <p className="text-xs text-muted-foreground">Hedeften 0.5s daha hızlı</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Marka Aktiviteleri</CardTitle>
            <CardDescription>Atanmış markalarınızdan en son güncellemeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { brand: 'Akme Şirket', action: 'Yeni kampanya başlattı', time: '1 saat önce' },
                { brand: 'Tech Çözümleri', action: 'Müşteri verilerini güncelledi', time: '3 saat önce' },
                { brand: 'Global Yiyecek', action: 'Destek talebi oluşturdu', time: '5 saat önce' },
                { brand: 'Şehir Modası', action: 'Yeni takım üyesi ekledi', time: '1 gün önce' },
              ].map((item, i) => (
                <div key={i} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {item.brand.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.brand}</p>
                    <p className="text-sm text-muted-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Acil Talepler</CardTitle>
            <CardDescription>İlgi gerektiren müşteri destek talepleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { brand: 'Akme Şirket', issue: 'Kampanya doğru verileri göstermiyor', priority: 'Yüksek' },
                { brand: 'Tech Çözümleri', issue: 'Müşteri kayıtlarına erişilemiyor', priority: 'Kritik' },
                { brand: 'Global Yiyecek', issue: 'Abonelik faturasında tutarsızlık', priority: 'Orta' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      {item.brand.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.brand}</p>
                      <p className="text-xs text-muted-foreground">{item.issue}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        item.priority === 'Kritik' ? 'bg-red-100 text-red-800' : 
                        item.priority === 'Yüksek' ? 'bg-orange-100 text-orange-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Yanıtla</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Entegrasyonları Bölümü */}
      <Card>
        <CardHeader className="flex justify-between items-start">
          <div>
            <CardTitle>API Entegrasyonları</CardTitle>
            <CardDescription>Marka API bağlantıları ve durumları</CardDescription>
          </div>
          <Button onClick={handleNavigateToApiIntegrations}>
            Tüm Entegrasyonlar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiIntegrations.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-slate-100">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{item.brand}</p>
                      <Badge variant={item.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                        {item.status === 'active' ? 'Aktif' : 'Hata'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Link2 className="mr-1 h-3 w-3" />
                      {item.api} API
                    </p>
                    <p className="text-xs text-muted-foreground">Son senkronizasyon: {item.lastSync}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleNavigateToApiIntegrations}>
                  Yönet
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-slate-50 px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Markaların API entegrasyonlarını yönetmek ve yeni eklemek için API Entegrasyonları sayfasını ziyaret edin.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffDashboard;
