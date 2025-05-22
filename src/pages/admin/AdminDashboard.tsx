import React from 'react';
import { Users, Building2, CreditCard, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-5 w-5 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3 text-green-500" />
          <span className="text-green-500">{change}</span> geçen aydan
        </p>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Paneli</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Toplam Personel"
          value="12"
          icon={<Users className="h-4 w-4" />}
          change="2.5%"
        />
        <StatCard
          title="Toplam Markalar"
          value="36"
          icon={<Building2 className="h-4 w-4" />}
          change="10.3%"
        />
        <StatCard
          title="Aylık Gelir"
          value="₺12,234"
          icon={<CreditCard className="h-4 w-4" />}
          change="4.1%"
        />
        <StatCard
          title="Aktif Abonelikler"
          value="28"
          icon={<Users className="h-4 w-4" />}
          change="3.2%"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Personel Aktivitesi</CardTitle>
            <CardDescription>Personel üyelerinden son işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', action: 'Yeni marka hesabı oluşturdu', time: '2 saat önce' },
                { name: 'Sarah Smith', action: 'Kampanya ayarlarını güncelledi', time: '5 saat önce' },
                { name: 'Mark Johnson', action: 'Müşteri talebini çözdü', time: '1 gün önce' },
                { name: 'Emily Davis', action: 'Yeni personel üyesi ekledi', time: '2 gün önce' },
              ].map((item, i) => (
                <div key={i} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {item.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
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
            <CardTitle>Yeni Marka Kayıtları</CardTitle>
            <CardDescription>Yeni katılan markalar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Acme Inc.', plan: 'Premium Plan', date: '15 Mayıs 2025' },
                { name: 'Tech Solutions', plan: 'Standart Plan', date: '12 Mayıs 2025' },
                { name: 'Global Foods', plan: 'Premium Plan', date: '10 Mayıs 2025' },
                { name: 'Urban Fashion', plan: 'Temel Plan', date: '8 Mayıs 2025' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.plan}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
