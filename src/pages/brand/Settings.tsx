import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, User, Building, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  position: z.string().min(2, { message: "Pozisyon bilgisi gereklidir." }),
});

const brandFormSchema = z.object({
  brandName: z.string().min(2, { message: "Marka adı en az 2 karakter olmalıdır." }),
  brandEmail: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  brandPhone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  brandWebsite: z.string().url({ message: "Geçerli bir web sitesi adresi giriniz." }),
  address: z.string().min(5, { message: "Adres bilgisi gereklidir." }),
});

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  campaignAlerts: z.boolean(),
  customerMessages: z.boolean(),
  weeklyReports: z.boolean(),
  systemUpdates: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type BrandFormValues = z.infer<typeof brandFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const BrandSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Profile Form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Marka Operatörü",
      email: "operator@ornek.com",
      phone: "05551234567",
      position: "Marka Yöneticisi",
    },
  });

  // Brand Form
  const brandForm = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brandName: "Örnek Marka",
      brandEmail: "info@ornek.com",
      brandPhone: "08502123456",
      brandWebsite: "https://www.ornek.com",
      address: "Örnek Mahallesi, Örnek Caddesi No:123 İstanbul/Türkiye",
    },
  });

  // Notifications Form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      campaignAlerts: true,
      customerMessages: true,
      weeklyReports: false,
      systemUpdates: true,
    },
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Profile data submitted:", data);
      setIsLoading(false);
      
      toast({
        title: "Profil Güncellendi",
        description: "Kullanıcı profil bilgileri başarıyla güncellendi.",
      });
    }, 1000);
  };

  const onBrandSubmit = async (data: BrandFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Brand data submitted:", data);
      setIsLoading(false);
      
      toast({
        title: "Marka Bilgileri Güncellendi",
        description: "Marka bilgileri başarıyla güncellendi.",
      });
    }, 1000);
  };

  const onNotificationSubmit = async (data: NotificationFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Notification settings submitted:", data);
      setIsLoading(false);
      
      toast({
        title: "Bildirim Ayarları Güncellendi",
        description: "Bildirim tercihleriniz başarıyla güncellendi.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground">
          Marka ve kullanıcı hesap ayarlarınızı yönetin.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="brand">Marka Bilgileri</TabsTrigger>
          <TabsTrigger value="notifications">Bildirim Ayarları</TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Kişisel bilgilerinizi ve iletişim bilgilerinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  id="profile-form"
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İsim Soyisim</FormLabel>
                        <FormControl>
                          <Input placeholder="İsim Soyisim" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ornek@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon Numarası</FormLabel>
                        <FormControl>
                          <Input placeholder="05XX XXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pozisyon</FormLabel>
                        <FormControl>
                          <Input placeholder="Pozisyon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                form="profile-form"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Kaydediliyor..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Değişiklikleri Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesap güvenliği için periyodik olarak şifrenizi değiştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="current-password" className="text-sm font-medium">Mevcut Şifre</label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="new-password" className="text-sm font-medium">Yeni Şifre</label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">Yeni Şifre (Tekrar)</label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Şifreyi Değiştir</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Brand Settings */}
        <TabsContent value="brand" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marka Bilgileri</CardTitle>
              <CardDescription>
                Marka bilgilerinizi ve iletişim detaylarını güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...brandForm}>
                <form
                  id="brand-form"
                  onSubmit={brandForm.handleSubmit(onBrandSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={brandForm.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marka Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="Marka Adı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={brandForm.control}
                      name="brandEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marka E-posta</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="info@markam.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={brandForm.control}
                      name="brandPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marka Telefonu</FormLabel>
                          <FormControl>
                            <Input placeholder="0850 XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={brandForm.control}
                    name="brandWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Web Sitesi</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.markam.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={brandForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adres</FormLabel>
                        <FormControl>
                          <Input placeholder="Adres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                form="brand-form"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Kaydediliyor..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Değişiklikleri Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirim ve uyarıları almak istediğinizi yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  id="notification-form"
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel>E-posta Bildirimleri</FormLabel>
                            <FormDescription>
                              Sistem bildirimleri e-posta ile gönderilir.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={notificationForm.control}
                      name="campaignAlerts"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel>Kampanya Uyarıları</FormLabel>
                            <FormDescription>
                              Kampanyalar hakkında güncellemeler ve bilgiler.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="customerMessages"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel>Müşteri Mesajları</FormLabel>
                            <FormDescription>
                              Müşterilerden yeni mesaj geldiğinde bildirim.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="weeklyReports"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel>Haftalık Raporlar</FormLabel>
                            <FormDescription>
                              Haftalık performans raporları e-posta olarak gönderilir.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="systemUpdates"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel>Sistem Güncellemeleri</FormLabel>
                            <FormDescription>
                              Platform güncellemeleri ve yeni özellikler hakkında bilgilendirme.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                form="notification-form"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Kaydediliyor..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Ayarları Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandSettings;
