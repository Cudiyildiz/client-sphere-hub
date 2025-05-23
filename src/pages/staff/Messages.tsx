
import React, { useState } from 'react';
import { Search, MessageSquare, Calendar, Clock, User, AlertCircle, CheckCircle2, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  initialLetter?: string;
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
    initialLetter: 'AY',
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    message: 'Premium üyelik avantajları nelerdir?',
    date: '2025-05-17',
    brandName: 'Teknoloji Markası',
    campaignName: 'Premium Üyelik Kampanyası',
    status: 'inProgress',
    response: 'Merhaba Zeynep Hanım, premium üyelik avantajları hakkında bilgileri paylaştım.',
    initialLetter: 'ZK',
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    message: 'Randevu alabilir miyim?',
    date: '2025-05-15',
    brandName: 'Kozmetik Markası',
    campaignName: 'Müşteri Sadakat Programı',
    status: 'appointment',
    initialLetter: 'MD',
  },
  {
    id: 4,
    customerName: 'Ayşe Yıldız',
    message: 'Bu ürün hakkında detaylı bilgi istiyorum.',
    date: '2025-05-14',
    brandName: 'Teknoloji Markası',
    campaignName: 'Yeni Ürün Lansmanı',
    status: 'completed',
    response: 'Merhaba Ayşe Hanım, ürün detaylarını paylaştım. İyi günler.',
    initialLetter: 'AY',
  },
  {
    id: 5,
    customerName: 'Mustafa Şahin',
    message: 'Siparişimi onayladım.',
    date: '2025-05-12',
    brandName: 'Moda Markası',
    campaignName: 'Yaz İndirimi 2025',
    status: 'sold',
    initialLetter: 'MŞ',
  },
  {
    id: 6,
    customerName: 'Elif Öztürk',
    message: 'İndirim kuponu kullanabilir miyim?',
    date: '2025-05-10',
    brandName: 'Kozmetik Markası',
    campaignName: 'Bahar Kampanyası',
    status: 'completed',
    response: 'Merhaba Elif Hanım, evet indirim kuponunuzu kullanabilirsiniz.',
    initialLetter: 'EÖ',
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Status badge
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
          <Check className="w-3 h-3 mr-1" /> Satıldı
        </Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  // Get initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // View message details
  const handleMessageClick = (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  // Get count by status
  const getCountByStatus = (status: string) => {
    return mockMessages.filter(msg => status === 'all' || msg.status === status).length;
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

      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Status Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide">
          <Button
            variant={statusFilter === 'all' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('all')}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Tümü</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('all')}</Badge>
          </Button>
          <Button
            variant={statusFilter === 'new' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('new')}
          >
            <AlertCircle className="h-4 w-4" />
            <span>Yeni</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('new')}</Badge>
          </Button>
          <Button
            variant={statusFilter === 'inProgress' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('inProgress')}
          >
            <User className="h-4 w-4" />
            <span>İlgileniyor</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('inProgress')}</Badge>
          </Button>
          <Button
            variant={statusFilter === 'appointment' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('appointment')}
          >
            <Calendar className="h-4 w-4" />
            <span>Randevu</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('appointment')}</Badge>
          </Button>
          <Button
            variant={statusFilter === 'completed' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('completed')}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Tamamlandı</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('completed')}</Badge>
          </Button>
          <Button
            variant={statusFilter === 'sold' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setStatusFilter('sold')}
          >
            <Check className="h-4 w-4" />
            <span>Satıldı</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('sold')}</Badge>
          </Button>
        </div>

        {/* Message List */}
        <div className="divide-y">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(message => (
              <div 
                key={message.id} 
                className="p-4 hover:bg-slate-50 cursor-pointer flex items-start gap-3"
                onClick={() => handleMessageClick(message)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {message.initialLetter || getInitials(message.customerName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.customerName}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(message.date)}
                      </div>
                      {getStatusBadge(message.status)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        {message.brandName}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded-full">
                        {message.campaignName}
                      </span>
                    </div>
                    {message.response && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Yanıtlandı
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-xl font-medium">Mesaj bulunamadı</h3>
              <p className="text-muted-foreground">Bu kriterlere uygun mesaj bulunmamaktadır.</p>
            </div>
          )}
        </div>
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
                        {selectedMessage.initialLetter || getInitials(selectedMessage.customerName)}
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
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Müşteri Mesajı:</span>
                      <span className="text-xs text-muted-foreground">{formatDate(selectedMessage.date)}</span>
                    </div>
                    <p className="text-sm">{selectedMessage.message}</p>
                  </CardContent>
                </Card>
                
                {selectedMessage.response && (
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {selectedMessage.brandName.substring(0, 3)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{selectedMessage.brandName}</span>
                        <span className="text-xs text-muted-foreground">yanıtladı</span>
                      </div>
                      <p className="text-sm">{selectedMessage.response}</p>
                    </CardContent>
                  </Card>
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
