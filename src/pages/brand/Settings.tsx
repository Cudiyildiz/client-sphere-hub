
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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

// Security settings schema
const securityFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "Mevcut şifre gereklidir" }),
  newPassword: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
  confirmPassword: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

// Notification settings schema
const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  campaignAlerts: z.boolean().default(true),
  customerMessages: z.boolean().default(true),
  weeklyReports: z.boolean().default(false),
  systemUpdates: z.boolean().default(true),
});

type SecurityFormValues = z.infer<typeof securityFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const BrandSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Security Form
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
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

  const onSecuritySubmit = async (data: SecurityFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Security data submitted:", data);
      setIsLoading(false);
      
      toast({
        title: "Şifre Güncellendi",
        description: "Şifreniz başarıyla değiştirildi.",
      });

      securityForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground">
            Hesap güvenlik ve bildirim ayarlarınızı yönetin.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/brand/profile">Profil Sayfasına Git</Link>
        </Button>
      </div>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="notifications">Bildirim Ayarları</TabsTrigger>
        </TabsList>
        
        {/* Security Settings */}
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesap güvenliği için periyodik olarak şifrenizi değiştirin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form 
                  id="security-form" 
                  onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={securityForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mevcut Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yeni Şifre</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            En az 8 karakter olmalıdır.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şifreyi Onayla</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
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
                form="security-form"
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                {isLoading ? "Kaydediliyor..." : "Şifreyi Değiştir"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
              <CardDescription>
                Hesabınıza ekstra bir güvenlik katmanı ekleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">İki Faktörlü Kimlik Doğrulama</p>
                  <p className="text-sm text-muted-foreground">
                    Giriş yaparken SMS ya da uygulama üzerinden kod alın.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full md:w-auto">
                2FA Yapılandır
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
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
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center py-3 border-b">
                        <div>
                          <FormLabel className="cursor-pointer">E-posta Bildirimleri</FormLabel>
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
                  
                  <FormField
                    control={notificationForm.control}
                    name="campaignAlerts"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center py-3 border-b">
                        <div>
                          <FormLabel className="cursor-pointer">Kampanya Uyarıları</FormLabel>
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
                      <FormItem className="flex justify-between items-center py-3 border-b">
                        <div>
                          <FormLabel className="cursor-pointer">Müşteri Mesajları</FormLabel>
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
                      <FormItem className="flex justify-between items-center py-3 border-b">
                        <div>
                          <FormLabel className="cursor-pointer">Haftalık Raporlar</FormLabel>
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
                      <FormItem className="flex justify-between items-center py-3">
                        <div>
                          <FormLabel className="cursor-pointer">Sistem Güncellemeleri</FormLabel>
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
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                form="notification-form"
                disabled={isLoading}
                className="w-full md:w-auto"
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
