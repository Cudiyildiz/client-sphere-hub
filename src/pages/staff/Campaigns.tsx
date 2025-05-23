import React, { useState } from 'react';
import { Search, Calendar, Filter, ChevronRight, Plus } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Types
interface Campaign {
  id: number;
  name: string;
  brand: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'completed' | 'draft';
  customerReached: number;
  messagesSent: number;
  messagesOpened: number;
  responses: number;
  sales: number;
  targetAudience: number;
  description?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Yaz İndirimi 2025',
    brand: 'Moda Markası',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    status: 'active',
    customerReached: 2450,
    messagesSent: 3200,
    messagesOpened: 1870,
    responses: 342,
    sales: 128,
    targetAudience: 3500
  },
  {
    id: 2,
    name: 'Premium Üyelik Kampanyası',
    brand: 'Teknoloji Markası',
    startDate: '2025-04-15',
    endDate: '2025-05-15',
    status: 'active',
    customerReached: 1850,
    messagesSent: 2000,
    messagesOpened: 1560,
    responses: 420,
    sales: 215,
    targetAudience: 2000
  },
  {
    id: 3,
    name: 'Müşteri Sadakat Programı',
    brand: 'Kozmetik Markası',
    startDate: '2025-03-01',
    endDate: '2025-05-31',
    status: 'active',
    customerReached: 3200,
    messagesSent: 3500,
    messagesOpened: 2800,
    responses: 950,
    sales: 410,
    targetAudience: 4000
  },
  {
    id: 4,
    name: 'Yeni Ürün Lansmanı',
    brand: 'Teknoloji Markası',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    status: 'scheduled',
    customerReached: 0,
    messagesSent: 0,
    messagesOpened: 0,
    responses: 0,
    sales: 0,
    targetAudience: 5000
  },
  {
    id: 5,
    name: 'Kış Koleksiyonu Ön Satış',
    brand: 'Moda Markası',
    startDate: '2025-09-15',
    endDate: '2025-10-15',
    status: 'scheduled',
    customerReached: 0,
    messagesSent: 0,
    messagesOpened: 0,
    responses: 0,
    sales: 0,
    targetAudience: 4500
  },
  {
    id: 6,
    name: 'Bahar Kampanyası',
    brand: 'Kozmetik Markası',
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    status: 'completed',
    customerReached: 4200,
    messagesSent: 4500,
    messagesOpened: 3650,
    responses: 980,
    sales: 456,
    targetAudience: 5000
  }
];

