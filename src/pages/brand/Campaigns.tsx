import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, MoreHorizontal, Edit, Trash, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

// Define the Campaign type
interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'Draft' | 'Scheduled' | 'Active' | 'Completed';
  customers: number;
  messages: number;
  startDate: string;
  endDate: string;
}

// Sample campaign data
const initialCampaigns: Campaign[] = [
  { 
    id: 1, 
    name: 'Summer Sale 2025', 
    description: 'Promotional campaign for summer products with special discounts',
    status: 'Active', 
    customers: 423, 
    messages: 124,
    startDate: '2025-05-15',
    endDate: '2025-06-15',
  },
  { 
    id: 2, 
    name: 'New Product Launch', 
    description: 'Campaign to introduce our new product line to customers',
    status: 'Active', 
    customers: 256, 
    messages: 78,
    startDate: '2025-05-10',
    endDate: '2025-05-30',
  },
  { 
    id: 3, 
    name: 'Customer Loyalty Program', 
    description: 'Special offers and rewards for our most loyal customers',
    status: 'Active', 
    customers: 198, 
    messages: 45,
    startDate: '2025-04-01',
    endDate: '2025-06-30',
  },
  { 
    id: 4, 
    name: 'Holiday Promotion', 
    description: 'Special holiday deals and gift ideas for the upcoming season',
    status: 'Scheduled', 
    customers: 0, 
    messages: 0,
    startDate: '2025-11-15',
    endDate: '2025-12-25',
  },
];

// Form schema
const campaignFormSchema = z.object({
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }),
  description: z.string().min(10, { message: 'Açıklama en az 10 karakter olmalıdır' }),
  status: z.enum(['Draft', 'Scheduled', 'Active', 'Completed']),
  startDate: z.string().min(1, { message: 'Başlangıç tarihi gereklidir' }),
  endDate: z.string().min(1, { message: 'Bitiş tarihi gereklidir' }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const defaultFormValues: CampaignFormValues = {
  name: '',
  description: '',
  status: 'Draft',
  startDate: '',
  endDate: '',
};

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isFormReady, setIsFormReady] = useState(false);
  const { toast } = useToast();

  // Form setup
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: defaultFormValues,
  });

  // Form etkileme mantığını ayrı bir useEffect içinde yönetiyoruz
  useEffect(() => {
    if (!isDialogOpen) return;
    
    if (editingCampaign && isFormReady) {
      form.reset({
        name: editingCampaign.name,
        description: editingCampaign.description,
        status: editingCampaign.status,
        startDate: editingCampaign.startDate,
        endDate: editingCampaign.endDate,
      });
    } else if (isFormReady && !editingCampaign) {
      form.reset(defaultFormValues);
    }
  }, [isDialogOpen, editingCampaign, isFormReady, form]);
  
  // Dialog açıldığında formun hazır olduğunu belirtiyoruz
  useEffect(() => {
    if (isDialogOpen) {
      setIsFormReady(true);
    } else {
      // Dialog kapandığında form hazırlığını sıfırlıyoruz
      setIsFormReady(false);
    }
  }, [isDialogOpen]);

  // Handle adding or updating campaign
  const onSubmit = (values: CampaignFormValues) => {
    try {
      if (editingCampaign) {
        // Update existing campaign
        setCampaigns(prevCampaigns => 
          prevCampaigns.map((c) =>
            c.id === editingCampaign.id
              ? { ...c, ...values } as Campaign
              : c
          )
        );
        toast({
          title: 'Kampanya güncellendi',
          description: `${values.name} başarıyla güncellendi.`,
        });
      } else {
        // Add new campaign
        const newCampaign: Campaign = {
          id: Date.now(), // Benzersiz ID sağlıyor
          name: values.name,
          description: values.description,
          status: values.status,
          startDate: values.startDate,
          endDate: values.endDate,
          customers: 0,
          messages: 0,
        };
        
        setCampaigns(prevCampaigns => [...prevCampaigns, newCampaign]);
        
        toast({
          title: 'Kampanya oluşturuldu',
          description: `${values.name} başarıyla oluşturuldu.`,
        });
      }
      
      closeDialog();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Bir hata oluştu',
        description: 'Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    }
  };

  // Dialog kapatma
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  // Yeni kampanya oluştur butonuna tıklandığında
  const handleCreateClick = () => {
    setEditingCampaign(null);
    setIsDialogOpen(true);
  };

  // Handle edit campaign
  const handleEdit = (campaign: Campaign) => {
    try {
      setEditingCampaign(campaign);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Edit campaign error:', error);
      toast({
        title: 'Kampanya düzenlenemedi',
        description: 'Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    }
  };

  // Handle delete campaign
  const handleDelete = (id: number) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast({
      title: 'Kampanya silindi',
      description: 'Kampanya başarıyla silindi.',
    });
  };

  // Group campaigns by status
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');
  const scheduledCampaigns = campaigns.filter(c => c.status === 'Scheduled');
  const draftCampaigns = campaigns.filter(c => c.status === 'Draft');
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kampanya Yönetimi</h1>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" /> Kampanya Oluştur
        </Button>
      </div>
      
      {/* Form dialog'u UI'den ayırıyoruz */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCampaign ? 'Kampanya Düzenle' : 'Yeni Kampanya Oluştur'}</DialogTitle>
            <DialogDescription>
              {editingCampaign 
                ? 'Kampanya detaylarını güncelleyin.' 
                : 'Yeni kampanya oluşturmak için aşağıdaki alanları doldurun.'}
            </DialogDescription>
          </DialogHeader>
          {isFormReady && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kampanya Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Kampanya adını girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Kampanyanın amacını ve hedeflerini açıklayın" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başlangıç Tarihi</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bitiş Tarihi</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durum</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Draft">Taslak</option>
                          <option value="Scheduled">Zamanlanmış</option>
                          <option value="Active">Aktif</option>
                          <option value="Completed">Tamamlandı</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="flex gap-2 justify-end pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeDialog}
                  >
                    İptal
                  </Button>
                  <Button type="submit">{editingCampaign ? 'Güncelle' : 'Oluştur'}</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Aktif Kampanyalar</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.length > 0 ? (
            activeCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">Aktif kampanya yok.</p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Zamanlanmış Kampanyalar</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scheduledCampaigns.length > 0 ? (
            scheduledCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">Zamanlanmış kampanya yok.</p>
          )}
        </div>
      </div>
      
      {draftCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Taslak Kampanyalar</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Tamamlanmış Kampanyalar</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit, onDelete }) => {
  // Tarihleri daha okunaklı formatta gösterme
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Durum çevirileri
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'Active': return 'Aktif';
      case 'Scheduled': return 'Zamanlanmış';
      case 'Draft': return 'Taslak';
      case 'Completed': return 'Tamamlandı';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mt-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menü aç</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Düzenle</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(campaign.id)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Sil</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              campaign.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : campaign.status === 'Scheduled'
                ? 'bg-blue-100 text-blue-800'
                : campaign.status === 'Draft'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-purple-100 text-purple-800'
            }`}
          >
            {getStatusText(campaign.status)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
          </span>
        </div>
        <CardDescription className="mt-2">
          {campaign.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{campaign.customers} müşteri</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{campaign.messages} mesaj</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full justify-center">
          <span>Kampanyayı Görüntüle</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Campaigns;
