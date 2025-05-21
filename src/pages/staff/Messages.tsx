
import React, { useState } from 'react';
import { Search, MessageSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  // Extract unique brands and campaigns for filters
  const uniqueBrands = [...new Set(mockMessages.map(msg => msg.brandName))];
  const uniqueCampaigns = [...new Set(mockMessages.map(msg => msg.campaignName))];

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || message.brandName === brandFilter;
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    
    return matchesSearch && matchesStatus && matchesBrand && matchesCampaign;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Yeni Mesaj</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">İlgileniliyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Randevu Alındı</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Müşteri Mesajları</h1>
        <Button disabled>
          <MessageSquare className="mr-2 h-4 w-4" />
          Rapor Oluştur
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Mesajlarda ara..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Durum Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="new">Yeni Mesajlar</SelectItem>
                <SelectItem value="inProgress">İlgileniliyor</SelectItem>
                <SelectItem value="appointment">Randevu Alındı</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="sold">Satıldı</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
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

          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kampanya Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                {uniqueCampaigns.map(campaign => (
                  <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

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
          <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
            {filteredMessages
              .filter(msg => tab === "all" || msg.status === tab)
              .map(message => (
                <Card key={message.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{message.customerName}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:gap-2">
                          <span>{message.brandName}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{message.campaignName}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(message.status)}
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm">{message.message}</p>
                      </div>
                      
                      {message.response && (
                        <div className="bg-primary-foreground p-3 rounded-md ml-4 border-l-4 border-primary">
                          <p className="text-xs text-muted-foreground mb-1">Marka yanıtı:</p>
                          <p className="text-sm">{message.response}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

            {filteredMessages.filter(msg => tab === "all" || msg.status === tab).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Mesaj bulunamadı</h3>
                <p className="text-sm text-muted-foreground mt-2">Bu kriterlere uygun mesaj bulunmamaktadır.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StaffMessages;