// Form schema
const campaignFormSchema = z.object({
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }),
  brand: z.string().min(1, { message: 'Marka seçilmesi zorunludur' }),
  description: z.string().min(10, { message: 'Açıklama en az 10 karakter olmalıdır' }),
  status: z.enum(['active', 'scheduled', 'completed', 'draft']),
  startDate: z.string().min(1, { message: 'Başlangıç tarihi gereklidir' }),
  endDate: z.string().min(1, { message: 'Bitiş tarihi gereklidir' }),
  targetAudience: z.number().min(1, { message: 'Hedef kitle sayısı gereklidir' }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const CampaignCard: React.FC<{ campaign: Campaign; onClick: () => void }> = ({ campaign, onClick }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Planlandı</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Tamamlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Taslak</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const calculateProgress = (campaign: Campaign) => {
    if (campaign.status === 'scheduled') return 0;
    if (campaign.status === 'completed') return 100;
    
    // For active campaigns, calculate based on customer reach
    return Math.min(100, Math.round((campaign.customerReached / campaign.targetAudience) * 100));
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          {getStatusBadge(campaign.status)}
        </div>
        <CardDescription>{campaign.brand}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{new Date(campaign.startDate).toLocaleDateString('tr-TR')}</span>
            <span>{new Date(campaign.endDate).toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">İlerleme</span>
              <span className="text-sm">{calculateProgress(campaign)}%</span>
            </div>
            <Progress value={calculateProgress(campaign)} />
          </div>
          <div className="pt-1">
            <div className="text-sm">
              <span className="font-medium">{campaign.customerReached}</span> / {campaign.targetAudience} müşteriye ulaşıldı
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto">
          Detaylar <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const CampaignDetail: React.FC<{ campaign: Campaign, onClose: () => void }> = ({ campaign, onClose }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Planlandı</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Tamamlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Taslak</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const calculateProgress = (campaign: Campaign) => {
    if (campaign.status === 'scheduled') return 0;
    if (campaign.status === 'completed') return 100;
    
    // For active campaigns, calculate based on customer reach
    return Math.min(100, Math.round((campaign.customerReached / campaign.targetAudience) * 100));
  };

  const chartData = [
    { name: 'Gönderilen', value: campaign.messagesSent },
    { name: 'Açılan', value: campaign.messagesOpened },
    { name: 'Yanıtlanan', value: campaign.responses },
    { name: 'Satış', value: campaign.sales },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{campaign.name}</h2>
            {getStatusBadge(campaign.status)}
          </div>
          <p className="text-muted-foreground mt-1">{campaign.brand}</p>
        </div>
        <Button variant="outline" onClick={onClose}>Geri Dön</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Kampanya Detayları</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <dt className="text-muted-foreground">Başlangıç Tarihi:</dt>
                <dd className="font-medium">{new Date(campaign.startDate).toLocaleDateString('tr-TR')}</dd>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <dt className="text-muted-foreground">Bitiş Tarihi:</dt>
                <dd className="font-medium">{new Date(campaign.endDate).toLocaleDateString('tr-TR')}</dd>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <dt className="text-muted-foreground">Hedef Kitle:</dt>
                <dd className="font-medium">{campaign.targetAudience} kişi</dd>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <dt className="text-muted-foreground">Ulaşılan Müşteriler:</dt>
                <dd className="font-medium">{campaign.customerReached} kişi</dd>
              </div>
              <div className="pt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">İlerleme</span>
                  <span className="text-sm">{calculateProgress(campaign)}%</span>
                </div>
                <Progress value={calculateProgress(campaign)} className="mt-1" />
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Kampanya İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Sayı" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">Açılma Oranı</div>
                <div className="text-2xl font-bold">
                  {campaign.messagesSent ? Math.round((campaign.messagesOpened / campaign.messagesSent) * 100) : 0}%
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">Yanıt Oranı</div>
                <div className="text-2xl font-bold">
                  {campaign.messagesOpened ? Math.round((campaign.responses / campaign.messagesOpened) * 100) : 0}%
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">Dönüşüm Oranı</div>
                <div className="text-2xl font-bold">
                  {campaign.responses ? Math.round((campaign.sales / campaign.responses) * 100) : 0}%
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">Toplam Satış</div>
                <div className="text-2xl font-bold">{campaign.sales}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mesaj İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="border rounded-md p-3 min-w-[150px] text-center">
                <div className="text-sm text-muted-foreground">Gönderilen Mesajlar</div>
                <div className="text-2xl font-bold">{campaign.messagesSent}</div>
              </div>
              <div className="border rounded-md p-3 min-w-[150px] text-center">
                <div className="text-sm text-muted-foreground">Açılan Mesajlar</div>
                <div className="text-2xl font-bold">{campaign.messagesOpened}</div>
              </div>
              <div className="border rounded-md p-3 min-w-[150px] text-center">
                <div className="text-sm text-muted-foreground">Yanıtlanan Mesajlar</div>
                <div className="text-2xl font-bold">{campaign.responses}</div>
              </div>
              <div className="border rounded-md p-3 min-w-[150px] text-center">
                <div className="text-sm text-muted-foreground">Satışa Dönüşen</div>
                <div className="text-2xl font-bold">{campaign.sales}</div>
              </div>
            </div>
            
            <Button variant="outline">Mesaj Detaylarını İndir</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// New Create Campaign Form Dialog
interface CreateCampaignDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (values: CampaignFormValues) => void;
}

const CreateCampaignDialog: React.FC<CreateCampaignDialogProps> = ({ isOpen, setIsOpen, onSave }) => {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      status: 'draft',
      startDate: '',
      endDate: '',
      targetAudience: 1000,
    }
  });

  const handleSubmit = (data: CampaignFormValues) => {
    onSave(data);
    setIsOpen(false);
    form.reset();
  };

  // Unique brands from the mock campaigns
  const uniqueBrands = [...new Set(mockCampaigns.map(campaign => campaign.brand))];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Yeni Kampanya Oluştur</DialogTitle>
          <DialogDescription>
            Yeni bir kampanya oluşturmak için aşağıdaki alanları doldurun.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marka</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Marka seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {uniqueBrands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durum</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Taslak</SelectItem>
                        <SelectItem value="scheduled">Planlandı</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="completed">Tamamlandı</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hedef Kitle Sayısı</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">Kampanya Oluştur</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const { toast } = useToast();

  // Extract unique brands for filter
  const uniqueBrands = [...new Set(mockCampaigns.map(campaign => campaign.brand))];

  // Filter campaigns based on search and filters
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (campaign.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || campaign.brand === brandFilter;
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    // Date filtering
    let matchesDate = true;
    const now = new Date();
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    
    if (dateFilter === 'thisMonth') {
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      matchesDate = (start >= thisMonthStart && start <= thisMonthEnd) || 
                   (end >= thisMonthStart && end <= thisMonthEnd) ||
                   (start <= thisMonthStart && end >= thisMonthEnd);
    } else if (dateFilter === 'lastMonth') {
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      matchesDate = (start >= lastMonthStart && start <= lastMonthEnd) || 
                   (end >= lastMonthStart && end <= lastMonthEnd) ||
                   (start <= lastMonthStart && end >= lastMonthEnd);
    } else if (dateFilter === 'nextMonth') {
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      matchesDate = (start >= nextMonthStart && start <= nextMonthEnd) || 
                   (end >= nextMonthStart && end <= nextMonthEnd) ||
                   (start <= nextMonthStart && end >= nextMonthEnd);
    }
    
    return matchesSearch && matchesBrand && matchesStatus && matchesDate;
  });

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetail(true);
  };
  
  const handleCreateCampaign = (values: CampaignFormValues) => {
    // Create a new campaign object
    const newCampaign: Campaign = {
      id: mockCampaigns.length + 1,
      name: values.name,
      brand: values.brand,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      customerReached: 0,
      messagesSent: 0,
      messagesOpened: 0,
      responses: 0,
      sales: 0,
      targetAudience: values.targetAudience,
      description: values.description,
    };
    
    // This would normally add to the database
    // For now we'll just show a success toast
    toast({
      title: "Kampanya oluşturuldu",
      description: `"${values.name}" kampanyası başarıyla oluşturuldu.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kampanyalar</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Kampanya
        </Button>
      </div>
      
      {/* Create Campaign Dialog */}
      <CreateCampaignDialog 
        isOpen={showCreateDialog}
        setIsOpen={setShowCreateDialog}
        onSave={handleCreateCampaign}
      />

      {!showDetail ? (
        <>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Kampanya ara..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Marka Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tüm Markalar</SelectItem>
                    {uniqueBrands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="scheduled">Planlandı</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                    <SelectItem value="draft">Taslak</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tarih Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tüm Tarihler</SelectItem>
                    <SelectItem value="thisMonth">Bu Ay</SelectItem>
                    <SelectItem value="lastMonth">Geçen Ay</SelectItem>
                    <SelectItem value="nextMonth">Gelecek Ay</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredCampaigns.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  onClick={() => handleCampaignClick(campaign)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Kampanya bulunamadı</h3>
              <p className="text-sm text-muted-foreground mt-2">Arama kriterlerinize uygun kampanya bulunmamaktadır.</p>
            </div>
          )}
        </>
      ) : (
        selectedCampaign && <CampaignDetail campaign={selectedCampaign} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
};

export default Campaigns;
