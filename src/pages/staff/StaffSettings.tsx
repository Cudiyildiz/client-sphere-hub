
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const StaffSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Personel Ayarları</h1>
        <Button>Değişiklikleri Kaydet</Button>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Kişisel bilgilerinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input id="name" defaultValue="Ali Yılmaz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" defaultValue="ali.yilmaz@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" defaultValue="+90 555 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departman</Label>
                  <Input id="department" defaultValue="Marka Yönetimi" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Çalışma Bilgileri</CardTitle>
              <CardDescription>
                Çalışma ve sorumluluk alanı bilgileri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Pozisyon</Label>
                  <Input id="position" defaultValue="Kıdemli Marka Yöneticisi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">İşe Başlama Tarihi</Label>
                  <Input id="startDate" type="date" defaultValue="2022-03-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Yönetici</Label>
                  <Input id="manager" defaultValue="Murat Can" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedBrands">Sorumlu Olduğu Marka Sayısı</Label>
                  <Input id="assignedBrands" defaultValue="12" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>
                Hangi bildirimler alacağınızı belirleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>E-posta Bildirimleri</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Günlük özet e-postaları alın.
                  </span>
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                  <span>Anlık Bildirimler</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Uygulama içi anlık bildirim alın.
                  </span>
                </Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="brand-alerts" className="flex flex-col space-y-1">
                  <span>Marka Uyarıları</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Sorumlu olduğunuz markalardaki önemli değişikliklerden haberdar olun.
                  </span>
                </Label>
                <Switch id="brand-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="campaign-updates" className="flex flex-col space-y-1">
                  <span>Kampanya Güncellemeleri</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Kampanyalardaki performans değişikliklerinden haberdar olun.
                  </span>
                </Label>
                <Switch id="campaign-updates" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştirme</CardTitle>
              <CardDescription>
                Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mevcut Şifre</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Şifreyi Onayla</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button type="submit">Şifreyi Güncelle</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
              <CardDescription>
                Hesabınızı ekstra güvenlik katmanı ile koruyun.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="2fa" className="flex flex-col space-y-1">
                  <span>İki Faktörlü Kimlik Doğrulama</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Giriş yaparken SMS ya da uygulama üzerinden kod alın.
                  </span>
                </Label>
                <Switch id="2fa" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="secure-login" className="flex flex-col space-y-1">
                  <span>Güvenli Oturum Açma</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Alışılmadık giriş aktivitelerinde e-posta bildirimleri alın.
                  </span>
                </Label>
                <Switch id="secure-login" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffSettings;
