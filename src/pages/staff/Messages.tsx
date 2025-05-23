import React, { useState } from 'react';
import { Search, MessageSquare, Filter, Calendar, Clock, User, AlertCircle, CheckCircle2, MoreHorizontal, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data
interface CustomerMessage {
  id: number;
  customerName: string;
  message: string;
  date: string;
  brandName: string;
  campaignName: string;
  status: 'new' | 'inProgress' | 'completed' | 'appointment' | 'sold';
  response?: string;
}

const mockMessages: CustomerMessage[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    message: 'Kampanya hakkında detaylı bilgi alabilir miyim?',
    date: '2025-05-18',
    brandName: 'Moda Markası',
    campaignName: 'Yaz İndirimi 2025',
    status: 'new',
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    message: 'Premium üyelik avantajları nelerdir?',
    date: '2025-05-17',
    brandName: 'Teknoloji Markası',
    campaignName: 'Premium Üyelik Kampanyası',
    status: 'inProgress',
    response: 'Merhaba Zeynep Hanım, premium üyelik avantajları hakkında bilgileri paylaştım.'
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    message: 'Randevu alabilir miyim?',
    date: '2025-05-15',
    brandName: 'Kozmetik Markası',
    campaignName: 'Müşteri Sadakat Programı',
    status: 'appointment',
  },
  {
    id: 4,
    customerName: 'Ayşe Yıldız',
    message: 'Bu ürün hakkında detaylı bilgi istiyorum.',
    date: '2025-05-14',
    brandName: 'Teknoloji Markası',
    campaignName: 'Yeni Ürün Lansmanı',
    status: 'completed',
    response: 'Merhaba Ayşe Hanım, ürün detaylarını paylaştım. İyi günler.'
  },
  {
    id: 5,
    customerName: 'Mustafa Şahin',
    message: 'Siparişimi onayladım.',
    date: '2025-05-12',
    brandName: 'Moda Markası',
    campaignName: 'Yaz İndirimi 2025',
    status: 'sold',
  },
  {
    id: 6,
    customerName: 'Elif Öztürk',
    message: 'İndirim kuponu kullanabilir miyim?',
    date: '2025-05-10',
    brandName: 'Kozmetik Markası',
    campaignName: 'Bahar Kampanyası',
    status: 'completed',
    response: 'Merhaba Elif Hanım, evet indirim kuponunuzu kullanabilirsiniz.'
  }
];

const StaffMessages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract unique brands and campaigns for filters
  const uniqueBrands = [...new Set(mockMessages.map(msg => msg.brandName))];
  const uniqueCampaigns = [...new Set(mockMessages.map(msg => msg.campaignName))];
  
  // Extract unique dates for date filter
  const uniqueDates = [...new Set(mockMessages.map(msg => msg.date))].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || message.brandName === brandFilter;
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    const matchesDate = dateFilter === 'all' || message.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesBrand && matchesCampaign && matchesDate;
  });

  // Tarih ve saat formatını daha okunabilir hale getirme
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Durum bilgisi için rozet oluşturma
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
          <AlertCircle className="w-3 h-3 mr-1" /> Yeni
        </Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          <MessageSquare className="w-3 h-3 mr-1" /> İlgileniliyor
        </Badge>;
      case 'appointment':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
          <Calendar className="w-3 h-3 mr-1" /> Randevu
        </Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Tamamlandı
        </Badge>;
      case 'sold':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Satıldı
        </Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  // İsim başharflerini alma
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Mesaj detaylarını görüntüleme
  const handleMessageClick = (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Müşteri Mesajları</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Rapor İndir
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Arama */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Mesajlarda ara..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Marka Filtresi */}
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger>
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

        {/* Tarih Filtresi */}
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tarih Filtresi" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tüm Tarihler</SelectItem>
              {uniqueDates.map(date => (
                <SelectItem key={date} value={date}>{formatDate(date)}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {/* Durum Filtreleri */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Tümü</TabsTrigger>
            <TabsTrigger value="new">Yeni</TabsTrigger>
            <TabsTrigger value="inProgress">İlgileniliyor</TabsTrigger>
            <TabsTrigger value="appointment">Randevu</TabsTrigger>
            <TabsTrigger value="completed">Tamamlandı</TabsTrigger>
            <TabsTrigger value="sold">Satıldı</TabsTrigger>
          </TabsList>

          {["all", "new", "inProgress", "appointment", "completed", "sold"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMessages
                  .filter(msg => tab === "all" || msg.status === tab)
                  .map(message => (
                    <Card 
                      key={message.id} 
                      className="cursor-pointer hover:shadow-md transition-all border-l-4 h-[180px] flex flex-col"
                      onClick={() => handleMessageClick(message)}
                      style={{ 
                        borderLeftColor: message.status === 'new' ? '#3b82f6' :
                                        message.status === 'inProgress' ? '#eab308' :
                                        message.status === 'appointment' ? '#8b5cf6' :
                                        message.status === 'completed' ? '#22c55e' : '#10b981'
                      }}
                    >
                      <CardHeader className="pb-2 flex-none">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {getInitials(message.customerName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-sm">{message.customerName}</CardTitle>
                              <CardDescription className="text-xs">{message.brandName}</CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(message.status)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="py-2 flex-grow overflow-hidden">
                        <p className="text-sm line-clamp-2 text-muted-foreground">{message.message}</p>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex-none">
                        <div className="w-full flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{formatDate(message.date)}</span>
                          <span className="text-xs font-medium">{message.campaignName}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}

                {/* Boş durum */}
                {filteredMessages.filter(msg => tab === "all" || msg.status === tab).length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 bg-slate-50 rounded-lg border border-dashed">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Mesaj bulunamadı</h3>
                    <p className="text-sm text-muted-foreground mt-2">Bu kriterlere uygun mesaj bulunmamaktadır.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mesaj Detay Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(selectedMessage.customerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-lg">{selectedMessage.customerName}</DialogTitle>
                      <DialogDescription className="flex items-center gap-2">
                        <span>{selectedMessage.brandName}</span>
                        <span>•</span>
                        <span>{selectedMessage.campaignName}</span>
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Müşteri Mesajı:</span>
                    <span className="text-xs text-muted-foreground">{formatDate(selectedMessage.date)}</span>
                  </div>
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
                
                {selectedMessage.response && (
                  <div className="bg-primary/5 p-4 rounded-md border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          MRK
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{selectedMessage.brandName}</span>
                      <span className="text-xs text-muted-foreground">yanıtladı</span>
                    </div>
                    <p className="text-sm">{selectedMessage.response}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 bg-slate-50 p-3 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <p className="text-sm text-muted-foreground">
                    Bu mesaj {selectedMessage.brandName} tarafından yönetilmektedir. 
                    Yanıtlar ilgili markanın sorumluluğundadır.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffMessages;