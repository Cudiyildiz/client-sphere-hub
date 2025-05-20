
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Bell, CreditCard, Building2 } from 'lucide-react';

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }),
  email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin' }),
  role: z.string().optional(),
});

// Notification settings schema
const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  activitySummary: z.boolean().default(true),
});

// Company settings schema
const companyFormSchema = z.object({
  companyName: z.string().min(2, { message: 'Şirket adı en az 2 karakter olmalıdır' }),
  website: z.string().url({ message: 'Lütfen geçerli bir URL girin' }).optional().or(z.literal('')),
  supportEmail: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin' }),
  phone: z.string().optional(),
});

// Security settings schema
const securityFormSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Mevcut şifre gereklidir' }),
  newPassword: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır' }),
  confirmPassword: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type CompanyFormValues = z.infer<typeof companyFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form setup
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
    },
  });

  // Notification form setup
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      activitySummary: true,
    },
  });

  // Company form setup
  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: 'CRM Platformu A.Ş.',
      website: 'https://crm-platform.example.com',
      supportEmail: 'destek@crm-platform.example.com',
      phone: '+90 (555) 123-4567',
    },
  });

  // Security form setup
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    toast({
      title: 'Profil güncellendi',
      description: 'Profil bilgileriniz güncellendi.',
    });
    console.log('Profil verileri:', data);
  };

  // Handle notification form submission
  const onNotificationSubmit = (data: NotificationFormValues) => {
    toast({
      title: 'Bildirim ayarları güncellendi',
      description: 'Bildirim tercihleriniz kaydedildi.',
    });
    console.log('Bildirim verileri:', data);
  };

  // Handle company form submission
  const onCompanySubmit = (data: CompanyFormValues) => {
    toast({
      title: 'Şirket ayarları güncellendi',
      description: 'Şirket bilgileriniz güncellendi.',
    });
    console.log('Şirket verileri:', data);
  };

  // Handle security form submission
  const onSecuritySubmit = (data: SecurityFormValues) => {
    toast({
      title: 'Şifre güncellendi',
      description: 'Şifreniz başarıyla değiştirildi.',
    });
    console.log('Güvenlik verileri:', data);
    securityForm.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">
          Hesap ayarlarınızı ve tercihlerinizi yönetin.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="company">Şirket</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Kişisel bilgilerinizi yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İsim</FormLabel>
                        <FormControl>
                          <Input placeholder="İsminiz" {...field} />
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
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input placeholder="E-posta adresiniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormDescription>
                          Rolünüz değiştirilemez.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Değişiklikleri Kaydet</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profil Fotoğrafı</CardTitle>
              <CardDescription>
                Profil fotoğrafınızı güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Button variant="outline">Yeni Yükle</Button>
                <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                  Kaldır
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Bildirim Ayarları</CardTitle>
              </div>
              <CardDescription>
                Bildirimleri nasıl alacağınızı yapılandırın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border border-primary"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>E-posta Bildirimleri</FormLabel>
                          <FormDescription>
                            E-posta yoluyla bildirim alın.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border border-primary"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Anlık Bildirimler</FormLabel>
                          <FormDescription>
                            Tarayıcıda anlık bildirim alın.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border border-primary"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Pazarlama E-postaları</FormLabel>
                          <FormDescription>
                            Pazarlama ve promosyon e-postaları alın.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="activitySummary"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border border-primary"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Etkinlik Özeti</FormLabel>
                          <FormDescription>
                            Haftalık etkinlik özeti alın.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Bildirim Ayarlarını Kaydet</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Company Settings */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <CardTitle>Şirket Bilgileri</CardTitle>
              </div>
              <CardDescription>
                Şirket bilgilerinizi ve marka kimliğinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şirket Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="Şirketinizin adı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Web Sitesi</FormLabel>
                        <FormControl>
                          <Input placeholder="https://ornek.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="supportEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destek E-postası</FormLabel>
                        <FormControl>
                          <Input placeholder="destek@ornek.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destek Telefonu</FormLabel>
                        <FormControl>
                          <Input placeholder="+90 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Şirket Bilgilerini Kaydet</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Güvenlik Ayarları</CardTitle>
              </div>
              <CardDescription>
                Şifrenizi ve güvenlik tercihlerinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                  <FormField
                    control={securityForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mevcut Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Mevcut şifrenizi girin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yeni Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Yeni şifrenizi girin" {...field} />
                        </FormControl>
                        <FormDescription>
                          Şifre en az 8 karakter uzunluğunda olmalıdır.
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
                        <FormLabel>Yeni Şifreyi Onayla</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Yeni şifrenizi onaylayın" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Şifreyi Değiştir</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
              <CardDescription>
                Hesabınıza ekstra bir güvenlik katmanı ekleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <input type="checkbox" className="h-4 w-4 rounded-sm border border-primary" />
                <div className="space-y-1 leading-none">
                  <p className="font-medium">İki Faktörlü Kimlik Doğrulamayı Etkinleştir</p>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı ek bir kimlik doğrulama adımıyla koruyun.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">2FA Yapılandır</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
