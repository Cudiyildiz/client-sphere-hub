
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, Building2, ShieldCheck } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
  role: z.enum(['admin', 'staff', 'brand']),
});

type FormData = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'admin',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password, data.role as UserRole);
      
      // Navigate based on role
      switch (data.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'staff':
          navigate('/staff');
          break;
        case 'brand':
          navigate('/brand');
          break;
      }
      
      toast({
        title: 'Giriş başarılı',
        description: `Hoş geldiniz!`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Giriş başarısız',
        description: error || 'Giriş sırasında bir hata oluştu',
      });
    }
  };

  // Display demo credentials for easy testing
  const fillDemoCredentials = (role: UserRole) => {
    form.setValue('email', `${role}@example.com`);
    form.setValue('password', 'password123');
    form.setValue('role', role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">DataCrux CRM</h1>
          <p className="mt-2 text-muted-foreground">Müşteri ilişkileri, düzenleme, analiz için tek platform</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            <CardDescription>
              Hesabınıza erişmek için bilgilerinizi girin
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="E-posta adresiniz" 
                          {...field} 
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Şifreniz" 
                          {...field} 
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Hesap Tipi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border p-3 hover:bg-slate-50">
                            <FormControl>
                              <RadioGroupItem value="admin" />
                            </FormControl>
                            <FormLabel className="flex cursor-pointer items-center gap-2 font-normal">
                              <ShieldCheck size={16} />
                              Admin
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border p-3 hover:bg-slate-50">
                            <FormControl>
                              <RadioGroupItem value="staff" />
                            </FormControl>
                            <FormLabel className="flex cursor-pointer items-center gap-2 font-normal">
                              <User size={16} />
                              Personel
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border p-3 hover:bg-slate-50">
                            <FormControl>
                              <RadioGroupItem value="brand" />
                            </FormControl>
                            <FormLabel className="flex cursor-pointer items-center gap-2 font-normal">
                              <Building2 size={16} />
                              Marka
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="h-11 w-full"
                  disabled={loading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Demo hesaplar</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fillDemoCredentials('admin')}
                      className="h-9"
                    >
                      <ShieldCheck className="mr-1 h-4 w-4" />
                      Admin
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fillDemoCredentials('staff')}
                      className="h-9"
                    >
                      <User className="mr-1 h-4 w-4" />
                      Personel
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fillDemoCredentials('brand')}
                      className="h-9"
                    >
                      <Building2 className="mr-1 h-4 w-4" />
                      Marka
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DataCrux CRM. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;